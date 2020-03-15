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
export const createDraft = (text: string): DiaryActionTypes => ({
  type: CREATE_DRAFT,
  text
});

export const addDiary = (diary: Diary) => ({
  type: ADD_DIARY,
  diary
});

export const deleteDiary = (id: number): DiaryActionTypes => ({
  type: DELETE_DIARY,
  id
});
