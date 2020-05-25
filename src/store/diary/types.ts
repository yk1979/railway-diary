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
export const REQUEST_DIARY = "REQUEST_DIARY";
export const GET_DIARY = "GET_DIARY";

type CreateDraftAction = {
  type: typeof CREATE_DRAFT;
  payload: Diary;
};

type DeleteDiaryAction = {
  type: typeof DELETE_DRAFT;
};

export type RequestDairyAction = {
  type: typeof REQUEST_DIARY;
  payload: {
    fireStore: any;
    // fireStore: FirebaseFirestore.Firestore;
    userId: string;
    diaryId: string;
  };
};

export type GetDiaryAction = {
  type: typeof GET_DIARY;
  payload: Diary;
};

export type DiaryActionTypes =
  | CreateDraftAction
  | DeleteDiaryAction
  | RequestDairyAction
  | GetDiaryAction;
