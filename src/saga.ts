/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AnyAction } from "redux";
import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  deleteDiaryFromFirestore,
  getDiariesFromFirestore,
  getDiaryFromFirestore,
} from "./lib/firestore";
import { setDiaries, setDiary } from "./store/diaries/actions";
import {
  DELETE_DIARY,
  GET_DIARIES,
  GET_DIARY,
  GetDiariesAction,
  GetDiaryAction,
} from "./store/diaries/types";

function* runGetDiary(action: GetDiaryAction) {
  const payload = yield call(getDiaryFromFirestore, action.payload);
  if (payload) {
    yield put(setDiary(payload));
  }
}

function* runGetDiaries(action: GetDiariesAction) {
  const payload = yield call(getDiariesFromFirestore, action.payload);
  if (payload) {
    yield put(setDiaries(payload));
  }
}

// TODO any修正
function* runDeleteDiary(action: AnyAction) {
  yield call(deleteDiaryFromFirestore, action.payload);
  const { firestore, userId } = action.payload;
  const payload = yield call(getDiariesFromFirestore, { firestore, userId });
  if (payload) {
    yield put(setDiaries(payload));
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
  yield all([handleGetDiary(), handleGetDiaries(), handleDeleteDiary()]);
}
