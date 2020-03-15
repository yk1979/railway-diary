import { combineReducers } from "redux";

import diaries from "./diary/reducers";
// import drafts from "./draft/reducers";

const rootReducer = combineReducers({
  diaries
  // drafts
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
