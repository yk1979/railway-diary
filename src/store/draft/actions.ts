import { CREATE_DRAFT, DraftActionTypes } from "./types";

/**
 * action creators
 */
// eslint-disable-next-line import/prefer-default-export
export const createDraft = (text: string): DraftActionTypes => ({
  type: CREATE_DRAFT,
  text
});
