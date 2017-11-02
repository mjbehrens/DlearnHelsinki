export function setModal(type, props) {
  return {
    type: "SET_MODAL",
      payload: {
	'type': type,
	'props': props, 
      }
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

export function showModal() {
    return {
	type: "SHOW_MODAL",
    }
}
