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
      const updatedState = { ...state };
      const payload = action.payload;

      for (const key in payload) {
        updatedState.selectedStaff[key] = action.payload[key];
      }
      return updatedState;
    default:
      return state;
  }
};

export default staffReducer;
