import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink
            to={"/notes"}
            className={({ isActive }) => (isActive ? "active" : null)}
          >
            <i className="fa-solid fa-house"></i> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/label"}
            className={({ isActive }) => (isActive ? "active" : null)}
          >
            <i className="fa-solid fa-tags"></i> Labels
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/archive"}
            className={({ isActive }) => (isActive ? "active" : null)}
          >
            <i className="fa-solid fa-box-archive"></i> Archive
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/trash"}
            className={({ isActive }) => (isActive ? "active" : null)}
          >
            <i className="fa-solid fa-trash-can"></i> Trash
          </NavLink>
        </li>
      </ul>
      <div className="profile-logout">
        <div>
          <i className="fa-solid fa-circle-user"></i> Admin
        </div>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
  );
};
