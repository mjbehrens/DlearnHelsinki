import { combineReducers } from "redux"

import user from "./userReducer"
import classroom from "./classReducer"
import group from "./groupReducer"
import student from "./studentReducer"

export default combineReducers({
  user,
  classroom,
  group,
  student,
})
