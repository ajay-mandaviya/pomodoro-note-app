import React from "react";
import { createContext, useContext, useState, useReducer } from "react";
import { noteReducer } from "../reducer";

const NotesContext = createContext();

const NoteProvider = ({ children }) => {
  const initalFormValues = {
    noteTitle: "",
    tag: [],
    content: "<p><br></p>",
    bgColor: "#F5F5F5",
    priority: { low: "1" },
    lable: "",
  };
  const [textEditorVisible, settextEditorVisible] = useState(false);
  const [initalInput, setInitialInput] = useState(initalFormValues);
  const [isNoteEditing, setIsNoteEditing] = useState(false);
  const [noteState, dispatchNote] = useReducer(noteReducer, {
    notes: [],
    archives: [],
    trash: [],
    isColorPalleteVisible: false,
  });

  return (
    <NotesContext.Provider
      value={{
        noteState,
        dispatchNote,
        textEditorVisible,
        settextEditorVisible,
        initalInput,
        setInitialInput,
        isNoteEditing,
        setIsNoteEditing,
        initalFormValues,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
export default NoteProvider;
