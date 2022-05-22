import axios from "axios";
import { SET_ARCHIVE } from "../constant/actionTypes";

export const archivesNotesApi = async (token, dispatchNote) => {
  try {
    const response = await axios.get("/api/archives", {
      headers: {
        authorization: token,
      },
    });

    if (response.status === 200) {
      dispatchNote({
        type: SET_ARCHIVE,
        payload: response.data.archives,
      });
    }
  } catch (error) {
    console.log("error while get arcgive nites", error);
  }
};

export const addArchiveNoteAPI = (token, note) => {
  return axios.post(
    `/api/notes/archives/${note._id}`,
    { note },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

// restoreArchiveNoteApi
export const restoreArchiveNoteApi = (token, note) => {
  return axios.post(
    `/api/archives/restore/${note._id}`,
    { note },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const archiveToTrashApi = (token, note) => {
  return axios.post(
    `/api/archives/trash/${note._id}`,
    { note },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const editArchiveNoteApi = (token, note) => {
  return axios.post(
    `/api/archives/${note._id}`,
    { note },
    { headers: { authorization: token } }
  );
};
