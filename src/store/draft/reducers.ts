import { Reducer } from "react";

import { CREATE_DRAFT, DraftActionTypes, DraftState } from "./types";

const initialState: DraftState[] = [];

const drafts = (state = initialState, action: DraftActionTypes) => {
  switch (action.type) {
    case CREATE_DRAFT:
      return [
        ...state,
        {
          id: new Date().getTime(),
          text: action.text
        }
      ];
    default:
      return state;
  }
};

export default drafts;
