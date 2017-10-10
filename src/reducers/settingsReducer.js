export default function reducer(state={
    baseURL: "",
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
