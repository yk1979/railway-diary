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
export const REQUEST_DIARIES = "REQUEST_DIARIES";
export const GET_DIARY = "GET_DIARY";
export const GET_DIARIES = "GET_DIARIES";

type CreateDraftAction = {
  type: typeof CREATE_DRAFT;
  payload: Diary;
};

type DeleteDiaryAction = {
  type: typeof DELETE_DRAFT;
};

export type RequestDiaryAction = {
  type: typeof REQUEST_DIARY;
  payload: {
    fireStore: FirebaseFirestore.Firestore;
    userId: string;
    diaryId: string;
  };
};

export type RequestDiariesAction = {
  type: typeof REQUEST_DIARIES;
  payload: {
    fireStore: FirebaseFirestore.Firestore;
    userId: string;
  };
};

export type GetDiaryAction = {
  type: typeof GET_DIARY;
  payload: Diary;
};

export type GetDiariesAction = {
  type: typeof GET_DIARIES;
  payload: Diary[];
};

export type DiaryActionTypes =
  | CreateDraftAction
  | DeleteDiaryAction
  | RequestDiaryAction
  | RequestDiariesAction
  | GetDiaryAction
  | GetDiariesAction;
