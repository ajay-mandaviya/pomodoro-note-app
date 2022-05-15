import React from "react";
import { ColorPallete, ModalTextEditor, NoteCard } from "../../components";
import { useNotes } from "../../context";
import "./note.css";

const Notes = () => {
  const {
    textEditorVisible,
    noteState: { notes },
  } = useNotes();

  return (
    <div className="notes-page-container">
      {notes.length === 0 ? (
        <p>Note's are not avaible</p>
      ) : (
        notes.map((note, index) => {
          return (
            <div key={note._id}>
              <NoteCard note={note} />
            </div>
          );
        })
      )}
      {/* <ColorPallete /> */}
      {textEditorVisible && <ModalTextEditor />}
    </div>
  );
};

export default Notes;
