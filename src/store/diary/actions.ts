import { CREATE_DRAFT, DELETE_DRAFT, DiaryActionTypes } from "./types";

/**
 * action creators
 */
export const createDraft = ({
  id,
  title,
  body
}: {
  id: number | undefined;
  title: string;
  body: string;
}): DiaryActionTypes => ({
  type: CREATE_DRAFT,
  id,
  title,
  body
});

export const deleteDraft = (id: number): DiaryActionTypes => ({
  type: DELETE_DRAFT,
  id
});
