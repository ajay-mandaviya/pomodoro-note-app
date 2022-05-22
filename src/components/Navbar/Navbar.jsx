import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, useNotes } from "../../context";
import FiltertsModal from "../FiltertsModal/FiltertsModal";
import "./navbar.css";

const Navbar = () => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const location = useLocation();
  const filterModalRef = useRef();
  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (
        isFilterModalVisible &&
        filterModalRef?.current &&
        !filterModalRef?.current?.contains(e.target)
      ) {
        setIsFilterModalVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [isFilterModalVisible]);

  // const { authUser } = useAuth();
  const { settextEditorVisible, setIsNoteEditing } = useNotes();
  const navigate = useNavigate();
  return (
    <div className="navbar" ref={filterModalRef}>
      <div className="nav-logo">
        <Link to={"/"} className="nav-title">
          <h2>My Notes</h2>
        </Link>
      </div>
      <div className="nabar-search">
        <input
          type="text"
          placeholder="Search"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>
      {location.pathname === "/" ? (
        <div className="btns">
          <button
            onClick={() => {
              setIsFilterModalVisible(!isFilterModalVisible);
            }}
            className="filter-btn"
          >
            <i className="fa fa-filter"></i>
          </button>
          {isFilterModalVisible && <FiltertsModal />}
          <button
            onClick={() => {
              settextEditorVisible(true);
              setIsNoteEditing(true);
            }}
            className="more-btn"
          >
            <i className="fa-solid fa-plus"></i> Add Note
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
