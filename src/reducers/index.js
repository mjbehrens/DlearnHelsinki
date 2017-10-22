import { combineReducers } from "redux"

import classroom from "./classReducer"
import group from "./groupReducer"
import modal from "./modalReducer"
import student from "./studentReducer"
import user from "./userReducer"

export default combineReducers({
  classroom,
  group,
  modal,
  student,
  user,
})
