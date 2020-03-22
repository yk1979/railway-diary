import { CREATE_DRAFT, DELETE_DIARY, DiaryActionTypes } from "./types";

/**
 * action creators
 */
export const createDraft = (title: string, body: string): DiaryActionTypes => ({
  type: CREATE_DRAFT,
  title,
  body
});

export const deleteDiary = (id: number): DiaryActionTypes => ({
  type: DELETE_DIARY,
  id
});
