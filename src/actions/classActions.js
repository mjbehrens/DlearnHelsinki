export function setClasses(classes) {
    return {
	type: "SET_CLASSES",
	payload: classes,
    }
}

export function deleteClasses() {
    return {
	type: "DELETE_CLASSES",
	payload: null,
    }
}
