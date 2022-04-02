import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context";

import "./login.css";

const Signup = () => {
  const { authUser : {auth_loading} ,   signupWithUser } = useAuth();
  const [user, setUsr] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUsr({
      ...user,
      [name]: value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signupWithUser(user);
  };

  return (
    <div className="login-container">
      <div className="img-box">
        <h2>Create An Account</h2>
      </div>
      <div className="content-box">
        <div className="form-box">
          <h2>Sign up</h2>
          <form onSubmit={handleSignup}>
            <div className="inputx-field">
              <span>Uset Name</span>
              <input
                value={user.name}
                type="text"
                name="name"
                onChange={handleInput}
              />
            </div>
            <div className="inputx-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div className="inputx-field">
              <span>Password</span>
              <input
                value={user.password}
                type="password"
                name="password"
                onChange={handleInput}
              />
            </div>
            <div className="remember">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
            </div>
            <div className="inputx-field">
              <input type="submit" value={auth_loading ?  "Creating..."   : "Sign In"} />
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

export default Signup;
