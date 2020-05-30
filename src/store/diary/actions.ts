import {
  CREATE_DRAFT,
  DELETE_DRAFT,
  Diary,
  DiaryActionTypes,
  GET_DIARIES,
  GET_DIARY,
  REQUEST_DIARIES,
  REQUEST_DIARY,
  RequestDiariesAction,
  RequestDiaryAction
} from "./types";

/**
 * action creators
 */
export const createDraft = (payload: Diary): DiaryActionTypes => ({
  type: CREATE_DRAFT,
  payload
});

export const deleteDraft = (): DiaryActionTypes => ({
  type: DELETE_DRAFT
});

export const requestDiary = (
  payload: RequestDiaryAction["payload"]
): DiaryActionTypes => ({
  type: REQUEST_DIARY,
  payload
});

export const requestDiaries = (
  payload: RequestDiariesAction["payload"]
): DiaryActionTypes => ({
  type: REQUEST_DIARIES,
  payload
});

export const getDiary = (payload: Diary): DiaryActionTypes => ({
  type: GET_DIARY,
  payload
});

export const getDiaries = (payload: Diary[]): DiaryActionTypes => ({
  type: GET_DIARIES,
  payload
});
