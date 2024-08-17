import {
  ADD_ACTION_FAIL,
  ADD_ACTION_REQUEST,
  ADD_ACTION_SUCCESS,
  GET_ALL_ACTION_FAIL,
  GET_ALL_ACTION_REQUEST,
  GET_ALL_ACTION_SUCCESS,
  GET_LOGGED_ACTION_FAIL,
  GET_LOGGED_ACTION_REQUEST,
  GET_LOGGED_ACTION_SUCCESS,
  GET_MY_ACTION_REQUEST,
  GET_MY_ACTION_SUCCESS,
  GET_MY_ACTION_FAIL,
  RESET_ACTION_LOGGING,
} from "../constants/action";
import { ActionState, ActionsAction } from "../../types/action";

export const ActionReducer = (state: ActionState, action: ActionsAction) => {
  switch (action.type) {
    case ADD_ACTION_REQUEST:
      return { ...state, addingAction: true };
    case ADD_ACTION_SUCCESS:
      return {
        ...state,
        addingAction: false,
        actionAdded: true,
        action: action.payload,
      };
    case ADD_ACTION_FAIL:
      return { ...state, addingAction: false, actionError: action.payload };
    case GET_ALL_ACTION_REQUEST:
      return { ...state, fetchingAction: true };
    case GET_ALL_ACTION_SUCCESS:
      return {
        ...state,
        fetchingAction: false,
        actionFetched: true,
        actionList: action.payload,
      };
    case GET_ALL_ACTION_FAIL:
      return {
        ...state,
        fetchingAction: false,
        actionError: action.payload,
      };
    case GET_MY_ACTION_REQUEST:
      return { ...state, fetchingAction: true };
    case GET_MY_ACTION_SUCCESS:
      return {
        ...state,
        fetchingAction: false,
        myActionsFetched: true,
        myActions: action.payload,
      };
    case GET_MY_ACTION_FAIL:
      return {
        ...state,
        fetchingAction: false,
        actionError: action.payload,
      };
    case GET_LOGGED_ACTION_REQUEST:
      return { ...state, fetchingAction: true };
    case GET_LOGGED_ACTION_SUCCESS:
      return {
        ...state,
        fetchingAction: false,
        actionFetched: true,
        loggedAction: action.payload,
      };
    case GET_LOGGED_ACTION_FAIL:
      return {
        ...state,
        fetchingAction: false,
        actionError: action.payload,
      };
    case RESET_ACTION_LOGGING:
      return {
        ...state,
        actionAdded: false,
      };
    default:
      return state;
  }
};
