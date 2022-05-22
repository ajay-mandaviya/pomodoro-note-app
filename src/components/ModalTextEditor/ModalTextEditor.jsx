import React, { useState } from "react";
import toast from "react-hot-toast";
import { TOGGLE_COLOR_PALLETE } from "../../constant/actionTypes";
import { useArchive, useAuth, useNotes } from "../../context";
import { addNotes, editNotes } from "../../services/notes";
import { isArrayExits } from "../../utils/arrayMethod";
import ColorPallete from "../ColorPallete/ColorPallete";
import PriorityField from "../PriorityFieldModal/PriorityField";
import { TextEditor } from "../TextEditor/TextEditor";
import "./modalTextEditor.css";

const ModalTextEditor = () => {
  const [paleteVisible, setPaleteVisible] = useState(false);
  const [priorityVisible, setPriorityVisible] = useState(false);
  const { editArchive } = useArchive();
  const {
    authUser: { token },
  } = useAuth();

  const {
    initalInput,
    setInitialInput,
    dispatchNote,
    isNoteEditing,
    initalFormValues,
    setIsNoteEditing,
    settextEditorVisible,
    noteState: { notes, archives },
  } = useNotes();

  const isNoteExits = isArrayExits(notes, initalInput._id);
  const isInArchive = isArrayExits(archives, initalInput._id);
  // add to note

  console.log("isInArchive in modal", isInArchive);

  const handleAddToNote = (e) => {
    e.preventDefault();

    if (token) {
      initalInput["createdTime"] = new Date().toLocaleString();
      addNotes(initalInput, token, dispatchNote, (status) => {
        if (status === 201 || 200) {
          settextEditorVisible(false);
          setInitialInput(initalFormValues);
          setIsNoteEditing(false);
        }
      });
    } else {
      toast.error("Please Loggin to add Note");
    }
  };

  // edit note api
  const handleEditNote = (e) => {
    e.preventDefault();
    if (isNoteEditing && isInArchive) {
      initalInput["createdTime"] = new Date().toLocaleString();
      editArchive(initalInput, (status) => {
        if (status === 201 || 200) {
          settextEditorVisible(false);
          setInitialInput(initalFormValues);
          setIsNoteEditing(false);
        }
      });
    } else {
      initalInput["createdTime"] = new Date().toLocaleString();
      editNotes(token, initalInput, dispatchNote, (status) => {
        if (status === 201 || 200) {
          settextEditorVisible(false);
          setInitialInput(initalFormValues);
          setIsNoteEditing(false);
          toast.success("Note Update Successfully");
        }
      });
    }
  };

  return (
    <>
      <div className="editor-body">
        <div
          className="modal-editor"
          style={{
            backgroundColor: initalInput.bgColor,
            color: initalInput.bgColor === "#16504b" ? "white" : "black",
          }}
        >
          <form>
            <div className="bd-bottom">
              <input
                value={initalInput.noteTitle}
                onChange={(e) =>
                  setInitialInput({ ...initalInput, noteTitle: e.target.value })
                }
                type="text"
                className="big-input"
                placeholder="Enter note title"
              />
            </div>
            <TextEditor
              value={initalInput.content}
              setValue={(e) => setInitialInput({ ...initalInput, content: e })}
            />
            <div className="bd-top">
              <input
                type="text"
                className="big-input"
                placeholder="Add your lable"
                value={initalInput.lable}
                onChange={(e) =>
                  setInitialInput({ ...initalInput, lable: e.target.value })
                }
              />
            </div>
            <div className="editor-footer">
              <div className="editor-option">
                <i
                  role={"button"}
                  className="fa-solid fa-palette"
                  onClick={() => {
                    console.log("open note palate color");
                    setPriorityVisible(false);
                    setPaleteVisible(!paleteVisible);
                  }}
                ></i>
                <i
                  className="fa-solid fa-chart-bar"
                  onClick={() => {
                    setPaleteVisible(false);
                    setPriorityVisible(!priorityVisible);
                  }}
                ></i>
              </div>
              <div className="editor-action">
                <button
                  type="none"
                  onClick={(e) => {
                    e.preventDefault();
                    settextEditorVisible(false);
                    setInitialInput(initalFormValues);
                    if (isNoteEditing) {
                      setIsNoteEditing(false);
                    }
                  }}
                >
                  Cancel
                </button>
                {isNoteExits || isInArchive ? (
                  <button type="submit" onClick={handleEditNote}>
                    Save
                  </button>
                ) : (
                  <button type="submit" onClick={handleAddToNote}>
                    Add
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {paleteVisible && <ColorPallete setInitialInput={setInitialInput} />}
        {priorityVisible && (
          <div className="priorityfield-wrapper">
            <PriorityField />
          </div>
        )}
      </div>
    </>
  );
};

export { ModalTextEditor };
