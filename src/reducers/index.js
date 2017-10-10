import { combineReducers } from "redux"

import settings from "./settingsReducer"
import user from "./userReducer"
import classroom from "./classReducer"

export default combineReducers({
  settings,
  user,
  classroom,
})
