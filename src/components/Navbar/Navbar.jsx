import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useNotes } from "../../context";
import "./navbar.css";
const Navbar = () => {
  const {
    authUser: { token },
  } = useAuth();
  const { settextEditorVisible } = useNotes();
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to={"/"} className="nav-title">
          <h2>Note App</h2>
        </Link>
        <Link to={"/notes"}>
          <h3 className="nav-page">Notes</h3>
        </Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={""}
          onChange={() => {}}
        />
      </div>
      <div className="btns">
        <button onClick={() => {}} className="filter-btn">
          <i className="fa fa-filter"></i>
        </button>
        <button
          onClick={() => {
            settextEditorVisible(true);
          }}
          className="more-btn"
        >
          <i className="fa-solid fa-plus"></i> Add Note
        </button>
        {/* {!token ? (
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
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
