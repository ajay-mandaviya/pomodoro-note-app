import React from "react";
import { createContext, useContext } from "react";
import { SET_ARCHIVE, SET_NOTES, SET_TRASH } from "../constant/actionTypes";
import {
  addArchiveNoteAPI,
  archiveToTrashApi,
  restoreArchiveNoteApi,
  editArchiveNoteApi,
} from "../services";
import { useAuth } from "./AuthProvider";
import { useNotes } from "./NoteProvider";
import toast from "react-hot-toast";

const ArchiveContext = createContext();

const ArchiveProvider = ({ children }) => {
  const { dispatchNote } = useNotes();
  const {
    authUser: { token },
  } = useAuth();

  const addArchiveNote = async (note) => {
    try {
      const response = await addArchiveNoteAPI(token, note);
      if (response.status === 201 || 200) {
        dispatchNote({
          type: SET_NOTES,
          payload: response.data.notes,
        });
        dispatchNote({
          type: SET_ARCHIVE,
          payload: response.data.archives,
        });
        toast.success("Note Archived");
      }
    } catch (error) {
      console.log("error while add to archive", error);
      toast.error("Try Again");
    }
  };

  const restoreArchive = async (note) => {
    try {
      const response = await restoreArchiveNoteApi(token, note);

      if (response.status === 201 || 200) {
        dispatchNote({
          type: SET_NOTES,
          payload: response.data.notes,
        });
        dispatchNote({
          type: SET_ARCHIVE,
          payload: response.data.archives,
        });
        toast.success("Note Unarchived");
      }
    } catch (error) {
      console.log("eerrr while resore archive", error);
      toast.error("Try Again");
    }
  };

  const trashArchive = async (note) => {
    try {
      const response = await archiveToTrashApi(token, note);
      if (response.status === 201 || 200) {
        dispatchNote({
          type: SET_TRASH,
          payload: response.data.trash,
        });
        dispatchNote({
          type: SET_ARCHIVE,
          payload: response.data.archives,
        });

        toast.success("Add to Trash");
      }
    } catch (error) {
      console.log("error while archive to trash", error);
      toast.error("Try again");
    }
  };

  const editArchive = async (note, callBack) => {
    console.log("edit archive", note);
    try {
      const response = await editArchiveNoteApi(token, note);
      if (response.status === 201 || 200) {
        dispatchNote({
          type: SET_ARCHIVE,
          payload: response.data.archives,
        });
        dispatchNote({
          type: SET_NOTES,
          payload: response.data.notes,
        });
        toast.success("Archive Note Update");
        callBack && callBack(response.status);
      }
    } catch (error) {
      console.log("errro whule edit arcive", error);
      toast.error("Try again");
    }
  };

  return (
    <ArchiveContext.Provider
      value={{ addArchiveNote, restoreArchive, trashArchive, editArchive }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => useContext(ArchiveContext);
export default ArchiveProvider;
