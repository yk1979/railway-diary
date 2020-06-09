/**
 * state types
 */
export type Diary = {
  id: string;
  title: string;
  body: string;
  lastEdited: string;
};
export type DiaryState = Diary | Diary[] | null;

/**
 * action types
 */
export const CREATE_DRAFT = "CREATE_DRAFT";
export const DELETE_DRAFT = "DELETE_DRAFT";
export const GET_DIARY = "GET_DIARY";
export const GET_DIARIES = "GET_DIARIES";
export const SET_DIARY = "SET_DIARY";
export const SET_DIARIES = "SET_DIARIES";
export const DELETE_DIARY = "DELETE_DIARY";

type CreateDraftAction = {
  type: typeof CREATE_DRAFT;
  payload: Diary;
};

type DeleteDraftAction = {
  type: typeof DELETE_DRAFT;
};

export type GetDiaryAction = {
  type: typeof GET_DIARY;
  payload: {
    firestore: FirebaseFirestore.Firestore;
    userId: string;
    diaryId: string;
  };
};

export type GetDiariesAction = {
  type: typeof GET_DIARIES;
  payload: {
    firestore: FirebaseFirestore.Firestore;
    userId: string;
  };
};

export type SetDiaryAction = {
  type: typeof SET_DIARY;
  payload: Diary;
};

export type SetDiariesAction = {
  type: typeof SET_DIARIES;
  payload: Diary[];
};

export type DeleteDiaryAction = {
  type: typeof DELETE_DIARY;
  payload: {
    firestore: FirebaseFirestore.Firestore | firebase.firestore.Firestore;
    userId: string;
    diaryId: string;
  };
};

export type DiaryActionTypes =
  | CreateDraftAction
  | DeleteDraftAction
  | GetDiaryAction
  | GetDiariesAction
  | SetDiaryAction
  | SetDiariesAction
  | DeleteDiaryAction;
