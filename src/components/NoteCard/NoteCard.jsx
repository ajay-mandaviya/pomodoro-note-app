import React, { useState, useEffect, useRef } from "react";
import { useArchive, useAuth, useNotes, useTransh } from "../../context";
import { addNoteToTransh } from "../../services";
import { isArrayExits } from "../../utils/arrayMethod";
import ColorPallete from "../ColorPallete/ColorPallete";
import PriorityField from "../PriorityFieldModal/PriorityField";
import "./notecard.css";
import toast from "react-hot-toast";
const NoteCard = ({ note }) => {
  const colordRef = useRef();
  const priorityRef = useRef();
  const [paleteVisible, setPaleteVisible] = useState(false);
  const [priorityVisible, setPriorityVisible] = useState(false);
  const { deleteTrashNote, restoreNoteTrash } = useTransh();

  const {
    authUser: { token },
  } = useAuth();
  const {
    setInitialInput,
    setIsNoteEditing,
    settextEditorVisible,
    dispatchNote,
    noteState: { trash, archives },
  } = useNotes();
  const { addArchiveNote, restoreArchive, trashArchive } = useArchive();
  const isInTrash = isArrayExits(trash, note._id);
  const isInArchive = isArrayExits(archives, note._id);
  const handleOpeEditNote = () => {
    if (isInTrash) return;
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

  const handleTransh = (e) => {
    console.log("transh e", e);
    e.stopPropagation();
    if (token) {
      if (isInArchive) {
        trashArchive(note);
      } else {
        addNoteToTransh(token, note, dispatchNote);
      }
    } else {
      toast.error("You are not loggin");
    }
  };

  const handleAddArchive = (e) => {
    e.stopPropagation();
    if (token) {
      addArchiveNote(note);
    } else {
      toast.error("You are not loggin");
    }
  };

  const handleRestoreArchive = (e) => {
    e.stopPropagation();
    if (token) {
      restoreArchive(note);
    } else {
      toast.error("You are not loggin");
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
            {!isInTrash && (
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setPriorityVisible(false);
                  setPaleteVisible(!paleteVisible);
                }}
                className="fa-solid fa-palette"
              ></i>
            )}
            {!isInTrash && (
              <i
                className="fa-solid fa-chart-bar"
                onClick={(e) => {
                  e.stopPropagation();
                  setPaleteVisible(false);
                  setPriorityVisible(!priorityVisible);
                }}
              ></i>
            )}
            {isInTrash ? (
              <i
                className="fa-solid fa-trash-arrow-up"
                onClick={(e) => restoreNoteTrash(e, note)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-trash "
                onClick={(e) => handleTransh(e)}
              ></i>
            )}
            {!isInTrash && (
              <span>
                {isInArchive ? (
                  <i
                    className="fa-solid fa-circle-arrow-up"
                    onClick={(e) => handleRestoreArchive(e)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-circle-arrow-down"
                    onClick={(e) => handleAddArchive(e)}
                  ></i>
                )}
              </span>
            )}

            {isInTrash && (
              <i
                className="fa-solid fa-trash-can delete-transh"
                onClick={(e) => {
                  deleteTrashNote(e, note);
                }}
              ></i>
            )}
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
