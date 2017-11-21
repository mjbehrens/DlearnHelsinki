export default function reducer(state={
    classes: [],
  }, action) {

    switch (action.type) {
      case "SET_ALL_CLASSES": {
	return {
	  ...state,
	  classes: action.payload,
	}
      }
      case "DELETE_ALL_CLASSES": {
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
      case "UPDATE_CLASS": {
        const newClasses = [...state.classes]
        const classToUpdate = newClasses.findIndex(classroom => classroom.id === action.payload.id)
        newClasses[classToUpdate] = action.payload;

        return {
          ...state,
          classes: newClasses,
        }
      }
    }

    return state
}

