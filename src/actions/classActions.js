import { ACTION_TYPES } from '../constants.js'

export function setAllClasses(classes) {
    return {
	type: ACTION_TYPES.SET_ALL_CLASSES,
	payload: classes,
    }
}

export function deleteAllClasses() {
    return {
	type: ACTION_TYPES.DELETE_ALL_CLASSES,
	payload: null,
    }
}
