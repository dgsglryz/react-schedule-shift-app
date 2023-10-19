import { createStore, combineReducers } from "redux";
import staffReducer from "./Reducers/staffReducer";

const rootReducer = combineReducers({
  staff: staffReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
