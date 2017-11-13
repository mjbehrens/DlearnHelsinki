import * as actions from '../../src/actions/groupActions'
import { GROUP_ACTION_TYPES as types } from '../../src/constants'

describe('actions', () => {
	it('should', () => {
		const payload = {
			groups: [{
				groupid: 12,
				groupname: "some group name",
			}]
		}
		const expectedActions = {
			type: types.FETCH_GROUPS,
			payload: payload
		}
		expect(actions.fetchGroups()).toEqual(expectedActions)	
	})
})