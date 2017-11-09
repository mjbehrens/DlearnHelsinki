import * as actions from '../src/actions/userActions'
import { USER_ACTION_TYPES as types } from '../src/constants'

describe('actions', () => {
	it('should create an action for login', () => {
		const expectedAction = {
			type: types.LOGIN_USER,
		}
		expect(actions.loginUser()).toEqual(expectedAction)
	}),
	it('should create an action for logout', () => {
		const expectedAction = {
			type: types.LOGOUT_USER,
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
	}),
	it('should create an action to set a type for an user', () => {
		const type = 'student'
		const expectedAction = {
			type: types.SET_USER_TYPE,
			payload: type
		}
		expect(actions.setUserType(type)).toEqual(expectedAction)
	}),
	it('should create an action to set a login for an user', () => {
		const login = true
		const expectedAction = {
			type: types.SET_USER_LOGIN,
			payload: login
		}
		expect(actions.setUserLogin(login)).toEqual(expectedAction)
	}),
	it('should create an action to set a hash for an user', () => {
		const hash = 'iddqd'
		const expectedAction = {
			type: types.SET_USER_HASH,
			payload: hash
		}
		expect(actions.setUserHash(hash)).toEqual(expectedAction)
	}),
	//
	it('should create an action to set a class id for an user', () => {
		const classid = 1
		const expectedAction = {
			type: types.SET_USER_CLASS_ID,
			payload: classid
		}
		expect(actions.setUserClassId(classid)).toEqual(expectedAction)
	}),
	it('should create an action to set a group id for an user', () => {
		const groupid = 'iddqd'
		const expectedAction = {
			type: types.SET_USER_GROUP_ID,
			payload: groupid
		}
		expect(actions.setUserGroupId(groupid)).toEqual(expectedAction)
	})
})
