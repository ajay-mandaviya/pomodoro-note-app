import { SET_TOKEN, SET_USER, AUTH_LOADING } from "../constant/actionTypes";

export const authReuder = (state, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      console.log("AUTH_LOADING in reducer", action.payload);
      return {
        ...state,
        auth_loading: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
