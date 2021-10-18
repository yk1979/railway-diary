import { firestore as fs } from "../../firebase";
import {
  GetDiariesPayload,
  GetDiaryPayload,
  deleteDiaryPayload,
} from "../redux/modules/diaries";
import { Diary } from "../server/services/diaries/types";
import { User } from "../types";

// TODO DataConverter使えるか検討
// https://firebase.google.com/docs/reference/js/firebase.firestore.FirestoreDataConverter?hl=en

// firestoreに格納されているDiaryはlastEditedの型がtimestamp型なので別で定義する
type FSDiary = {
  id: string;
  title: string;
  body: string;
  imageUrls: string[];
  lastEdited: firebase.default.firestore.Timestamp;
};

export async function getUserFromFirestore({
  firestore,
  userId,
}: {
  firestore: FirebaseFirestore.Firestore;
  userId: string;
}): Promise<User | null> {
  try {
    const user = await firestore
      .collection(`users`)
      .doc(userId)
      .get()
      .then((doc) => doc.data());
    if (!user) return null;
    return {
      id: userId,
      name: user.name,
      photoUrl: user.photoUrl,
    };
  } catch (err) {
    throw new Error(err);
  }
}

async function setDiaryUserToFireStore({
  firestore = fs,
  user,
}: {
  firestore?:
    | FirebaseFirestore.Firestore
    | firebase.default.firestore.Firestore;
  user: User;
}) {
  try {
    const { id, name, photoUrl } = user;
    await firestore.collection(`/users/`).doc(id).set({ name, photoUrl });
  } catch (err) {
    throw new Error(err);
  }
}

export async function createDiaryToFirestore({
  firestore = fs,
  user,
  diary,
}: {
  firestore?:
    | FirebaseFirestore.Firestore
    | firebase.default.firestore.Firestore;
  user: User;
  diary: Diary;
}): Promise<void> {
  try {
    await setDiaryUserToFireStore({ firestore, user });
    firestore.collection(`/users/${user.id}/diaries`).doc(`${diary.id}`).set({
      id: diary.id,
      title: diary.title,
      body: diary.body,
      imageUrls: diary.imageUrls,
      lastEdited: new Date(),
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function getDiaryFromFirestore({
  firestore,
  userId,
  diaryId,
}: GetDiaryPayload): Promise<Diary> {
  try {
    const diaryData = (await firestore
      .collection(`users/${userId}/diaries/`)
      .doc(`${diaryId}`)
      .get()
      .then((doc) => doc.data())) as FSDiary;
    return {
      ...diaryData,
      lastEdited: diaryData.lastEdited.toDate().toISOString(),
    };
  } catch (err) {
    throw new Error(err);
  }
}

export async function getDiariesFromFirestore({
  firestore,
  userId,
}: GetDiariesPayload): Promise<Diary[]> {
  try {
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
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteDiaryFromFirestore({
  firestore,
  userId,
  diaryId,
}: deleteDiaryPayload): Promise<void> {
  try {
    await firestore
      .collection(`users/${userId}/diaries/`)
      .doc(`${diaryId}`)
      .delete();
  } catch (err) {
    throw new Error(err);
  }
}
