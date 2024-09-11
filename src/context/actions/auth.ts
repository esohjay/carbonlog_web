import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  // SIGN_UP_FAIL,
  // SIGN_UP_REQUEST,
  // SIGN_UP_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_FAIL,
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  // CREATE_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from "../constants/auth";
// import { User } from "../../types/auth";
import { ErrorType } from "../../types/context";
import { useAuthContext } from "../providers/auth";
import {
  // createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useNavigate } from "react-router-dom";

export const useAuthActions = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const setUser = (user: User) => {
    dispatch({ type: SIGN_IN_SUCCESS, payload: user });
  };

  const handleError = (error: ErrorType) => {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return message;
  };

  const getProfile = async () => {
    try {
      dispatch({ type: GET_PROFILE_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,
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
      dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: GET_PROFILE_FAIL, payload: message });
      }
    }
  };
  const updateProfile = async (userData: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/edit`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: message });
      }
    }
  };
  const updatePassword = async (password: { password: string }) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/edit-password`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(password),
        }
      );
      const data = await response.json();
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: message });
      }
    }
  };
  const delteProfile = async () => {
    try {
      dispatch({ type: DELETE_PROFILE_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      dispatch({ type: DELETE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: DELETE_PROFILE_FAIL, payload: message });
      }
    }
  };

  // const signUp = async ({ email, password, fullName }: {email:string, password: string, fullName:string}) => {
  //   dispatch({ type: SIGN_UP_REQUEST });

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;
  //     dispatch({
  //       type: SIGN_UP_SUCCESS,
  //       payload: {
  //         id: user.uid,
  //         email: user.email,
  //         name: user.displayName,
  //         phone: user.phoneNumber,
  //       },
  //     });

  //     await createProfile({ fullName });
  //   } catch (error) {
  //     const errorCode = error.code;
  //     const errorMessage = handleError(error);
  //     dispatch({ type: SIGN_UP_FAIL, payload: errorMessage });
  //   }
  // };
  const resetPassword = async (email: string) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
      await sendPasswordResetEmail(auth, email);
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = handleError(error);
        dispatch({ type: RESET_PASSWORD_FAIL, payload: errorMessage });
      }
    }
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch({ type: SIGN_IN_REQUEST });
    setPersistence(auth, browserSessionPersistence).then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          getProfile();
          dispatch({
            type: SIGN_IN_SUCCESS,
            payload: user,
            //   payload: {
            //     id: user.uid,
            //     email: user.email,
            //     name: user.displayName,
            //     phone: user.phoneNumber,
            //   },
          });
          // ...
        })
        .catch((error) => {
          //   const errorCode = error.code;
          const errorMessage = error.message;
          dispatch({ type: SIGN_IN_FAIL, payload: errorMessage });
          // ..
        });
    });
  };
  const createProfile = async ({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    try {
      dispatch({ type: CREATE_PROFILE_REQUEST });
      // const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, password, fullName }),
        }
      );
      const data = await response.json();
      if (data) {
        await signIn({ email, password });
      }
      // dispatch({ type: CREATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: CREATE_PROFILE_FAIL, payload: message });
      }
    }
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({ type: SIGN_OUT });
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        dispatch({ type: SIGN_OUT_FAIL, payload: error });
      });
  };

  return {
    getProfile,
    setUser,
    signIn,
    logOut,
    createProfile,
    updateProfile,
    updatePassword,
    delteProfile,
    resetPassword,
  };
};
