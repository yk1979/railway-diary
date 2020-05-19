import {
  CREATE_DRAFT,
  DELETE_DRAFT,
  DiaryActionTypes,
  DiaryState
} from "./types";

const diary = (state: DiaryState = null, action: DiaryActionTypes) => {
  switch (action.type) {
    case CREATE_DRAFT: {
      return {
        id: action.payload.id || String(new Date().getTime()),
        title: action.payload.title || "タイトルなし",
        body: action.payload.body,
        lastEdited: action.payload.lastEdited
      };
    }
    case DELETE_DRAFT:
      return null;
    default:
      return state;
  }
};

export default diary;
