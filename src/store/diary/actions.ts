import {
  CREATE_DRAFT,
  DELETE_DIARY,
  Diary,
  DiaryActionTypes,
  TOGGLE_EDITING
} from "./types";

/**
 * action creators
 */
export const createDraft = (title: string, body: string): DiaryActionTypes => ({
  type: CREATE_DRAFT,
  title,
  body
});

export const toggleEditing = (id: number) => ({
  type: TOGGLE_EDITING,
  id
});

export const deleteDiary = (id: number): DiaryActionTypes => ({
  type: DELETE_DIARY,
  id
});
