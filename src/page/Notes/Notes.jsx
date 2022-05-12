import React from "react";
import { ModalTextEditor, Sidebar, TextEditor } from "../../components";
import { useNotes } from "../../context";
import "./note.css";

const Notes = () => {
  const {
    textEditorVisible,
    noteState: { notes },
  } = useNotes();

  console.log("NOTES", notes);

  return (
    <div className="notes-page-container">
      {/* <div className="notes"></div> */}
      {textEditorVisible && <ModalTextEditor />}
    </div>
  );
};

export default Notes;
