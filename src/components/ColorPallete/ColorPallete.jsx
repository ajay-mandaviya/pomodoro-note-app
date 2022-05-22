import React from "react";
import { optionColor } from "../../constant/actionTypes";
import { useArchive, useAuth, useNotes } from "../../context";
import { editNotes } from "../../services/notes";
import "./colorPallete.css";
import toast from "react-hot-toast";
import { isArrayExits } from "../../utils/arrayMethod";
const ColorPallete = ({ note, colordRef, setInitialInput }) => {
  const { editArchive } = useArchive();
  const {
    authUser: { token },
  } = useAuth();
  const {
    initalInput,
    isNoteEditing,
    dispatchNote,
    setIsNoteEditing,
    noteState: { archives },
  } = useNotes();
  const isInArchive = isArrayExits(archives, note?._id);
  const handleNoteChangebg = (color) => {
    if (isNoteEditing) {
      setInitialInput({
        ...initalInput,
        bgColor: color,
      });
    } else {
      if (isInArchive) {
        const newNotes = {
          ...note,
          bgColor: color,
          createdTime: new Date().toLocaleString(),
        };
        editArchive(newNotes, (status) => {
          if (status === 201 || 200) {
            setIsNoteEditing(false);
          }
        });
      } else {
        const newNotes = {
          ...note,
          bgColor: color,
          createdTime: new Date().toLocaleString(),
        };
        editNotes(token, newNotes, dispatchNote, (status) => {
          if (status === 201 || 200) {
            setIsNoteEditing(false);
            toast.success("Color update successfully");
          }
        });
      }
    }
  };
  return (
    <div className="colorpallete" ref={colordRef}>
      {optionColor.map((color) => {
        return (
          <button
            className="color-btn"
            key={color.id}
            style={{
              backgroundColor: color.color,
              border:
                initalInput.bgColor === color.color
                  ? "2px solid"
                  : "1px solid ",
            }}
            onClick={() => handleNoteChangebg(color.color)}
          ></button>
        );
      })}
    </div>
  );
};

export default ColorPallete;
