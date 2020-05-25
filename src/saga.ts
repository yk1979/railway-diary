import { all, call, takeEvery } from "redux-saga/effects";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function* helloSaga() {
  yield call(delay, 1000);
  yield console.log("Hello Sagas!");
}

export function* watchIncrementAsync() {
  yield takeEvery("SAGA_TEST", helloSaga);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
