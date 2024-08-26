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
} from "../constants/action";

import { useActionContext } from "../providers/action";
import { auth } from "../../lib/firebaseConfig";
import { ErrorType } from "../../types/context";
import { Action } from "../../types/action";

export const useActionActions = () => {
  const { dispatch } = useActionContext();
  const handleError = (error: ErrorType) => {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return message;
  };
  const logAction = async (actionData: Action) => {
    try {
      dispatch({ type: ADD_ACTION_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/action/log`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(actionData),
        }
      );
      const data = await response.json();
      // const data = await response;
      dispatch({ type: ADD_ACTION_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: ADD_ACTION_FAIL, payload: message });
      }
    }
  };

  const getActions = async () => {
    try {
      dispatch({ type: GET_ALL_ACTION_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/action`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      dispatch({ type: GET_ALL_ACTION_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: GET_ALL_ACTION_FAIL, payload: message });
      }
    }
  };
  // const getLoggedActions = async () => {
  //   try {
  //     dispatch({ type: GET_LOGGED_ACTION_REQUEST });
  //     const token = await auth?.currentUser?.getIdToken();
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/v1/action/loggedAction`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     dispatch({ type: GET_LOGGED_ACTION_SUCCESS, payload: data });
  //   } catch (error) {
  //     const message = handleError(error);
  //     dispatch({ type: GET_LOGGED_ACTION_FAIL, payload: message });
  //   }
  // };
  return {
    logAction,
    // getLoggedActions,
    getActions,
  };
};
