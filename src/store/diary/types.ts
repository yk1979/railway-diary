/**
 * state types
 */
export type Diary = {
  id: number;
  text: string;
  draft: boolean;
  isEditing: boolean;
};

/**
 * action types
 */
export const CREATE_DRAFT = "CREATE_DRAFT";
export const ADD_DIARY = "ADD_DIARY";
export const TOGGLE_EDITING = "TOGGLE_EDITING";
export const DELETE_DIARY = "DELETE_DIARY";

interface CreateDraftAction {
  type: typeof CREATE_DRAFT;
  text: string;
}

interface AddDiaryAction {
  type: typeof ADD_DIARY;
  diary: Diary;
}

interface SetEditingAction {
  type: typeof TOGGLE_EDITING;
  diary: Diary;
}

interface DeleteDiaryAction {
  type: typeof DELETE_DIARY;
  id: number;
}

export type DiaryActionTypes =
  | CreateDraftAction
  | AddDiaryAction
  | SetEditingAction
  | DeleteDiaryAction;
