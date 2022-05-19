import React from "react";
import { useNotes } from "../../context";
import "./filtertsmodal.css";
const FiltertsModal = () => {
  const {
    filter: { filterByDate, filterByPriority, filterNoteCategory },
    filterDispatch,
  } = useNotes();

  return (
    <div className="filterts-modal">
      <div className="date-by">
        <p>Date By</p>
        <label>
          <input
            type="radio"
            name="sort-data"
            value={"latest"}
            checked={filterByDate === "latest"}
            onChange={(e) => {
              filterDispatch({
                type: "FILTER_BY_DATE",
                payload: e.target.value,
              });
            }}
          />
          Latest first
        </label>
        <label>
          <input
            type="radio"
            name="sort-data"
            value="oldest"
            checked={filterByDate === "oldest"}
            onChange={(e) => {
              filterDispatch({
                type: "FILTER_BY_DATE",
                payload: e.target.value,
              });
            }}
          />
          Oldest first
        </label>
      </div>
      <hr />
      <div className="date-by">
        <p>Priority</p>
        <label>
          <input
            type="radio"
            name="sort-priority"
            value={"lowToHigh"}
            checked={filterByPriority === "lowToHigh"}
            onChange={(e) => {
              filterDispatch({
                type: "FILTER_BY_PRIORITY",
                payload: e.target.value,
              });
            }}
          />
          Low to High
        </label>
        <label>
          <input
            type="radio"
            name="sort-priority"
            value="highToLow"
            checked={filterByPriority === "highToLow"}
            onChange={(e) => {
              filterDispatch({
                type: "FILTER_BY_PRIORITY",
                payload: e.target.value,
              });
            }}
          />
          High to Low
        </label>
      </div>
      <hr />
      <div className="date-by">
        <p>Filter Priority Note</p>
        <label>
          <input
            type="checkbox"
            name="priority"
            value="low"
            checked={filterNoteCategory.includes("low")}
            onChange={(e) => {
              filterDispatch({
                type: "FILTER_BY_NOTE_CATEGORY",
                payload: e.target.value,
              });
            }}
          />
          Low
        </label>
        <label>
          <input
            type="checkbox"
            name="priority"
            value="medium"
            checked={filterNoteCategory.includes("medium")}
            onChange={(e) => {
              filterDispatch({
                type: "FILTER_BY_NOTE_CATEGORY",
                payload: e.target.value,
              });
            }}
          />
          Medium
        </label>
        <label>
          <input
            type="checkbox"
            name="priority"
            value="high"
            checked={filterNoteCategory.includes("high")}
            onChange={(e) => {
              filterDispatch({
                type: "FILTER_BY_NOTE_CATEGORY",
                payload: e.target.value,
              });
            }}
          />
          High
        </label>
      </div>
      <hr />
      <div className="clear-filter">
        <button
          onClick={() => {
            filterDispatch({
              type: "CLEAR_FILTERS",
            });
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FiltertsModal;
