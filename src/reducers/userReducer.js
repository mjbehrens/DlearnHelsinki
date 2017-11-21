import { ACTION_TYPES } from '../constants.js'

const userInitState = {
      id: null,
      name: null,
      sex: null,
      age: null,
      type: null, /* student, teacher, researcher */
      login: null,
      hash: null,
      loggedin: false,
      groupid: null,
      classid: null,
    } 

export default function reducer(state={
    user: userInitState,
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case ACTION_TYPES.FETCH_USER: {
        return {...state, fetching: true}
      }
      case ACTION_TYPES.FETCH_USER_REJECTED: {
        return {...state, fetching: false, error: action.payload}
      }
      case ACTION_TYPES.FETCH_USER_FULFILLED: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case ACTION_TYPES.LOGIN_USER: {
	return {
	  ...state,
	  user: {...state.user, loggedin: true},
	}
      }
      case ACTION_TYPES.LOGOUT_USER: {
	return {
	  ...state,
          user: userInitState,
	}
      }
      case ACTION_TYPES.SET_USER_ID: {
        return {
          ...state,
          user: {...state.user, id: action.payload},
        }
      }
      case ACTION_TYPES.SET_USER_NAME: {
        return {
          ...state,
          user: {...state.user, name: action.payload},
        }
      }
      case ACTION_TYPES.SET_USER_TYPE: {
        return {
          ...state,
          user: {...state.user, type: action.payload},
        }
      }
      case ACTION_TYPES.SET_USER_LOGIN: {
        return {
          ...state,
          user: {...state.user, login: action.payload},
        }
      }
      case ACTION_TYPES.SET_USER_HASH: {
        return {
          ...state,
          user: {...state.user, hash: action.payload},
        }
      }
      case ACTION_TYPES.SET_USER_CLASS_ID: {
        return {
          ...state,
          user: {...state.user, classid: action.payload},
        }
      }
      case ACTION_TYPES.SET_USER_GROUP_ID: {
        return {
          ...state,
          user: {...state.user, groupid: action.payload},
        }
      }
    }

    return state
}
