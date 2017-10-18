export function fetchGroups() {
  return {
    type: "FETCH_GROUPS",
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
