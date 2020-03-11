import { Reducer } from "react";

import { ADD_DIARY, DELETE_DIARY, DiaryActionTypes, DiaryState } from "./types";

const initialState = {
  diaries: []
};

const diaryReducer: Reducer<DiaryState, DiaryActionTypes> = (
  state = initialState,
  action
): DiaryState => {
  switch (action.type) {
    case ADD_DIARY:
      return {
        ...state,
        diaries: [
          ...state.diaries,
          {
            text: action.text
          }
        ]
      };
    case DELETE_DIARY: {
      const target = state.diaries.indexOf({ text: action.text });
      return {
        ...state,
        diaries: state.diaries.splice(target, 1)
      };
    }
    default:
      return state;
  }
};

export default diaryReducer;
