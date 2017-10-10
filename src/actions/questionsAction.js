export function fetchQuestions() {
  return {
    type: "FETCH_QUESTIONS_FULFILLED",
    payload: {
    }
  }
}

export function addQuestion(question) {
  return {
    type: "ADD_QUESTION",
    payload: question,
    }
  }
}

export function setCurrentQuestion(question) {
  return {
    type: 'SET_CURRENT_QUESTION',
    payload: question,
  }
}
