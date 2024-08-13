import React, { useContext, useReducer, createContext } from "react";

import { TrackReducer } from "../reducers/track";
import { TrackAction, TrackState } from "../../types/track";

interface TrackContextProps {
  state: TrackState;
  dispatch: React.Dispatch<TrackAction>;
}

const TrackContext = createContext<TrackContextProps | undefined>(undefined);

const initialState: TrackState = {
  activityAdded: false,
  activityFetched: false,
  activity: null,
  activityList: null,
  activityError: null,
  addingActivity: false,
  fetchingActivity: false,
  activityDeleted: false,
  deletingActivity: false,
  toBeDeleted: null,
};
const TrackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(TrackReducer, initialState);

  return (
    <TrackContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { TrackContext, TrackProvider };
