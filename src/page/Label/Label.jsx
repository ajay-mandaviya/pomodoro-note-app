import React, { useState } from "react";
import { useNotes } from "../../context";
import { ModalTextEditor, NoteCard } from "../../components";
const Label = () => {
  const {
    textEditorVisible,
    noteState: { notes },
  } = useNotes();

  const tag = notes.filter((item) => item.lable !== "");

  return (
    <div className="notes-page-container">
      {tag.length === 0 ? (
        <p>No Tags Not Founds</p>
      ) : (
        tag.map((note, index) => {
          return (
            <div key={note._id}>
              <span>
                Label :<strong> {note.lable}</strong>
              </span>
              <NoteCard note={note} />
            </div>
          );
        })
      )}

      {textEditorVisible && <ModalTextEditor />}
    </div>
  );
};

export default Label;
