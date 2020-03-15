/**
 * state types
 */
export type Diary = {
  id: number;
  text: string;
  isEditing: boolean;
};

export type DiaryState = {
  diaries: Diary[];
};

/**
 * action types
 */
export const ADD_DIARY = "ADD_DIARY";
export const DELETE_DIARY = "DELETE_DIARY";

interface AddDiaryAction {
  type: typeof ADD_DIARY;
  text: string;
}

interface DeleteDiaryAction {
  type: typeof DELETE_DIARY;
  id: number;
}

export type DiaryActionTypes = AddDiaryAction | DeleteDiaryAction;
