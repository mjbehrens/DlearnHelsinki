export default function reducer(state={
    classes: [],
  }, action) {

    switch (action.type) {
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

