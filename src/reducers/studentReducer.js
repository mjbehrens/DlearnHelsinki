import { ACTION_TYPES } from '../constants.js'

const studentInitState = {
    students: [],
}

export default function reducer(state=studentInitState, action) {

    switch (action.type) {
      case ACTION_TYPES.SET_ALL_STUDENTS: {
	return {
	  ...state,
	  students: action.payload,
	}
      }
      case ACTION_TYPES.DELETE_ALL_STUDENTS: {
        return studentInitState
      }
      case ACTION_TYPES.ADD_STUDENT: {
        return {
          ...state,
          students: [...state.students, action.payload],
        }
      }
      case ACTION_TYPES.DELETE_STUDENT: {
        return {
          ...state,
          students: state.students.filter(student => student.id !== action.payload),
        }
      }
      case ACTION_TYPES.UPDATE_STUDENT: {
        const newStudents = [...state.students]
        const studentToUpdate = newStudents.findIndex(student => student.id === action.payload.id)
        newStudents[studentToUpdate] = action.payload;

        return {
          ...state,
          students: newStudents,
        }
      }
	default:
	    break;
    }
      
    return state
}
