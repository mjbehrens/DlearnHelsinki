export default function reducer(state={
    classes: [],
  }, action) {

    switch (action.type) {
      case "SET_CLASSES": {
	return {
	  ...state,
	  classes: action.payload,
	}
      }
      case "DELETE_CLASSES": {
        return {
          ...state,
          classes: [],
        }
      }
      case "ADD_CLASS": {
        return {
          ...state,
          classes: [...state.classes, action.payload],
        }
      }
      case "DELETE_CLASS": {
        return {
          ...state,
          classes: state.classes.filter(classroom => classroom.id !== action.payload),
        }
      }
    }

    return state
}

