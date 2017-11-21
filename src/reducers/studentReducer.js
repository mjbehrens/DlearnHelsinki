const studentInitState = {
    students: [],
}

export default function reducer(state=studentInitState, action) {

    switch (action.type) {
      case "SET_ALL_STUDENTS": {
	return {
	  ...state,
	  students: action.payload,
	}
      }
      case "DELETE_ALL_STUDENTS": {
        return studentInitState
      }
      case "ADD_STUDENT": {
        return {
          ...state,
          students: [...state.students, action.payload],
        }
      }
      case "DELETE_STUDENT": {
        return {
          ...state,
          students: state.students.filter(student => student.id !== action.payload),
        }
      }
      case "UPDATE_STUDENT": {
        const newStudents = [...state.students]
        const studentToUpdate = newStudents.findIndex(student => student.id === action.payload.id)
        newStudents[studentToUpdate] = action.payload;

        return {
          ...state,
          students: newStudents,
        }
      }
    }
      
    return state
}
