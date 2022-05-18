import { SET_ARCHIVE, SET_NOTES, SET_TRASH } from "../constant/actionTypes";

export const noteReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case SET_ARCHIVE:
      return {
        ...state,
        archives: action.payload,
      };
    case SET_TRASH:
      return {
        ...state,
        trash: action.payload,
      };
  }
};
