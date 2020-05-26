import { fromUnixTime } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { getDiary } from "./store/diary/actions";
import { Diary, REQUEST_DIARY, RequestDairyAction } from "./store/diary/types";

const fetchDiaryFromFireStore = async ({
  fireStore,
  userId,
  diaryId
}: RequestDairyAction["payload"]): Promise<Diary | undefined> => {
  const diaryData = await fireStore
    .collection(`users/${userId}/diaries/`)
    .doc(`${diaryId}`)
    .get()
    // TODO any
    .then((doc: any) => doc.data());
  if (!diaryData) return undefined;
  return {
    id: diaryData.id,
    title: diaryData.title,
    body: diaryData.body,
    // eslint-disable-next-line no-underscore-dangle
    lastEdited: utcToZonedTime(
      fromUnixTime(diaryData.lastEdited.seconds),
      "Asia/Tokyo"
    ).toISOString()
  };
};

function* fetchDiary(action: RequestDairyAction) {
  const payload = yield call(fetchDiaryFromFireStore, action.payload);
  if (payload) {
    yield put(getDiary(payload));
  }
}

export function* handleFetchDiary() {
  yield takeEvery(REQUEST_DIARY, fetchDiary);
}

export default function* rootSaga() {
  yield all([handleFetchDiary()]);
}
