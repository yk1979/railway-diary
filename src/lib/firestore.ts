import { fromUnixTime } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import {
  DeleteDiaryAction,
  Diary,
  GetDiariesAction,
  GetDiaryAction
} from "../store/diary/types";
import { User } from "../store/user/types";

export async function getUserFromFireStore({
  fireStore,
  userId
}: {
  fireStore: FirebaseFirestore.Firestore;
  userId: string;
}): Promise<User> {
  const user = await fireStore
    .collection(`users`)
    .doc(userId)
    .get()
    .then(doc => doc.data() as User);
  return {
    uid: userId,
    name: user.name || "No Name",
    picture: user.picture
  };
}

export async function getDiaryFromFireStore({
  fireStore,
  userId,
  diaryId
}: GetDiaryAction["payload"]): Promise<Diary | undefined> {
  const diaryData = await fireStore
    .collection(`users/${userId}/diaries/`)
    .doc(`${diaryId}`)
    .get()
    .then(doc => doc.data());
  if (!diaryData) return undefined;
  return {
    id: diaryData.id,
    title: diaryData.title,
    body: diaryData.body,
    lastEdited: utcToZonedTime(
      fromUnixTime(diaryData.lastEdited.seconds),
      "Asia/Tokyo"
    ).toISOString()
  };
}

export async function getDiariesFromFireStore({
  fireStore,
  userId
}: GetDiariesAction["payload"]) {
  const diariesData: any[] = [];
  await fireStore
    .collection(`users/${userId}/diaries`)
    .get()
    .then((collections: any) => {
      collections.forEach((doc: any) => {
        const data = doc.data();
        diariesData.push({
          id: data.id,
          title: data.title,
          body: data.body,
          // eslint-disable-next-line no-underscore-dangle
          lastEdited: utcToZonedTime(
            fromUnixTime(data.lastEdited.seconds),
            "Asia/Tokyo"
          ).toISOString()
        });
      });
    });
  return diariesData;
}

export async function deleteDiaryFromFireStore({
  fireStore,
  userId,
  diaryId
}: DeleteDiaryAction["payload"]) {
  await fireStore
    .collection(`users/${userId}/diaries/`)
    .doc(diaryId)
    .delete();
}
