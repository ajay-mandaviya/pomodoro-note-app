import axios from "axios";

export const userLoginApi = async (user) => {
  return axios.post("api/auth/login", {
    email: user.email,
    password: user.password,
  });
};

export const userSignup = (user) => {
  return axios.post("api/auth/signup", user);
};
