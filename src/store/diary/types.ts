/**
 * state types
 */
export type Diary = {
  id: number;
  title: string;
  body: string;
};

export type DiaryState = Diary | null;

/**
 * action types
 */
export const CREATE_DRAFT = "CREATE_DRAFT";
export const DELETE_DRAFT = "DELETE_DRAFT";

interface CreateDraftAction {
  type: typeof CREATE_DRAFT;
  id?: number;
  title: string;
  body: string;
}

interface DeleteDiaryAction {
  type: typeof DELETE_DRAFT;
  id: number;
}

export type DiaryActionTypes = CreateDraftAction | DeleteDiaryAction;
