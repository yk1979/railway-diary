/**
 * state types
 */
export type Diary = {
  id: string;
  title: string;
  body: string;
  lastEdited: string;
};
export type DiaryState = Diary | null;

/**
 * action types
 */
export const CREATE_DRAFT = "CREATE_DRAFT";
export const DELETE_DRAFT = "DELETE_DRAFT";

type CreateDraftAction = {
  type: typeof CREATE_DRAFT;
} & Diary;

type DeleteDiaryAction = {
  type: typeof DELETE_DRAFT;
};

export type DiaryActionTypes = CreateDraftAction | DeleteDiaryAction;
