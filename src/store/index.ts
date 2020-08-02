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
  Store,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import createSagaMiddleware, { Task } from "redux-saga";

import rootSaga from "../saga";
import diary from "./diary/reducers";
import { DiaryState } from "./diary/types";
import user from "./user/reducers";
import { UserState } from "./user/types";

export interface RootState {
  diary: DiaryState;
  user: UserState;
}
export interface SagaStore extends Store {
  sagaTask?: Task;
}

const combinedReducer = combineReducers({
  diary,
  user,
});

export const rootReducer: typeof combinedReducer = (
  state: RootState = { diary: null, user: null },
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.diary) {
      nextState.diary = state.diary;
    }
    return nextState;
  }
  return combinedReducer(state, action);
};

export const makeStore: MakeStore<RootState> = () => {
  const sagaMiddleware = createSagaMiddleware();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const middlewares: any[] = [sagaMiddleware];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

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
