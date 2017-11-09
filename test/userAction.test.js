import * as actions from '../src/actions/userActions'
import { ACTION_TYPES as types } from '../src/constants'

describe('actions', () => {
	it('should create an action for login', () => {
		const expectedAction = {
			type: types.LOGIN_USER,
			payload: null
		}
		expect(actions.loginUser()).toEqual(expectedAction)
	}),
	it('should create an action for logout', () => {
		const expectedAction = {
			type: types.LOGOUT_USER,
			payload: null
		}
		expect(actions.logoutUser()).toEqual(expectedAction)
	}),
	it('should create an action to set an id for an user', () => {
		const id = 123
		const expectedAction = {
			type: types.SET_USER_ID,
			payload: id
		}
		expect(actions.setUserId(id)).toEqual(expectedAction)
	}),
	it('should create an action to set a name for an user', () => {
		const name = 'Billy'
		const expectedAction = {
			type: types.SET_USER_NAME,
			payload: name
		}
		expect(actions.setUserName(name)).toEqual(expectedAction)
	})		
})
