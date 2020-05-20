import { Context, createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import diary from "./diary/reducers";
import { DiaryState } from "./diary/types";
import user from "./user/reducers";
import { UserState } from "./user/types";

export interface RootState {
  diary: DiaryState;
  user: UserState;
}

const combinedReducer = combineReducers({
  diary,
  user
});

export const rootReducer = (
  state: RootState = { diary: null, user: null },
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    };
    if (state.diary) {
      nextState.diary = state.diary;
    }
    return nextState;
  }
  return combinedReducer(state, action);
};

const makeStore: MakeStore<RootState> = (ctx: Context) =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
