import { Reducer } from "react";

import { ADD_DIARY, DELETE_DIARY, DiaryActionTypes, DiaryState } from "./types";

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
            isEditing: false
          }
        ]
      };
    case DELETE_DIARY: {
      const target = diaries.find(item => item.id === action.id);
      if (!target) return state;
      return {
        diaries: diaries.splice(diaries.indexOf(target), 1)
      };
    }
    default:
      return state;
  }
};

export default diaryReducer;
