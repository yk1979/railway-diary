import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { Diary } from "../../../server/services/diaries/types";

export type GetDiaryPayload = {
  firestore: FirebaseFirestore.Firestore;
  userId: string;
  diaryId: string;
};

export type GetDiariesPayload = {
  firestore: FirebaseFirestore.Firestore;
  userId: string;
};

export type deleteDiaryPayload = {
  firestore: FirebaseFirestore.Firestore | firebase.default.firestore.Firestore;
  userId: string;
  diaryId: string;
};

/**
 * actions
 */
const actionCreator = actionCreatorFactory();

export const createDraft = actionCreator<Diary>("CREATE_DRAFT");
export const deleteDraft = actionCreator("DELETE_DRAFT");
export const getDiary = actionCreator.async<
  GetDiaryPayload,
  Diary,
  any // TODO
>("GET_DIARY");
export const getDiaries = actionCreator.async<
  GetDiariesPayload,
  Diary[],
  any // TODO
>("GET_DIARIES");
export const setDiary = actionCreator<Diary>("SET_DIARY");
export const setDiaries = actionCreator<Diary[]>("SET_DIARIES");
export const deleteDiary = actionCreator<deleteDiaryPayload>("DELETE_DIARY");

/**
 * reducers
 */
// TODO 一緒に使うことは今のところないけど、下書きと後悔済みの日記が同じdiary stateで管理されているのは微妙な気が
const INITIAL_STATE: Diary[] = [];
export const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(createDraft, (_, payload) => [
    {
      ...payload,
      id: payload.id || String(new Date().getTime()),
      title: payload.title || "タイトルなし",
    },
  ])
  .case(deleteDraft, () => [])
  .case(getDiaries.started, (state) => state)
  .case(getDiaries.done, (_, { result }) => {
    // setDiaries(payload.result);
    return result;
  })
  .case(getDiary.started, (state) => state)
  .case(getDiary.done, (_, { result }) => {
    // setDiary(payload.result);
    return [result];
  })
  .case(setDiary, (_, payload) => [payload])
  .case(setDiaries, (_, payload) => payload);
