
const surveyInitState = {
    surveys: [],
}

export default function reducer(state=surveyInitState, action) {

    switch (action.type) {
      case "SET_ALL_SURVEYS": {
	return {
	  ...state,
	  surveys: action.payload,
	}
      }
      case "DELETE_ALL_SURVEYS": {
        return surveyInitState
      }
      case "ADD_SURVEY": {
        return {
          ...state,
          surveys: [...state.surveys, action.payload],
        }
      }
      case "DELETE_SURVEY": {
        return {
          ...state,
          surveys: state.surveys.filter(survey => survey.id !== action.payload),
        }
      }
      case "UPDATE_SURVEY": {
        const newSurveys = [...state.surveys]
        const surveyToUpdate = newSurveys.findIndex(survey => survey.id === action.payload.id)
        newSurveys[surveyToUpdate] = action.payload;

        return {
          ...state,
	  surveys: newSurveys,
        }
      }
    }

    return state
}
