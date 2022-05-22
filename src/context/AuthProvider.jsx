import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { SET_TOKEN, SET_USER, AUTH_LOADING } from "../constant/actionTypes";
import { authReuder } from "../reducer";
import { userLoginApi, userSignup } from "../services";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, dispatchAuth] = useReducer(authReuder, {
    auth_loading: false,
    user: "",
    token: "",
  });

  useEffect(() => {
    const user_note = JSON.parse(localStorage.getItem("user_note"));
    user_note?.token &&
      dispatchAuth({
        type: SET_TOKEN,
        payload: user_note.token,
      });

    user_note?.user &&
      dispatchAuth({
        type: SET_USER,
        payload: user_note.user,
      });
  }, [authUser.token]);

  const handleSignIn = async (user) => {
    try {
      dispatchAuth({
        type: AUTH_LOADING,
        payload: true,
      });
      const {
        data: { foundUser, encodedToken },
        status,
      } = await userLoginApi(user);

      dispatchAuth({
        type: AUTH_LOADING,
        payload: false,
      });

      if (status === 200) {
        localStorage.setItem(
          "user_note",
          JSON.stringify({
            token: encodedToken,
            user: foundUser,
          })
        );

        dispatchAuth({
          type: SET_USER,
          payload: foundUser,
        });
        dispatchAuth({
          type: SET_TOKEN,
          payload: encodedToken,
        });
      }

      navigate("/");
    } catch (error) {
      dispatchAuth({
        type: AUTH_LOADING,
        payload: false,
      });
      console.log("error while signin", error);
    }
  };

  const signupWithUser = async (user) => {
    try {
      dispatchAuth({
        type: AUTH_LOADING,
        payload: true,
      });
      const {
        data: { foundUser, encodedToken },
      } = await userSignup(user);
      console.log("foundUser", foundUser);

      localStorage.setItem(
        "user_note",
        JSON.stringify({
          token: encodedToken,
          user: foundUser,
        })
      );
      dispatchAuth({
        type: SET_TOKEN,
        payload: encodedToken,
      });
      dispatchAuth({
        type: SET_USER,
        payload: foundUser,
      });
      navigate("/");
      dispatchAuth({
        type: AUTH_LOADING,
        payload: false,
      });
    } catch (error) {
      dispatchAuth({
        type: AUTH_LOADING,
        payload: false,
      });
      console.log("erro while signup ", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_note");
    dispatchAuth({
      type: SET_USER,
      payload: "",
    });
    dispatchAuth({
      type: SET_TOKEN,
      payload: "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        handleSignIn,
        dispatchAuth,
        signupWithUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
