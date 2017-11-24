import { ACTION_TYPES } from '../constants.js'

const classInitState = {
    classes: [],
}

export default function reducer(state=classInitState, action) {

    switch (action.type) {
      case ACTION_TYPES.SET_ALL_CLASSES: {
	return {
	  ...state,
	  classes: action.payload,
	}
      }
      case ACTION_TYPES.DELETE_ALL_CLASSES: {
        return classInitState
      }
      case ACTION_TYPES.ADD_CLASS: {
        return {
          ...state,
          classes: [...state.classes, action.payload],
        }
      }
      case ACTION_TYPES.DELETE_CLASS: {
        return {
          ...state,
          classes: state.classes.filter(classroom => classroom.id !== action.payload),
        }
      }
      case ACTION_TYPES.UPDATE_CLASS: {
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

