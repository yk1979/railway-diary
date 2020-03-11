import { ADD_DIARY, DELETE_DIARY, DiaryActionTypes } from "./types";

/**
 * action creators
 */
export const addDiary = (text: string): DiaryActionTypes => ({
  type: ADD_DIARY,
  text
});

export const deleteDiary = (text: string): DiaryActionTypes => ({
  type: DELETE_DIARY,
  text
});