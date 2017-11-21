import { ACTION_TYPES } from '../constants.js'

export function fetchGroups() {
  return {
    type: ACTION_TYPES.FETCH_GROUPS,
    payload: {
	// Add api call
	groups:
	[
	    {
		groupid: 12,
		groupname: "some group name",
	    }
	]
	
    }
  }
}
