import $ from 'jquery';
import { ACTION_TYPES } from '../constants.js'

const modalInitState = {
    modalType: 'DefaultModal',
    modalProps: {},
}

export default function reducer(state=modalInitState, action) {

    switch (action.type) {
      case ACTION_TYPES.SET_MODAL: {
	return {
	  ...state,
	  modalType: action.payload.type,
          modalProps: action.payload.props,
	}
      }
      case ACTION_TYPES.SHOW_MODAL: {
	$("#mainModal").modal('show');
      }
      case ACTION_TYPES.HIDE_MODAL: {
	$("#mainModal").modal('hide');
      }
    }

    return state
}
