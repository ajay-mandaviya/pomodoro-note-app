import React, { useState, useEffect, useRef } from "react";
import { useNotes } from "../../context";
import ColorPallete from "../ColorPallete/ColorPallete";
import PriorityField from "../PriorityFieldModal/PriorityField";
import "./notecard.css";

const NoteCard = ({ note }) => {
  const [paleteVisible, setPaleteVisible] = useState(false);
  const [priorityVisible, setPriorityVisible] = useState(false);
  const colordRef = useRef();
  const priorityRef = useRef();
  const { setInitialInput, setIsNoteEditing, settextEditorVisible } =
    useNotes();
  const handleOpeEditNote = () => {
    setInitialInput(note);
    settextEditorVisible(true);
    setIsNoteEditing(true);
  };

  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (
        paleteVisible &&
        colordRef?.current &&
        !colordRef?.current?.contains(e.target)
      ) {
        setPaleteVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [paleteVisible]);

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case "low":
        return "rgb(253, 236, 200)";
      case "medium":
        return "rgb(211, 229, 239)";
      case "high":
        return "#fcdd63";
      default:
        return "rgb(219, 237, 219)";
    }
  };

  return (
    <>
      <div
        onClick={handleOpeEditNote}
        className="note-card"
        style={{
          backgroundColor: note.bgColor,
          color: note.bgColor === "#16504b" ? "white" : "black",
        }}
      >
        <div className="note-card-body">
          <div className="note-title note-mr">
            <div>{note.noteTitle}</div>
            <div
              className="priority-label"
              style={{
                backgroundColor: getPriorityBgColor(
                  Object.keys(note.priority)[0]
                ),
              }}
            >
              {Object.keys(note.priority)[0]}
            </div>
          </div>
          <div className="note-mr ">
            <div
              className="note-card-qill"
              dangerouslySetInnerHTML={{ __html: note.content }}
            ></div>
          </div>
          <div className="note-mr note-card-label">
            <p>{note.lable}</p>
          </div>
        </div>

        <div className="note-card-action">
          <div>{note.createdTime}</div>
          <div className="note-icons">
            <i
              onClick={(e) => {
                e.stopPropagation();
                setPriorityVisible(false);
                setPaleteVisible(!paleteVisible);
              }}
              className="fa-solid fa-palette"
            ></i>
            <i
              className="fa-solid fa-chart-bar"
              onClick={(e) => {
                e.stopPropagation();
                setPaleteVisible(false);
                setPriorityVisible(!priorityVisible);
              }}
            ></i>
            <i className="fa-solid fa-trash"></i>
            <i className="fa-solid fa-circle-arrow-down"></i>
          </div>
        </div>
      </div>
      {paleteVisible && (
        <div className="colorpallete-wrapper">
          <ColorPallete note={note} colordRef={colordRef} />
        </div>
      )}
      {priorityVisible && (
        <PriorityField note={note} priorityRef={priorityRef} />
      )}
    </>
  );
};

export default NoteCard;

//  <i class="fa-solid fa-circle-arrow-up"></i>
//  <i classNsame="fa-solid fa-trash-can-arrow-up"></i>
