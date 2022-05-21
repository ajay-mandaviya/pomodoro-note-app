import { SET_NOTES, TOGGLE_COLOR_PALLETE } from "../constant/actionTypes";

export const noteReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case TOGGLE_COLOR_PALLETE:
      console.log("isColorPalleteVisible: action.payload,", action.payload);
      return {
        ...state,
        isColorPalleteVisible: action.payload,
      };
  }
};
