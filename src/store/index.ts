import { combineReducers } from "redux";

import diary from "./diary/reducers";

const rootReducer = combineReducers({
  diary
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
