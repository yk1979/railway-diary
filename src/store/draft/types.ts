/**
 * state types
 */
export type DraftState = {
  id: number;
  text: string;
};

/**
 * action types
 */
// eslint-disable-next-line import/prefer-default-export
export const CREATE_DRAFT = "CREATE_DRAFT";

interface CreateDraftAction {
  type: typeof CREATE_DRAFT;
  text: string;
}

export type DraftActionTypes = CreateDraftAction;
