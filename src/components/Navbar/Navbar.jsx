import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context";
import "./navbar.css";

const Navbar = () => {
  const {
    authUser: { token },
    handleLogout,
  } = useAuth();
  console.log("token", token);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to={"/"} className="nav-title">
          <h2>Note App</h2>
        </Link>
        <h3 className="nav-page">Notes</h3>
      </div>
      <div>
        {token ? (
          <button
            className="login-btn"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="login-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
