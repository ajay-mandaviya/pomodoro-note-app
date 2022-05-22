export const filterReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_BY_DATE":
      return {
        ...state,
        filterByDate: action.payload,
      };

    case "FILTER_BY_PRIORITY":
      return {
        ...state,
        filterByPriority: action.payload,
      };

    case "FILTER_BY_NOTE_CATEGORY":
      return {
        ...state,
        filterNoteCategory: state.filterNoteCategory.includes(action.payload)
          ? state.filterNoteCategory.filter(
              (noteCate) => noteCate !== action.payload
            )
          : state.filterNoteCategory.concat(action.payload),
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filterByDate: "",
        filterByPriority: "",
        filterNoteCategory: [],
      };

    default:
      return state;
  }
};
