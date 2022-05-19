import React from "react";
import {
  ColorPallete,
  FiltertsModal,
  ModalTextEditor,
  NoteCard,
} from "../../components";
import { useNotes } from "../../context";
import "./note.css";

const Notes = () => {
  const {
    textEditorVisible,
    noteState: { notes },
    filter: { filterByDate, filterByPriority, filterNoteCategory },
  } = useNotes();

  console.log("filterNoteCategory", filterByPriority);

  console.log("notes", notes);
  const filterNotes = () => {
    let sortNotes = notes;

    if (filterByDate) {
      sortNotes = sortNotes.sort((a, b) => {
        if (filterByDate === "latest") {
          return new Date(b.createdTime) - new Date(a.createdTime);
        } else {
          return new Date(a.createdTime) - new Date(b.createdTime);
        }
      });
    }

    if (filterByPriority) {
      sortNotes = sortNotes.sort((a, b) => {
        if (filterByPriority === "lowToHigh") {
          return Object.values(a.priority)[0] - Object.values(b.priority)[0];
        } else {
          return Object.values(b.priority)[0] - Object.values(a.priority)[0];
        }
      });
    }
    if (filterNoteCategory.length) {
      sortNotes = sortNotes.filter((note) =>
        filterNoteCategory.includes(Object.keys(note.priority)[0])
      );
    }
    return sortNotes;
  };

  const newFilterNotes = filterNotes();

  return (
    <div className="notes-page-container">
      {newFilterNotes.length === 0 ? (
        <p>Note's are not avaible</p>
      ) : (
        newFilterNotes.map((note, index) => {
          return (
            <div key={note._id}>
              <NoteCard note={note} />
            </div>
          );
        })
      )}

      {textEditorVisible && <ModalTextEditor />}
    </div>
  );
};

export default Notes;
