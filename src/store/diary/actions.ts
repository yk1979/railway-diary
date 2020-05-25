import {
  CREATE_DRAFT,
  DELETE_DRAFT,
  Diary,
  DiaryActionTypes,
  GET_DIARY,
  REQUEST_DIARY,
  RequestDairyAction
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
  payload: RequestDairyAction["payload"]
): DiaryActionTypes => ({
  type: REQUEST_DIARY,
  payload
});

export const getDiary = (payload: Diary): DiaryActionTypes => ({
  type: GET_DIARY,
  payload
});
