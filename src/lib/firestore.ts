import { fromUnixTime } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import { firestore as fs } from "../../firebase";
import {
  DeleteDiaryAction,
  Diary,
  GetDiariesAction,
  GetDiaryAction,
} from "../store/diary/types";
import { User } from "../store/user/types";

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
    lastEdited: new Date(),
  });
}

export async function getDiaryFromFirestore({
  firestore,
  userId,
  diaryId,
}: GetDiaryAction["payload"]): Promise<Diary | undefined> {
  const diaryData = await firestore
    .collection(`users/${userId}/diaries/`)
    .doc(`${diaryId}`)
    .get()
    .then((doc) => doc.data());
  if (!diaryData) return undefined;
  return {
    id: diaryData.id,
    title: diaryData.title,
    body: diaryData.body,
    lastEdited: utcToZonedTime(
      fromUnixTime(diaryData.lastEdited.seconds),
      "Asia/Tokyo"
    ).toISOString(),
  };
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
        const data = doc.data();
        diariesData.push({
          id: data.id,
          title: data.title,
          body: data.body,
          // eslint-disable-next-line no-underscore-dangle
          lastEdited: utcToZonedTime(
            fromUnixTime(data.lastEdited.seconds),
            "Asia/Tokyo"
          ).toISOString(),
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
