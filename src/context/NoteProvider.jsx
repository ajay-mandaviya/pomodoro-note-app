import React from "react";
import { createContext, useContext, useState, useReducer } from "react";
import { noteReducer } from "../reducer";

const NotesContext = createContext();

const NoteProvider = ({ children }) => {
  const initalFormValues = {
    noteTitle: "",
    tag: [],
    content: "<p><br></p>",
    bgColor: "#FFFFF",
    priority: { Low: "1" },
    lable: "",
  };
  const [textEditorVisible, settextEditorVisible] = useState(false);
  const [initalInput, setInitialInput] = useState(initalFormValues);
  const [noteState, dispatchNote] = useReducer(noteReducer, {
    notes: [],
    archives: [],
    trash: [],
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
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
export default NoteProvider;
