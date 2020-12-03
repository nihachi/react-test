import { combineReducers } from "redux";
import locations from "./locations";
import actions from "./actions";

const rootReducer = combineReducers({
  locations: locations,
  actions: actions,
});

export default rootReducer;
