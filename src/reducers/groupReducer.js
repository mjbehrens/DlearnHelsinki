const groupInitState = {
    groups: [],
}

export default function reducer(state=groupInitState, action) {

    switch (action.type) {
      case "SET_ALL_GROUPS": {
	return {
	  ...state,
	  groups: action.payload,
	}
      }
      case "DELETE_ALL_GROUPS": {
        return groupInitState
      }
      case "ADD_GROUP": {
        return {
          ...state,
          groups: [...state.groups, action.payload],
        }
      }
      case "DELETE_GROUP": {
        return {
          ...state,
          groups: state.groups.filter(group => group.id !== action.payload),
        }
      }
      case "UPDATE_GROUP": {
        const newGroups = [...state.groups]
        const groupToUpdate = newGroups.findIndex(group => group.id === action.payload.id)
        newGroups[groupToUpdate] = action.payload;

        return {
          ...state,
          groups: newGroups,
        }
      }
    }
      
    return state
}
