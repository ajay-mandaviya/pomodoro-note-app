import React, { useState } from "react";
import { useAuth } from "../../context";

import "./login.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {
    authUser: { auth_loading },
    handleSignIn,
  } = useAuth();

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUserSignIn = (e) => {
    e.preventDefault();
    handleSignIn(user);
  };

  return (
    <div className="login-container">
      <div className="img-box">
        <h2>Welcome Back</h2>
      </div>
      <div className="content-box">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleUserSignIn}>
            <div className="inputx-field">
              <span>Email</span>
              <input
                name="email"
                value={user.email}
                type="email"
                onChange={handleUserInput}
              />
            </div>
            <div className="inputx-field">
              <span>Password</span>
              <input
                value={user.password}
                type="password"
                name="password"
                onChange={handleUserInput}
              />
            </div>
            <div className="remember">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
            </div>
            <div className="inputx-field">
              <input
                type="submit"
                value={auth_loading ? "Loging In.." : "Sign In"}
              />
            </div>
            <div className="inputx-field">
              <p>
                Don't Have Account <span>Sign up</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
