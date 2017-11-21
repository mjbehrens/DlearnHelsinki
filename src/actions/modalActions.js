import { ACTION_TYPES } from '../constants.js'

export function setModal(type, props) {
  return {
    type: ACTION_TYPES.SET_MODAL,
    payload: {
	type: type,
	props: props, 
    }
  }
}

export function showModal() {
    return {
	type: ACTION_TYPES.SHOW_MODAL,
    }
}
