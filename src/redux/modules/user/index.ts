import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

/**
 * types
 */
export type User = {
  uid: string;
  name: string | null;
  picture?: string;
};

export type UserState = User | null;

/**
 * actions
 */
const actionCreator = actionCreatorFactory();

export const userSignIn = actionCreator<User>("USER_SIGN_IN");
export const userSignOut = actionCreator("USER_SIGN_OUT");

/**
 * reducers
 */
const INITIAL_STATE = null;
const reducer = reducerWithInitialState<UserState>(INITIAL_STATE)
  .case(userSignIn, (_, payload) => payload)
  .case(userSignOut, () => null);

export default reducer;
