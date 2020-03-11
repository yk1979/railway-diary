import { combineReducers } from "redux";

import diaryReducer from "./diary/reducers";

const rootReducer = combineReducers({
  diaryReducer
});

export default rootReducer;
