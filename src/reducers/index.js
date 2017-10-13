import { combineReducers } from "redux"

import settings from "./settingsReducer"
import user from "./userReducer"
import classroom from "./classReducer"
import group from "./groupReducer"
import student from "./studentReducer"

export default combineReducers({
  settings,
  user,
  classroom,
  group,
  student,
})
