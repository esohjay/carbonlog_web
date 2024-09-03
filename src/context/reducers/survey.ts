import {
  CREATE_SURVEY_FAIL,
  CREATE_SURVEY_REQUEST,
  CREATE_SURVEY_RESET,
  CREATE_SURVEY_SUCCESS,
  // GET_SURVEY_FAIL,
  GET_SURVEY_REQUEST,
  GET_SURVEY_SUCCESS,
  UPDATE_SURVEY_FAIL,
  // UPDATE_SURVEY_REQUEST,
  UPDATE_SURVEY_SUCCESS,
  SET_CAR_DETAILS,
  SET_BIKE_DETAILS,
} from "../constants/survey";
import { SurveyAction, SurveyState } from "../../types/survey";

export const SurveyReducer = (state: SurveyState, action: SurveyAction) => {
  switch (action.type) {
    case CREATE_SURVEY_REQUEST:
      return { ...state, loading: true };
    case CREATE_SURVEY_SUCCESS:
      return {
        ...state,
        loading: false,
        surveySaved: true,
        footprint: action.payload,
      };
    case CREATE_SURVEY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_SURVEY_RESET:
      return { ...state, surveySaved: false };
    // case UPDATE_SURVEY_REQUEST:
    //   return { ...state, loading: true };
    case UPDATE_SURVEY_SUCCESS:
      return {
        ...state,
        surveyUpdated: true,
        // loading: false,
        survey: {
          ...state.survey,
          survey: { ...state.survey.survey, ...action.payload },
        },
      };
    case UPDATE_SURVEY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_SURVEY_REQUEST:
      return { ...state, fetchingSurvey: true };
    case GET_SURVEY_SUCCESS:
      return {
        ...state,
        fetchingSurvey: false,
        survey: action.payload,
      };
    case SET_CAR_DETAILS:
      return {
        ...state,
        carDetails: action.payload,
      };
    case SET_BIKE_DETAILS:
      return {
        ...state,
        bikeDetails: action.payload,
      };

    default:
      return state;
  }
};
