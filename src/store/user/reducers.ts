import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
  UserActionTypes,
  UserState
} from "./types";

const user = (state: UserState = null, action: UserActionTypes) => {
  switch (action.type) {
    case USER_SIGN_IN: {
      return {
        uid: action.uid,
        name: action.name
      };
    }
    case USER_SIGN_OUT:
      return null;
    default:
      return state;
  }
};

export default user;
