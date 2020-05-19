import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import diary from "./diary/reducers";
import user from "./user/reducers";

export const rootReducer = combineReducers({
  diary,
  user
});

export type RootState = ReturnType<typeof rootReducer>;

const makeStore: MakeStore<RootState> = (ctx: Context) =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

export const wrapper = createWrapper<RootState>(makeStore);
