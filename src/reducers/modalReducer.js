import React from "react";
import $ from 'jquery';

export default function reducer(state={
    title: 'My Modal Title',
    body: 'Modal body',
    footer: 'Modal footer',
  }, action) {

    switch (action.type) {
      case "SET_TITLE": {
	return {
	  ...state,
	  title: action.payload,
	}
      }
      case "SET_BODY": {
	return {
	  ...state,
	  body: action.payload,
	}
      }
      case "SET_FOOTER": {
	return {
	  ...state,
	  footer: action.payload,
	}
      }
      case "SHOW_MODAL": {
	$("#mainModal").modal('show');
      }
    }

    return state
}
