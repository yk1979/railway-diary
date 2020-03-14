import { Reducer } from "react";

import { ADD_DIARY, DELETE_DIARY, DiaryActionTypes, DiaryState } from "./types";

const initialState: DiaryState = [];

const diaryReducer: Reducer<DiaryState, DiaryActionTypes> = (
  state = initialState,
  action
): DiaryState => {
  switch (action.type) {
    case ADD_DIARY:
      return [
        ...state,
        {
          // TODO 暫定処理なのであとでどうにかする
          id: new Date().getTime(),
          text: action.text,
          isEditing: false
        }
      ];
    case DELETE_DIARY: {
      const target = state.find(item => item.id === action.id);
      return target ? state.splice(state.indexOf(target), 1) : state;
    }
    default:
      return state;
  }
};

export default diaryReducer;
