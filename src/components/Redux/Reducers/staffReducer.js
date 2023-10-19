const initialState = {
  selectedStaff: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  },
};

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_STAFF":
      const schedule = action.payload;
      return {
        ...state,
        selectedStaff: {
          ...state.selectedStaff,
          [schedule.day]: [
            ...(state.selectedStaff[schedule.day] || []),
            { [schedule.newValue]: schedule.index },
          ],
        },
      };
    default:
      return state;
  }
};

export default staffReducer;
