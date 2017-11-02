import React from "react";
import $ from 'jquery';

export default function reducer(state={
    modalType: 'DefaultModal',
    modalProps: {},
  }, action) {

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
