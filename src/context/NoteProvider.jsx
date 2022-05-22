import React from "react";
import { createContext, useContext, useState, useReducer } from "react";
import { filterReducer, noteReducer } from "../reducer";
import { v4 as uuid } from "uuid";
const NotesContext = createContext();
const NoteProvider = ({ children }) => {
  const initalFormValues = {
    noteTitle: "",
    tag: [],
    content: "<p><br></p>",
    bgColor: "#F5F5F5",
    priority: { low: "1" },
    lable: "",
    _id: uuid(),
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
  const [filter, filterDispatch] = useReducer(filterReducer, {
    filterByDate: "",
    filterByPriority: "",
    filterNoteCategory: [],
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
        filterDispatch,
        filter,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
export default NoteProvider;
