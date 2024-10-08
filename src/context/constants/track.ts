// activityActionTypes.ts
export const ADD_ACTIVITY_REQUEST = "ADD_ACTIVITY_REQUEST";
export const ADD_ACTIVITY_SUCCESS = "ADD_ACTIVITY_SUCCESS";
export const ADD_ACTIVITY_FAIL = "ADD_ACTIVITY_FAIL";
export const ADD_ACTIVITY_RESET = "ADD_ACTIVITY_RESET";

export const DELETE_ACTIVITY_REQUEST = "DELETE_ACTIVITY_REQUEST";
export const DELETE_ACTIVITY_SUCCESS = "DELETE_ACTIVITY_SUCCESS";
export const DELETE_ACTIVITY_FAIL = "DELETE_ACTIVITY_FAIL";
export const DELETE_ACTIVITY_RESET = "DELETE_ACTIVITY_RESET";

export const RESET_ACTIVITY = "RESET_ACTIVITY";

export const GET_ACTIVITY_REQUEST = "GET_ACTIVITY_REQUEST";
export const GET_ACTIVITY_SUCCESS = "GET_ACTIVITY_SUCCESS";
export const GET_ACTIVITY_FAIL = "GET_ACTIVITY_FAIL";
export const SET_ACTIVITY_TOBEDELETED = "SET_ACTIVITY_TOBEDELETED";

export type TrackActionTypes =
  | typeof ADD_ACTIVITY_REQUEST
  | typeof ADD_ACTIVITY_SUCCESS
  | typeof ADD_ACTIVITY_FAIL
  | typeof ADD_ACTIVITY_RESET
  | typeof DELETE_ACTIVITY_REQUEST
  | typeof DELETE_ACTIVITY_SUCCESS
  | typeof DELETE_ACTIVITY_FAIL
  | typeof DELETE_ACTIVITY_RESET
  | typeof RESET_ACTIVITY
  | typeof GET_ACTIVITY_REQUEST
  | typeof GET_ACTIVITY_SUCCESS
  | typeof GET_ACTIVITY_FAIL
  | typeof SET_ACTIVITY_TOBEDELETED;
