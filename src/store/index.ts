import { useMemo } from "react";
import {
  AnyAction,
  Store,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import { Diary } from "../server/services/diaries/types";
import { reducer as diaries } from "./diaries/reducers";
import user from "./user/reducers";
import { UserState } from "./user/reducers";

export interface RootState {
  diaries: Diary[];
  user: UserState;
}

type MyStore = Store<RootState>;

let store: MyStore | undefined;

export const initialState: RootState = { diaries: [], user: null };

const combinedReducer = combineReducers({
  diaries,
  user,
});

export const rootReducer: typeof combinedReducer = (
  state: RootState = initialState,
  action: AnyAction
) => {
  return combinedReducer(state, action);
};

export const initStore = (preloadedState = initialState): MyStore => {
  const middlewares = [];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }

  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export const initializeStore = (preloadedState?: RootState): MyStore => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: RootState): MyStore {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
