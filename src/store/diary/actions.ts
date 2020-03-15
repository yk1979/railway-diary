import {
  ADD_DIARY,
  CREATE_DRAFT,
  DELETE_DIARY,
  Diary,
  DiaryActionTypes
} from "./types";

/**
 * action creators
 */
export const createDraft = (title: string, body: string): DiaryActionTypes => ({
  type: CREATE_DRAFT,
  title,
  body
});

export const addDiary = (diary: Diary) => ({
  type: ADD_DIARY,
  diary
});

export const deleteDiary = (id: number): DiaryActionTypes => ({
  type: DELETE_DIARY,
  id
});
