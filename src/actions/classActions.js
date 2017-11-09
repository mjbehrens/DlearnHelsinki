import { CLASS_ACTION_TYPES as types } from '../constants'

export function setClasses(classes) {
    return {
		type: types.SET_CLASSES,
		payload: classes,
    }
}

export function deleteClasses() {
    return {
		type: types.DELETE_CLASSES,
    }
}
