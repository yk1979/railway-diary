import { CREATE_DRAFT, DELETE_DRAFT, Diary, DiaryActionTypes } from "./types";

/**
 * action creators
 */
export const createDraft = ({
  id,
  title,
  body,
  lastEdited
}: Diary): DiaryActionTypes => ({
  type: CREATE_DRAFT,
  payload: {
    id,
    title,
    body,
    lastEdited
  }
});

export const deleteDraft = (): DiaryActionTypes => ({
  type: DELETE_DRAFT
});
