import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  fetchDiariesFromFireStore,
  fetchDiaryFromFireStore
} from "./lib/firestore";
import { getDiaries, getDiary } from "./store/diary/actions";
import {
  REQUEST_DIARIES,
  REQUEST_DIARY,
  RequestDiariesAction,
  RequestDiaryAction
} from "./store/diary/types";

function* fetchDiary(action: RequestDiaryAction) {
  const payload = yield call(fetchDiaryFromFireStore, action.payload);
  if (payload) {
    yield put(getDiary(payload));
  }
}

function* fetchDiaries(action: RequestDiariesAction) {
  const payload = yield call(fetchDiariesFromFireStore, action.payload);
  if (payload) {
    yield put(getDiaries(payload));
  }
}

export function* handleFetchDiary() {
  yield takeEvery(REQUEST_DIARY, fetchDiary);
}

export function* handleFetchDiaries() {
  yield takeEvery(REQUEST_DIARIES, fetchDiaries);
}

export default function* rootSaga() {
  yield all([handleFetchDiary(), handleFetchDiaries()]);
}
