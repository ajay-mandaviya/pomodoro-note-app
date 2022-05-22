import React from "react";
import { ModalTextEditor, NoteCard } from "../../components";
import { useNotes } from "../../context";

const Archive = () => {
  const {
    textEditorVisible,
    noteState: { archives },
  } = useNotes();

  return (
    <div className="notes-page-container">
      {archives.length === 0 ? (
        <p>Note's are not avaible</p>
      ) : (
        archives.map((note, index) => {
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

export default Archive;
