import { SET_NOTES } from "../constant/actionTypes";

export const noteReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
  }
};
