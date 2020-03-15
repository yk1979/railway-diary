import {
  ADD_DIARY,
  DELETE_DIARY,
  DiaryActionTypes,
  TOGGLE_EDITING
} from "./types";

/**
 * action creators
 */
export const addDiary = (text: string): DiaryActionTypes => ({
  type: ADD_DIARY,
  text
});

export const toggleEditing = (id: number): DiaryActionTypes => ({
  type: TOGGLE_EDITING,
  id
});

export const deleteDiary = (id: number): DiaryActionTypes => ({
  type: DELETE_DIARY,
  id
});
