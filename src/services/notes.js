import axios from "axios";
import { SET_NOTES } from "../constant/actionTypes";

export const getUserNotes = async (token, dispatch) => {
  try {
    const response = await axios.get("/api/notes", {
      headers: { authorization: token },
    });
    console.log("response is  ", response);
  } catch (error) {
    console.log("error while get user NOtes", error);
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
    }
  } catch (error) {
    console.log("error while add notes", error);
  }
};

export const editNotes = async (note, token, dispatch) => {
  try {
    const response = await axios.post(
      `/api/notes/${id}`,
      { note },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log("response", response);
  } catch (error) {
    console.log("error while edit notes", notes);
  }
};
