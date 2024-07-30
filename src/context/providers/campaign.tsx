import React, { useContext, useReducer, createContext } from "react";
import { CampaignState, CampaignAction } from "../../types/campaign";

import { CampaignReducer } from "../reducers/campaign";

interface CampaignContextProps {
  state: CampaignState;
  dispatch: React.Dispatch<CampaignAction>;
}

const CampaignContext = createContext<CampaignContextProps | undefined>(
  undefined
);

const initialState: CampaignState = {
  campaignAdded: false,
  campaignFetched: false,
  campaign: null,
  campaignList: null,
  campaignError: null,
  addingCampaign: false,
  fetchingCampaign: false,
  joinedCampaignList: null,
  joinedCampaignFetched: false,
  fetchingJoinedCampaign: false,
  joined: false,
  joining: false,
  left: false,
  leaving: false,
  message: null,
  sendingMessage: false,
  messageSent: false,
  deleting: false,
  deleted: false,
  updating: false,
  updated: false,
};
const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CampaignReducer, initialState);
  return (
    <CampaignContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { CampaignContext, CampaignProvider };
