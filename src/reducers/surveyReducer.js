import { ACTION_TYPES } from '../constants.js'

const surveyInitState = {
    surveys: [],
}

export default function reducer(state=surveyInitState, action) {

    switch (action.type) {
      case ACTION_TYPES.SET_ALL_SURVEYS: {
	return {
	  ...state,
	  surveys: action.payload,
	}
      }
      case ACTION_TYPES.DELETE_ALL_SURVEYS: {
        return surveyInitState
      }
      case ACTION_TYPES.ADD_SURVEY: {
        return {
          ...state,
          surveys: [...state.surveys, action.payload],
        }
      }
      case ACTION_TYPES.DELETE_SURVEY: {
        return {
          ...state,
          surveys: state.surveys.filter(survey => survey.id !== action.payload),
        }
      }
      case ACTION_TYPES.UPDATE_SURVEY: {
        const newSurveys = [...state.surveys]
        const surveyToUpdate = newSurveys.findIndex(survey => survey.id === action.payload.id)
        newSurveys[surveyToUpdate] = action.payload;

        return {
          ...state,
	  surveys: newSurveys,
        }
      }
	default:
	    break;
    }

    return state
}
