import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Store
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

export const makeStore: MakeStore<RootState> = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
