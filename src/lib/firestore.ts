import { firestore as fs } from "../../firebase";
import {
  DeleteDiaryAction,
  Diary,
  GetDiariesAction,
  GetDiaryAction,
} from "../store/diaries/types";
import { User } from "../store/user/types";

// TODO 型見直し

type FSDiary = {
  id: string;
  title: string;
  body: string;
  imageUrls: string[];
  lastEdited: firebase.firestore.Timestamp;
};

export async function getUserFromFirestore({
  firestore,
  userId,
}: {
  firestore: FirebaseFirestore.Firestore;
  userId: string;
}): Promise<User> {
  const user = await firestore
    .collection(`users`)
    .doc(userId)
    .get()
    .then((doc) => doc.data() as User);
  return {
    uid: userId,
    name: user.name || "No Name",
    picture: user.picture,
  };
}

async function setDiaryUserToFireStore({
  firestore = fs,
  user,
}: {
  firestore?: FirebaseFirestore.Firestore | firebase.firestore.Firestore;
  user: User;
}) {
  await firestore
    .collection(`/users/`)
    .doc(user.uid)
    .set({ name: user.name, picture: user.picture });
}

export async function createDiaryToFirestore({
  firestore = fs,
  user,
  diary,
}: {
  firestore?: FirebaseFirestore.Firestore | firebase.firestore.Firestore;
  user: User;
  diary: Diary;
}): Promise<void> {
  setDiaryUserToFireStore({ firestore, user });
  firestore.collection(`/users/${user.uid}/diaries`).doc(`${diary.id}`).set({
    id: diary.id,
    title: diary.title,
    body: diary.body,
    imageUrls: diary.imageUrls,
    lastEdited: new Date(),
  });
}

export async function getDiaryFromFirestore({
  firestore,
  userId,
  diaryId,
}: GetDiaryAction["payload"]): Promise<Diary | undefined> {
  const diaryData = (await firestore
    .collection(`users/${userId}/diaries/`)
    .doc(`${diaryId}`)
    .get()
    .then((doc) => doc.data())) as FSDiary | undefined;
  return diaryData
    ? {
        id: diaryData.id,
        title: diaryData.title,
        body: diaryData.body,
        imageUrls: diaryData.imageUrls,
        lastEdited: diaryData.lastEdited.toDate().toISOString(),
      }
    : undefined;
}

export async function getDiariesFromFirestore({
  firestore,
  userId,
}: GetDiariesAction["payload"]): Promise<Diary[]> {
  const diariesData: Diary[] = [];
  await firestore
    .collection(`users/${userId}/diaries`)
    .get()
    .then((collections) => {
      collections.forEach((doc) => {
        const data = doc.data() as FSDiary;
        diariesData.push({
          id: data.id,
          title: data.title,
          body: data.body,
          imageUrls: data.imageUrls,
          lastEdited: data.lastEdited.toDate().toISOString(),
        });
      });
    });
  return diariesData;
}

export async function deleteDiaryFromFirestore({
  firestore,
  userId,
  diaryId,
}: DeleteDiaryAction["payload"]): Promise<void> {
  await firestore.collection(`users/${userId}/diaries/`).doc(diaryId).delete();
}
