import {
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_FAIL,
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_SUCCESS,
} from "../constants/auth";
// import { initialState } from "../providers/auth";
import { AuthState, AuthAction } from "../../types/auth";

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isSignOut: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case SIGN_IN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SIGN_UP_REQUEST:
      return { ...state, loading: true };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isAuthenticated: true,
        isSignOut: false,
        user: action.payload,
      };
    case SIGN_UP_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        profileCreated: true,
        loading: false,
        profile: action.payload,
      };
    case CREATE_PROFILE_FAIL:
      return { ...state, loading: false, profileError: action.payload };
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileFetched: true,
        loading: false,
        profile: action.payload,
      };
    case GET_PROFILE_FAIL:
      return { ...state, loading: false, profileError: action.payload };
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetSent: true,
        loading: false,
      };
    case RESET_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload };
    case RESET_PASSWORD_RESET:
      return { ...state, resetSent: false };
    case UPDATE_PROFILE_REQUEST:
      return { ...state, updating: true };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updated: true,
        updating: false,
      };
    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        updated: false,
        updating: false,
      };
    case UPDATE_PROFILE_FAIL:
      return { ...state, updating: false, profileError: action.payload };
    case DELETE_PROFILE_REQUEST:
      return { ...state, deleting: true };
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        deleted: true,
        deleting: false,
      };
    case DELETE_PROFILE_FAIL:
      return { ...state, updating: false, profileError: action.payload };
    case SIGN_OUT:
      return {
        ...state,
        loading: false,
        isSignOut: true,
        isAuthenticated: false,
        user: null,
      };
    case SIGN_OUT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
