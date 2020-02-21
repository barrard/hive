import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import meta_reucer from './meta_reducer.js'
import user_reucer from './user_reducer.js'
// import usersReducer from "./usersReducer";

export default combineReducers({
  toastr: toastrReducer,
  user:user_reucer,
  meta:meta_reucer

});
