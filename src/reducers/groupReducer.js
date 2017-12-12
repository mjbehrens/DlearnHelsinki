import { ACTION_TYPES } from '../constants.js'

const groupInitState = {
    groups: [],
}

export default function reducer(state=groupInitState, action) {

    switch (action.type) {
      case ACTION_TYPES.SET_ALL_GROUPS: {
	return {
	  ...state,
	  groups: action.payload,
	}
      }
      case ACTION_TYPES.DELETE_ALL_GROUPS: {
        return groupInitState
      }
      case ACTION_TYPES.ADD_GROUP: {
        return {
          ...state,
          groups: [...state.groups, action.payload],
        }
      }
      case ACTION_TYPES.DELETE_GROUP: {
        return {
          ...state,
          groups: state.groups.filter(group => group.id !== action.payload),
        }
      }
      case ACTION_TYPES.UPDATE_GROUP: {
        const newGroups = [...state.groups]
        const groupToUpdate = newGroups.findIndex(group => group.id === action.payload.id)
        newGroups[groupToUpdate] = action.payload;

        return {
          ...state,
          groups: newGroups,
        }
      }
	default:
	    break;
    }
      
    return state
}
