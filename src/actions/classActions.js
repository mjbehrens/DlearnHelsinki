export function fetchClasses() {
  return {
    type: "FETCH_CLASSES",
    payload: {
	// Add api call
	classes:
	[
	    {
		classid: 11,
		classname: "some name",
	    }
	]
	
    }
  }
}
