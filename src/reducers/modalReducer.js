import React from "react";
import $ from 'jquery';

export default function reducer(state={
    name: 'DefaultModal',
  }, action) {

    switch (action.type) {
      case "SET_NAME": {
	return {
	  ...state,
	  name: action.payload,
	}
      }
      // case "SET_TITLE": {
      // 	return {
      // 	  ...state,
      // 	  title: action.payload,
      // 	}
      // }
      // case "SET_BODY": {
      // 	return {
      // 	  ...state,
      // 	  body: action.payload,
      // 	}
      // }
      // case "SET_FOOTER": {
      // 	return {
      // 	  ...state,
      // 	  footer: action.payload,
      // 	}
      // }
      case "SHOW_MODAL": {
	$("#mainModal").modal('show');
      }
    }

    return state
}
