import { AuthActionType } from "../context/constants/auth";
import { User } from "firebase/auth";
import { ErrorType, FirebaseAuthError } from "./context";

// Define the shape of each action
export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}
export type AuthState = {
  loading: boolean;
  success: boolean;
  profileCreated: boolean;
  profileFetched: boolean;
  error: ErrorType | FirebaseAuthError | null;
  profileError: string;
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isSignOut: boolean;
  updated: boolean;
  updating: boolean;
  deleted: boolean;
  deleting: boolean;
  resetSent: boolean;
};

// export type User = {
//   id: string;
//   email: string;
//   name: string;
//   phone: string;
// };
export type Profile = {
  id: string;
  email: string;
  firstName: string;
  fullName: string;
};
