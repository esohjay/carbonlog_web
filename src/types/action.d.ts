import { ErrorType } from "./context";
import { ActionTypes } from "../context/constants/action";
import { Timestamp } from "firebase/firestore";

export interface ActionsAction {
  type: ActionType;
  payload?: any;
}

export interface ActionState {
  actionAdded: boolean;
  actionFetched: boolean;
  action: Action | null;
  loggedAction: null;
  actionList: Action[] | null;
  actionError: ErrorType | null;
  addingAction: boolean;
  fetchingAction: boolean;
}

export interface Action {
  title: string;
  category: string;
  description: string;
  sdg: number[];
  id: string;
  emission: number;
  point: number;
  timestamp: Timestamp;
}
