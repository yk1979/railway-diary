import { USER_SIGN_IN, USER_SIGN_OUT, User, UserActionTypes } from "./types";

/**
 * action creators
 */
export const userSignIn = ({ uid, name, picture }: User): UserActionTypes => ({
  type: USER_SIGN_IN,
  payload: {
    uid,
    name,
    picture
  }
});

export const userSignOut = (): UserActionTypes => ({
  type: USER_SIGN_OUT
});
