import React from "react";
import { createContext, useContext } from "react";
import { SET_NOTES, SET_TRASH } from "../constant/actionTypes";
import { deleteTranshNoteApi, resoreTranshNoteApi } from "../services";
import { useAuth } from "./AuthProvider";
import { useNotes } from "./NoteProvider";
import toast from "react-hot-toast";

const TranshContext = createContext();

const TranshProvider = ({ children }) => {
  const {
    authUser: { token },
  } = useAuth();

  const { dispatchNote } = useNotes();
  const deleteTrashNote = async (e, note) => {
    e.stopPropagation();
    try {
      const response = await deleteTranshNoteApi(token, note);
      console.log("delete note response", response);
      if (response.status === 200) {
        dispatchNote({
          type: SET_TRASH,
          payload: response.data.trash,
        });
        toast.success("Note Deleted");
      }
    } catch (error) {
      console.log("error while dete transh", error);
      toast.error("tru again");
    }
  };

  const restoreNoteTrash = async (e, note) => {
    e.stopPropagation();
    try {
      const response = await resoreTranshNoteApi(token, note);
      // console.log("restoreNoteTrash", response);
      if (response.status === 200 || 201) {
        dispatchNote({
          type: SET_TRASH,
          payload: response.data.trash,
        });
        dispatchNote({
          type: SET_NOTES,
          payload: response.data.notes,
        });
        toast.success("Note Restore");
      }
    } catch (error) {
      console.log("error while restre note transh", error);
      toast.error("try again");
    }
  };

  return (
    <TranshContext.Provider value={{ deleteTrashNote, restoreNoteTrash }}>
      {children}
    </TranshContext.Provider>
  );
};

export const useTransh = () => useContext(TranshContext);

export default TranshProvider;
