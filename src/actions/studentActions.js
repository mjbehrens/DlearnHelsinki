import { ACTION_TYPES } from '../constants.js'

export function addStudent(student) {
  return {
    type: ACTION_TYPES.ADD_STUDENT,
    payload: student
  }
}
