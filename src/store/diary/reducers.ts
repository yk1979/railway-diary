import {
  CREATE_DRAFT,
  DELETE_DIARY,
  DiaryActionTypes,
  DiaryState
} from "./types";

const diary = (state: DiaryState = null, action: DiaryActionTypes) => {
  switch (action.type) {
    case CREATE_DRAFT:
      return {
        id: new Date().getTime(),
        title: action.title || "タイトルなし",
        body: action.body
      };
    case DELETE_DIARY:
      return null;
    default:
      return state;
  }
};

export default diary;
