export default function reducer(state={
    baseURL: "http://dlearn-helsinki-backend.herokuapp.com/webapi/",
  }, action) {
    
    switch (action.type) {
      case "SET_BASE_URL": {
        return {
	  ...state,
	  baseURL: action.payload,
	}
      }
    }

    return state
}
