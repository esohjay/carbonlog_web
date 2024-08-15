import {
  CREATE_SURVEY_FAIL,
  CREATE_SURVEY_REQUEST,
  CREATE_SURVEY_SUCCESS,
  UPDATE_SURVEY_SUCCESS,
} from "../constants/survey";
import { ErrorType } from "../../types/context";

import { useSurveyContext } from "../providers/survey";
import { auth } from "../../lib/firebaseConfig";
import { SurveyType } from "../../types/survey";

export const useSurveyActions = () => {
  const { dispatch } = useSurveyContext();
  const handleError = (error: ErrorType) => {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return message;
  };
  const createSurvey = async (surveyData: SurveyType) => {
    try {
      dispatch({ type: CREATE_SURVEY_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/survey`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(surveyData),
        }
      );
      const data = await response.json();
      // const data = await response;
      dispatch({ type: CREATE_SURVEY_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);

        dispatch({ type: CREATE_SURVEY_FAIL, payload: message });
      }
    }
  };
  const updateSurvey = (surveyData: Partial<SurveyType>) => {
    dispatch({ type: UPDATE_SURVEY_SUCCESS, payload: surveyData });
  };
  return {
    createSurvey,
    updateSurvey,
  };
};
