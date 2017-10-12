export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
	// Add api call
      name: "Will",
      age: 35,
    }
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
