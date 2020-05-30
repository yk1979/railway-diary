import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  deleteDiaryFromFireStore,
  getDiariesFromFireStore,
  getDiaryFromFireStore
} from "./lib/firestore";
import { setDiaries, setDiary } from "./store/diary/actions";
import {
  DELETE_DIARY,
  DeleteDiaryAction,
  GET_DIARIES,
  GET_DIARY,
  GetDiariesAction,
  GetDiaryAction
} from "./store/diary/types";

function* runGetDiary(action: GetDiaryAction) {
  const payload = yield call(getDiaryFromFireStore, action.payload);
  if (payload) {
    yield put(setDiary(payload));
  }
}

function* runGetDiaries(action: GetDiariesAction) {
  const payload = yield call(getDiariesFromFireStore, action.payload);
  if (payload) {
    yield put(setDiaries(payload));
  }
}

function* runDeleteDiary(action: DeleteDiaryAction) {
  const payload = yield call(deleteDiaryFromFireStore, action.payload);
  if (payload) {
    yield put(setDiary(payload));
  }
}

export function* handleGetDiary() {
  yield takeEvery(GET_DIARY, runGetDiary);
}

export function* handleGetDiaries() {
  yield takeEvery(GET_DIARIES, runGetDiaries);
}

export function* handleDeleteDiary() {
  yield takeEvery(DELETE_DIARY, runDeleteDiary);
}

export default function* rootSaga() {
  yield all([handleGetDiary(), handleGetDiaries()]);
}
