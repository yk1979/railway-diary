/**
 * state types
 */
export type DiaryState = {
  diaries: {
    text: string;
  }[];
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
  text: string;
}

export type DiaryActionTypes = AddDiaryAction | DeleteDiaryAction;
