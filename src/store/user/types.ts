/**
 * state types
 */
export type User = {
  uid: string;
  name: string | null;
  picture?: string;
};

export type UserState = User | null;

/**
 * action types
 */
export const USER_SIGN_IN = "USER_SIGN_IN";
export const USER_SIGN_OUT = "USER_SIGN_OUT";
export const TOGGLE_EDITING = "TOGGLE_EDITING";
export const DELETE_DRAFT = "DELETE_DRAFT";

interface UserSignInAction {
  type: typeof USER_SIGN_IN;
  payload: User;
}

interface UserSignOutAction {
  type: typeof USER_SIGN_OUT;
}

export type UserActionTypes = UserSignInAction | UserSignOutAction;
