import React from "react";
import { useAuth, useNotes } from "../../context";
import { addNotes } from "../../services/notes";
import { TextEditor } from "../TextEditor/TextEditor";
import "./modalTextEditor.css";

const ModalTextEditor = () => {
  const {
    authUser: { token },
  } = useAuth();

  const { initalInput, setInitialInput, dispatchNote } = useNotes();
  const handleAddToNote = (e) => {
    e.preventDefault();
    initalInput["createdTime"] = new Date().toLocaleString();
    addNotes(initalInput, token, dispatchNote, (status) => {
      if (status === 201 || 200) {
        settextEditorVisible(false);
      }
    });
  };
  const { settextEditorVisible } = useNotes();
  return (
    <div className="editor-body">
      <div className="modal-editor">
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
              <i role={"button"} className="fa-solid fa-palette"></i>
              <i className="fa-solid fa-chart-bar"></i>
            </div>
            <div className="editor-action">
              <button
                onClick={() => {
                  settextEditorVisible(false);
                }}
              >
                Cancel
              </button>
              <button type="submit" onClick={handleAddToNote}>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ModalTextEditor };
