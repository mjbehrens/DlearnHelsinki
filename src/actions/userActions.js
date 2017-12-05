import { ACTION_TYPES } from '../constants.js'

export function loginUser() {
    return {
	type: ACTION_TYPES.LOGIN_USER,
	payload: null
    }
}

export function logoutUser() {
    return {
	type: ACTION_TYPES.LOGOUT_USER,
	payload: null
    }
}

export function setUserId(id) {
  return {
    type: ACTION_TYPES.SET_USER_ID,
    payload: id,
  }
}

export function setUserName(name) {
  return {
    type: ACTION_TYPES.SET_USER_NAME,
    payload: name,
  }
}

export function setUserType(type) {
  return {
    type: ACTION_TYPES.SET_USER_TYPE,
    payload: type,
  }
}

export function setUserLogin(login) {
  return {
    type: ACTION_TYPES.SET_USER_LOGIN,
    payload: login,
  }
}

export function setUserHash(hash) {
  return {
    type: ACTION_TYPES.SET_USER_HASH,
    payload: hash,
  }
}

export function setUserClassId(classid) {
  return {
    type: ACTION_TYPES.SET_USER_CLASS_ID,
    payload: classid,
  }
}

export function setUserGroupId(groupid) {
  return {
    type: ACTION_TYPES.SET_USER_GROUP_ID,
    payload: groupid,
  }
}
