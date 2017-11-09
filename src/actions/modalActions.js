import { MODAL_ACTION_TYPES as types } from '../constants'

export function setModal(type, props) {
  return {
    type: types.SET_MODAL,
    payload: {
      'type': type,
      'props': props,
    }
  }
}

export function showModal() {
  return {
    type: types.SHOW_MODAL,
  }
}

// export function setTitle(title) {
//   return {
//     type: "SET_TITLE",
//     payload: title 
//   }
// }

// export function setBody(body) {
//   return {
//     type: "SET_BODY",
//     payload: body 
//   }
// }

// export function setFooter(footer) {
//   return {
//     type: "SET_FOOTER",
//     payload: footer 
//   }
// }
