import React, { useContext, useReducer, createContext, useEffect } from "react";
import { AuthState, AuthAction } from "../../types/auth";
import { authReducer } from "../reducers/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useTokenRefresher } from "../../lib/useTokenRefresher";

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const initialState: AuthState = {
  loading: false,
  success: false,
  profileCreated: false,
  profileFetched: false,
  error: null,
  profileError: "",
  user: null,
  profile: null,
  isAuthenticated: false,
  isSignOut: false,
  updated: false,
  updating: false,
  deleted: false,
  deleting: false,
  resetSent: false,
};

// const AuthContext = createContext(initialState);
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const getProfile = async () => {
    try {
      dispatch({ type: "GET_PROFILE_REQUEST" });
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
      dispatch({ type: "GET_PROFILE_SUCCESS", payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message;
        dispatch({ type: "GET_PROFILE_FAIL", payload: message });
      }
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getProfile();
        dispatch({ type: "SIGN_IN_SUCCESS", payload: user.toJSON() });
      }
    });

    return () => unsubscribe();
  }, []);
  useTokenRefresher();
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider };
