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
  activity: null | ActivityResponse;
  activityList: null | ActivityList;
  activityError: ErrorType | null;
  addingActivity: boolean;
  fetchingActivity: boolean;
  activityDeleted: boolean;
  deletingActivity: boolean;
  toBeDeleted: null | Activity;
}

export interface Activity {
  activity?: string;
  amount: string;
  emission: number;
  id: string;
  timestamp: Timestamp;
  value?: string;
  mode?: string;
  unit?: string;
  category?: keyof ActivityList;
}
export interface ActivityData extends Activity {
  category: keyof ActivityList;
}
export interface ActivityResponse {
  message: string;
  data: ActivityData;
}

export interface CarActivity extends Activity {
  value: string;
  mode: string;
  unit: string;
}
export interface ActivityList {
  travel: Activity[];
  home: Activity[];
  foodAndDrink: Activity[];
  shopping: Activity[];
}
