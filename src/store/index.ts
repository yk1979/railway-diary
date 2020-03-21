import { combineReducers } from "redux";

import diaries from "./diary/reducers";
import { Diary } from "./diary/types";

export type State = {
  diaries: Diary[];
};

const rootReducer = combineReducers({
  diaries
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
