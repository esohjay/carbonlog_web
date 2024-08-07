// actionTypes.ts
export const CREATE_SURVEY_REQUEST = "CREATE_SURVEY_REQUEST";
export const CREATE_SURVEY_SUCCESS = "CREATE_SURVEY_SUCCESS";
export const CREATE_SURVEY_FAIL = "CREATE_SURVEY_FAIL";
export const CREATE_SURVEY_RESET = "CREATE_SURVEY_RESET";
export const UPDATE_SURVEY_REQUEST = "UPDATE_SURVEY_REQUEST";
export const UPDATE_SURVEY_SUCCESS = "UPDATE_SURVEY_SUCCESS";
export const UPDATE_SURVEY_FAIL = "UPDATE_SURVEY_FAIL";
export const UPDATE_SURVEY_RESET = "UPDATE_SURVEY_RESET";
export const RESET_FORM = "RESET_FORM";
export const GET_SURVEY_REQUEST = "GET_SURVEY_REQUEST";
export const GET_SURVEY_SUCCESS = "GET_SURVEY_SUCCESS";
export const GET_SURVEY_FAIL = "GET_SURVEY_FAIL";
export const GET_SURVEY_RESET = "GET_SURVEY_RESET";

export type SurveyActionType =
  | typeof CREATE_SURVEY_REQUEST
  | typeof CREATE_SURVEY_SUCCESS
  | typeof CREATE_SURVEY_FAIL
  | typeof CREATE_SURVEY_RESET
  | typeof UPDATE_SURVEY_REQUEST
  | typeof UPDATE_SURVEY_SUCCESS
  | typeof UPDATE_SURVEY_FAIL
  | typeof UPDATE_SURVEY_RESET
  | typeof RESET_FORM
  | typeof GET_SURVEY_REQUEST
  | typeof GET_SURVEY_SUCCESS
  | typeof GET_SURVEY_FAIL
  | typeof GET_SURVEY_RESET;
