import * as actions from '../../src/actions/classActions'
import { CLASS_ACTION_TYPES as types } from '../../src/constants'

describe('actions', () => {
	it('should create an action to set classes', () => {
		const classes = [1, 2, 3]
		const expectedAction = {
			type: types.SET_CLASSES,
			payload: classes
		}
		expect(actions.setClasses(classes)).toEqual(expectedAction)
	}),
	it('should create an action to delete classes', () => {
		const expectedAction = {
			type: types.DELETE_CLASSES,
		}
		expect(actions.deleteClasses()).toEqual(expectedAction)
	})
})