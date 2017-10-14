export default function reducer(state={
    user: {
      id: null,
      name: null,
      sex: null,
      age: null,
      type: null, /* student, teacher, researcher */
      login: null,
      hash: null,
      groupid: [],
      classid: [],
    },
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "SET_USER_ID": {
        return {
          ...state,
          user: {...state.user, id: action.payload},
        }
      }
      case "SET_USER_NAME": {
        return {
          ...state,
          user: {...state.user, name: action.payload},
        }
      }
      case "SET_USER_TYPE": {
        return {
          ...state,
          user: {...state.user, type: action.payload},
        }
      }
      case "SET_USER_LOGIN": {
        return {
          ...state,
          user: {...state.user, login: action.payload},
        }
      }
      case "SET_USER_HASH": {
        return {
          ...state,
          user: {...state.user, hash: action.payload},
        }
      }
    }

    return state
}
