import { TrackActionTypes } from "../context/constants/track";
import { ErrorType } from "./context";
import { Timestamp } from "firebase/firestore";

export interface TrackAction {
  type: TrackActionTypes;
  payload?: HttpResponse<unknown>;
}

export interface TrackState {
  activityAdded: boolean;
  activityFetched: boolean;
  activity: null;
  activityList: null;
  activityError: ErrorType | null;
  addingActivity: boolean;
  fetchingActivity: boolean;
  activityDeleted: boolean;
  deletingActivity: boolean;
  toBeDeleted: null;
}

export interface Activity {
  activity: string;
  amount: string;
  emission: number;
  id: string;
  timestamp: Timestamp;
}

export interface CarActivity extends Activity {
  value: string;
  mode: string;
  unit: string;
}
