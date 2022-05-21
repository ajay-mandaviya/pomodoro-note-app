import React from "react";
import toast from "react-hot-toast";
import { useAuth, useNotes } from "../../context";
import { editNotes } from "../../services/notes";
import "./priorityfield.css";
const PriorityField = ({ note, priorityRef }) => {
  const {
    initalInput,
    setInitialInput,
    isNoteEditing,
    dispatchNote,
    setIsNoteEditing,
  } = useNotes();
  const {
    authUser: { token },
  } = useAuth();
  const handlePriority = (value) => {
    if (isNoteEditing) {
      setInitialInput({
        ...initalInput,
        priority: value,
      });
    } else {
      const newNotes = {
        ...note,
        priority: value,
        createdTime: new Date().toLocaleString(),
      };
      editNotes(token, newNotes, dispatchNote, (status) => {
        if (status === 201 || 200) {
          setIsNoteEditing(false);
          toast.success("Priority update successfully");
        }
      });
    }
  };
  return (
    <div className="priorityfield" ref={priorityRef}>
      <label>
        <input
          type={"radio"}
          name="priority"
          value={"1"}
          onChange={(e) => handlePriority({ low: e.target.value })}
        ></input>
        Low
      </label>
      <label>
        <input
          type={"radio"}
          name="priority"
          value={"2"}
          onChange={(e) => handlePriority({ medium: e.target.value })}
        ></input>
        Medium
      </label>
      <label>
        <input
          type={"radio"}
          name="priority"
          value={"3"}
          onChange={(e) => handlePriority({ high: e.target.value })}
        ></input>
        High
      </label>
    </div>
  );
};

export default PriorityField;
