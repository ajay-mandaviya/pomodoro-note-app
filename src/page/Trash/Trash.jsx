import React from "react";
import { NoteCard } from "../../components";
import { useNotes } from "../../context";

const Trash = () => {
  const {
    noteState: { trash },
  } = useNotes();
  console.log("trash", trash);
  return (
    <div className="notes-page-container">
      {trash.length === 0 ? (
        <p>Trash Is Empty</p>
      ) : (
        trash.map((note, index) => {
          return (
            <div key={note._id}>
              <NoteCard note={note} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Trash;
