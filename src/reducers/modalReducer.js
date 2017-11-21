import React from "react";
import $ from 'jquery';

const modalInitState = {
    modalType: 'DefaultModal',
    modalProps: {},
}

export default function reducer(state=modalInitState, action) {

    switch (action.type) {
      case "SET_MODAL": {
	return {
	  ...state,
	  modalType: action.payload.type,
          modalProps: action.payload.props,
	}
      }
      case "SHOW_MODAL": {
	$("#mainModal").modal('show');
      }
      case "HIDE_MODAL": {
	$("#mainModal").modal('hide');
      }
    }

    return state
}
