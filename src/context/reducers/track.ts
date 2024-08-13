import {
  ADD_ACTIVITY_FAIL,
  ADD_ACTIVITY_REQUEST,
  ADD_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAIL,
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  RESET_ACTIVITY,
  DELETE_ACTIVITY_FAIL,
  DELETE_ACTIVITY_REQUEST,
  DELETE_ACTIVITY_RESET,
  DELETE_ACTIVITY_SUCCESS,
} from "../constants/track";
import { TrackAction, TrackState } from "../../types/track";

export const TrackReducer = (state: TrackState, action: TrackAction) => {
  switch (action.type) {
    case ADD_ACTIVITY_REQUEST:
      return { ...state, addingActivity: true };
    case ADD_ACTIVITY_SUCCESS:
      return {
        ...state,
        addingActivity: false,
        activityAdded: true,
        activity: action.payload,
      };
    case ADD_ACTIVITY_FAIL:
      return { ...state, addingActivity: false, activityError: action.payload };
    case DELETE_ACTIVITY_REQUEST:
      return { ...state, deletingActivity: true };
    case DELETE_ACTIVITY_SUCCESS:
      return {
        ...state,
        deletingActivity: false,
        activityDeleted: true,
      };
    case DELETE_ACTIVITY_FAIL:
      return {
        ...state,
        deletingActivity: false,
        activityError: action.payload,
      };
    case DELETE_ACTIVITY_RESET:
      return { ...state, deletingActivity: false, activityDeleted: false };
    case GET_ACTIVITY_REQUEST:
      return { ...state, fetchingActivity: true };
    case GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        fetchingActivity: false,
        activityFetched: true,
        activityList: action.payload,
      };
    case GET_ACTIVITY_FAIL:
      return {
        ...state,
        fetchingActivity: false,
        activityError: action.payload,
      };
    case RESET_ACTIVITY:
      return {
        ...state,
        activityAdded: false,
        activity: null,
        activityError: null,
        addingActivity: false,
      };
    default:
      return state;
  }
};
