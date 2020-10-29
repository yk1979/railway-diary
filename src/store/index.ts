import { ParsedUrlQuery } from "querystring";

import { GetServerSideProps } from "next";
import {
  HYDRATE,
  MakeStore,
  MyNextContext,
  createWrapper,
} from "next-redux-wrapper";
import {
  AnyAction,
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

const combinedReducer = combineReducers({
  diaries,
  user,
});

export const rootReducer: typeof combinedReducer = (
  state: RootState = { diaries: [], user: null },
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducer(state, action);
};

export const makeStore: MakeStore<RootState> = () => {
  const middlewares: any[] = [];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
};

const originalWrapper = createWrapper<RootState>(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

// typescript3.9以降で、next-redux-wrapper側で定義されているgetServerSideProps型が独自に拡張できなくなってしまった
// contextをexpressに対応した独自の型に拡張するために以下のようにしている
// next-redux-wrapperのアップデート状況に応じて見直す必要がある (thanks to @ics-ikeda)
type MyWrapper = Omit<typeof originalWrapper, "getServerSideProps"> & {
  getServerSideProps: <P extends Record<string, unknown> = any>(
    callback: (context: MyNextContext) => void | P | Promise<P>
  ) => GetServerSideProps<P, ParsedUrlQuery>;
};

export const wrapper = originalWrapper as MyWrapper;
