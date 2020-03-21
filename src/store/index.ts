import { combineReducers } from "redux";

import diaries from "./diary/reducers";
import { Diary } from "./diary/types";

const rootReducer = combineReducers({
  diaries
});

export type RootState = ReturnType<typeof rootReducer>;
export type State = {
  diaries: Diary[];
};

export default rootReducer;
