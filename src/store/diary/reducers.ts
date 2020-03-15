import { Reducer } from "react";

import {
  ADD_DIARY,
  DELETE_DIARY,
  DiaryActionTypes,
  DiaryState,
  TOGGLE_EDITING
} from "./types";

const initialState: DiaryState[] = [];

const diaries = (state = initialState, action: DiaryActionTypes) => {
  switch (action.type) {
    case ADD_DIARY:
      return [
        ...state,
        {
          // TODO 暫定処理なのであとでどうにかする
          id: new Date().getTime(),
          text: action.text,
          isEditing: true
        }
      ];
    case TOGGLE_EDITING: {
      const target = state.find(item => item.id === action.id);
      if (!target) return state;
      target.isEditing = !target.isEditing;
      return state;
    }
    case DELETE_DIARY:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};

export default diaries;
