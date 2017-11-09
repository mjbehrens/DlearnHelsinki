import { STUDENT_ACTION_TYPES as types } from '../constants'

export function addStudent(student) {
  return {
    type: types.ADD_STUDENT,
    payload: student
  }
}
