import { Reducer } from "react";

import {
  ADD_DIARY,
  DELETE_DIARY,
  DiaryActionTypes,
  DiaryState,
  TOGGLE_EDITING
} from "./types";

const initialState: DiaryState = { diaries: [] };

const diaryReducer: Reducer<DiaryState, DiaryActionTypes> = (
  state = initialState,
  action
): DiaryState => {
  const { diaries } = state;
  switch (action.type) {
    case ADD_DIARY:
      return {
        diaries: [
          ...diaries,
          {
            // TODO 暫定処理なのであとでどうにかする
            id: new Date().getTime(),
            text: action.text,
            isEditing: true
          }
        ]
      };
    case TOGGLE_EDITING: {
      const target = diaries.find(item => item.id === action.id);
      if (!target) return state;
      target.isEditing = !target.isEditing;
      return state;
    }
    case DELETE_DIARY:
      return {
        diaries: diaries.filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
};

export default diaryReducer;
