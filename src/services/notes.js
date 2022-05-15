import axios from "axios";
import { SET_NOTES } from "../constant/actionTypes";
import toast from "react-hot-toast";
export const getUserNotes = async (token, dispatchNote) => {
  try {
    const response = await axios.get("/api/notes", {
      headers: { authorization: token },
    });
    if (response.status === 201 || 200) {
      dispatchNote({
        type: SET_NOTES,
        payload: response.data.notes,
      });
    }
  } catch (error) {
    console.log("error while get user NOtes", error);
    toast.error("Some thing went wrong");
  }
};

export const addNotes = async (note, token, dispatchNote, callBack) => {
  try {
    const response = await axios.post(
      "/api/notes",
      {
        note,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (response.status === 201 || 200) {
      dispatchNote({
        type: SET_NOTES,
        payload: response.data.notes,
      });
      callBack && callBack(response.status);
      toast.success("Note add SuccessFully");
    }
  } catch (error) {
    console.log("error while add notes", error);
    toast.error("Some thing went wrong");
  }
};

export const editNotes = async (token, note, dispatchNote, callBack) => {
  try {
    const response = await axios.post(
      `/api/notes/${note._id}`,
      { note },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (response.status === 201 || 200) {
      dispatchNote({
        type: SET_NOTES,
        payload: response.data.notes,
      });
      callBack && callBack(response.status);
    }
  } catch (error) {
    console.log("error while edit notes", error);
    toast.error("Some thing went wrong");
  }
};
