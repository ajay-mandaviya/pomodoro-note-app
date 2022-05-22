import {
  SET_NOTES,
  SET_TRASH,
  TOGGLE_COLOR_PALLETE,
} from "../constant/actionTypes";

export const noteReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case TOGGLE_COLOR_PALLETE:
      return {
        ...state,
        isColorPalleteVisible: action.payload,
      };
    case SET_TRASH:
      return {
        ...state,
        trash: action.payload,
      };
  }
};
