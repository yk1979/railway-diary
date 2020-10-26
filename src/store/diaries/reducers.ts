import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { getDiariesFromFirestore } from "../../lib/firestore";
import {
  CREATE_DRAFT,
  DELETE_DIARY,
  DELETE_DRAFT,
  Diary,
  DiaryActionTypes,
  DiaryState,
  GET_DIARIES,
  GET_DIARY,
  SET_DIARIES,
  SET_DIARY,
} from "./types";

/**
 * actions
 */
const actionCreator = actionCreatorFactory();

export const createDraft = actionCreator<Diary>(CREATE_DRAFT);
export const deleteDraft = actionCreator(DELETE_DRAFT);
export const getDiary = actionCreator<{
  firestore: FirebaseFirestore.Firestore;
  userId: string;
  diaryId: string;
}>(GET_DIARY);
export const getDiaries = actionCreator<{
  firestore: FirebaseFirestore.Firestore;
  userId: string;
}>(GET_DIARIES);
export const setDiary = actionCreator<Diary>(SET_DIARY);
export const setDiaries = actionCreator<Diary[]>(SET_DIARIES);
export const deleteDiary = actionCreator<{
  firestore: FirebaseFirestore.Firestore | firebase.firestore.Firestore;
  userId: string;
  diaryId: string;
}>(DELETE_DIARY);

/**
 * reducers
 */
// TODO 一緒に使うことは今のところないけど、下書きと後悔済みの日記が同じdiary stateで管理されているのは微妙な気が
const INITIAL_STATE: Diary[] = [];
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(createDraft, (_, payload) => [
    {
      ...payload,
      id: payload.id || String(new Date().getTime()),
      title: payload.title || "タイトルなし",
    },
  ])
  .case(deleteDraft, () => [])
  .case(setDiary, (_, payload) => [payload])
  .case(setDiaries, (_, payload) => payload);

export default reducer;
