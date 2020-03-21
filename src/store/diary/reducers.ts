import firebase from "../../../firebase";
import {
  CREATE_DRAFT,
  DELETE_DIARY,
  Diary,
  DiaryActionTypes,
  TOGGLE_EDITING
} from "./types";

const firestore = firebase.firestore();
const initialDiaries: Diary[] = [];

firestore
  .collection("diaries")
  .get()
  .then(snapshots =>
    snapshots.forEach(doc => {
      initialDiaries.push(doc.data() as Diary);
    })
  );

const diaries = (state = initialDiaries, action: DiaryActionTypes) => {
  switch (action.type) {
    case CREATE_DRAFT:
      return [
        ...state,
        {
          id: new Date().getTime(),
          title: action.title || "タイトルなし",
          body: action.body,
          isEditing: true
        }
      ];
    case TOGGLE_EDITING: {
      const target = state.find(item => item.id === action.id);
      if (!target) return state;
      target.isEditing = !target?.isEditing;
      return state;
    }
    case DELETE_DIARY:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};

export default diaries;
