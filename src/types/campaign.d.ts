import { CampaignActionType } from "../context/constants/campaign";
import { ErrorType } from "./context";
import { Timestamp } from "firebase/firestore";

export interface CampaignAction {
  type: CampaignActionType;
  payload?: any;
}
interface JoinedCampaign {
  message: string;
}
export interface CampaignState {
  campaignAdded: boolean;
  campaignFetched: boolean;
  campaign: Campaign | null;
  campaignList: Campaign[] | null;
  campaignError: ErrorType | null;
  addingCampaign: boolean;
  fetchingCampaign: boolean;
  joinedCampaignList: JoinedCampaign | null;
  joinedCampaignFetched: boolean;
  fetchingJoinedCampaign: boolean;
  joined: boolean;
  joining: boolean;
  left: boolean;
  leaving: boolean;
  message: Message | null;
  sendingMessage: boolean;
  messageSent: boolean;
  deleting: boolean;
  deleted: boolean;
  updating: boolean;
  updated: boolean;
}
export interface Campaign {
  id: string;
  createdBy: string;
  description: string;
  timestamp: Timestamp;
  title: string;
  users: string[];
}
interface Sender {
  name: string;
  id: string;
}
export interface Message {
  message: string;
  timestamp: Timestamp;
  sender: Sender;
}
