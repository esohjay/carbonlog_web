import { ErrorType } from "./context";
import { ActionTypes } from "../context/constants/action";
import { Timestamp } from "firebase/firestore";
import { FieldNamesMarkedBoolean } from "react-hook-form";

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
  myActions: MyAction[] | null;
  myActionsFetched: boolean;
  adminActionAdded: FieldNamesMarkedBoolean;
  adminAction: Action | null;
}
type Category = "energy" | "shopping" | "food" | "travel";

export interface Action {
  title: string;
  category: Category;
  description: string;
  sdg: number[];
  id: string;
  emission: number;
  point: number;
  timestamp?: Timestamp;
}
export interface MyAction {
  title: string;
  category: string;
  attemptCount: number;
  carbonSaved: number;
  pointsEarned: number;
  emission: number;
  timestamp?: Timestamp;
}
