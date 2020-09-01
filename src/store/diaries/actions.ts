import {
  CREATE_DRAFT,
  DELETE_DIARY,
  DELETE_DRAFT,
  DeleteDiaryAction,
  Diary,
  DiaryActionTypes,
  GET_DIARIES,
  GET_DIARY,
  GetDiariesAction,
  GetDiaryAction,
  SET_DIARIES,
  SET_DIARY,
} from "./types";

/**
 * action creators
 */
export const createDraft = (payload: Diary): DiaryActionTypes => ({
  type: CREATE_DRAFT,
  payload,
});

export const deleteDraft = (): DiaryActionTypes => ({
  type: DELETE_DRAFT,
});

export const getDiary = (
  payload: GetDiaryAction["payload"]
): DiaryActionTypes => ({
  type: GET_DIARY,
  payload,
});

export const getDiaries = (
  payload: GetDiariesAction["payload"]
): DiaryActionTypes => ({
  type: GET_DIARIES,
  payload,
});

export const setDiary = (payload: Diary): DiaryActionTypes => ({
  type: SET_DIARY,
  payload,
});

export const setDiaries = (payload: Diary[]): DiaryActionTypes => ({
  type: SET_DIARIES,
  payload,
});

export const deleteDiary = (
  payload: DeleteDiaryAction["payload"]
): DiaryActionTypes => ({
  type: DELETE_DIARY,
  payload,
});
