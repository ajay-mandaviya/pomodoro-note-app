import axios from "axios";
import toast from "react-hot-toast";
import { SET_NOTES, SET_TRASH } from "../constant/actionTypes";
export const getUserTranshNotes = async (token, dispatchNote) => {
  try {
    const response = await axios.get("/api/trash", {
      headers: { authorization: token },
    });
    console.log("transh note response", response);
    if (response.status === 200) {
      dispatchNote({
        type: SET_TRASH,
        payload: response.data.trash,
      });
    }
  } catch (error) {
    console.log("Error while get trans notrs", error);
  }
};

export const addNoteToTransh = async (token, note, dispatchNote) => {
  console.log("gettting id is", note);
  try {
    const response = await axios.post(
      `/api/notes/trash/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );
    if (response.status === 200 || 201) {
      dispatchNote({
        type: SET_TRASH,
        payload: response.data.trash,
      });
      dispatchNote({
        type: SET_NOTES,
        payload: response.data.notes,
      });
      toast.success("Note Move to Trash");
    }
  } catch (error) {
    console.log("Erro while add transh note", error);
    toast.error("Some thing went wrong");
  }
};

export const resoreTranshNoteApi = async (token, note) => {
  return axios.post(
    `/api/trash/restore/${note._id}`,
    {
      note,
    },
    { headers: { authorization: token } }
  );
};

export const deleteTranshNoteApi = async (token, note) => {
  return axios.delete(`/api/trash/delete/${note._id}`, {
    headers: { authorization: token },
  });
};
