import { combineReducers } from "redux";

import diary from "./diary/reducers";
import user from "./user/reducers";

const rootReducer = combineReducers({
  diary,
  user
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
