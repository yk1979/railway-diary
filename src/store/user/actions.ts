import { User, USER_SIGN_IN, USER_SIGN_OUT, UserActionTypes } from "./types";

/**
 * action creators
 */
export const userSignIn = ({ uid, name }: User): UserActionTypes => ({
  type: USER_SIGN_IN,
  uid,
  name
});

export const userSignOut = (): UserActionTypes => ({
  type: USER_SIGN_OUT
});
