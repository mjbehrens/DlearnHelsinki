import { GROUP_ACTION_TYPES as types } from '../constants'

export function fetchGroups() {
  return {
    type: types.FETCH_GROUPS,
    payload: {
	// Add api call
		groups:
		[{
			groupid: 12,
			groupname: "some group name",
	    }]
    }
  }
}
