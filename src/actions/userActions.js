export function loginUser() {
    return {
	type: 'LOGIN_USER',
	payload: null
    }
}

export function logoutUser() {
    return {
	type: 'LOGOUT_USER',
	payload: null
    }
}

export function setUserId(id) {
  return {
    type: 'SET_USER_ID',
    payload: id,
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function setUserType(type) {
  return {
    type: 'SET_USER_TYPE',
    payload: type,
  }
}

export function setUserLogin(login) {
  return {
    type: 'SET_USER_LOGIN',
    payload: login,
  }
}

export function setUserHash(hash) {
  return {
    type: 'SET_USER_HASH',
    payload: hash,
  }
}

export function setUserClassId(classid) {
  return {
    type: 'SET_USER_CLASS_ID',
    payload: classid,
  }
}

export function setUserGroupId(groupid) {
  return {
    type: 'SET_USER_GROUP_ID',
    payload: groupid,
  }
}
