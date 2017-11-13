import * as actions from '../../src/actions/studentActions'
import { STUDENT_ACTION_TYPES as types } from '../../src/constants'

describe('actions', () => {
	it('should create an action to add a student', () => {
		const student = 'student'
		const expectedAction = {
			type: types.ADD_STUDENT,
			payload: student
		}
		expect(actions.addStudent(student)).toEqual(expectedAction)
	})
})