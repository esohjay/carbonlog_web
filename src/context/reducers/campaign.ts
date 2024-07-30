import {
  CREATE_CAMPAIGN_FAIL,
  CREATE_CAMPAIGN_REQUEST,
  CREATE_CAMPAIGN_SUCCESS,
  GET_CAMPAIGN_FAIL,
  GET_CAMPAIGN_REQUEST,
  GET_CAMPAIGN_SUCCESS,
  JOIN_CAMPAIGN_FAIL,
  JOIN_CAMPAIGN_REQUEST,
  JOIN_CAMPAIGN_SUCCESS,
  LEAVE_CAMPAIGN_FAIL,
  LEAVE_CAMPAIGN_REQUEST,
  LEAVE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_RESET,
  RESET_CAMPAIGN,
  GET_JOINED_CAMPAIGN_FAIL,
  GET_JOINED_CAMPAIGN_REQUEST,
  GET_JOINED_CAMPAIGN_SUCCESS,
  JOIN_CAMPAIGN_RESET,
  LEAVE_CAMPAIGN_RESET,
  GET_CAMPAIGN_DETAILS_FAIL,
  GET_CAMPAIGN_DETAILS_REQUEST,
  GET_CAMPAIGN_DETAILS_SUCCESS,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  UPDATE_CAMPAIGN_FAIL,
  UPDATE_CAMPAIGN_REQUEST,
  UPDATE_CAMPAIGN_RESET,
  UPDATE_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_FAIL,
  DELETE_CAMPAIGN_REQUEST,
  DELETE_CAMPAIGN_RESET,
  DELETE_CAMPAIGN_SUCCESS,
} from "../constants/campaign";

import { CampaignState, CampaignAction } from "../../types/campaign";

export const CampaignReducer = (
  state: CampaignState,
  action: CampaignAction
) => {
  switch (action.type) {
    case CREATE_CAMPAIGN_REQUEST:
      return { ...state, addingCampaign: true };
    case CREATE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        addingCampaign: false,
        campaignAdded: true,
        // campaign: action.payload,
      };
    case CREATE_CAMPAIGN_FAIL:
      return { ...state, addingCampaign: false, campaignError: action.payload };
    case GET_CAMPAIGN_REQUEST:
      return { ...state, fetchingCampaign: true };
    case GET_CAMPAIGN_SUCCESS:
      return {
        ...state,
        fetchingCampaign: false,
        campaignFetched: true,
        campaignList: action.payload,
      };
    case GET_CAMPAIGN_FAIL:
      return {
        ...state,
        fetchingCampaign: false,
        campaignError: action.payload,
      };
    case GET_CAMPAIGN_DETAILS_REQUEST:
      return {
        ...state,
        fetchingCampaign: true,
        campaign: null,
        campaignFetched: false,
      };
    case GET_CAMPAIGN_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingCampaign: false,
        campaignFetched: true,
        campaign: action.payload,
      };
    case GET_CAMPAIGN_DETAILS_FAIL:
      return {
        ...state,
        fetchingCampaign: false,
        campaignError: action.payload,
      };
    case GET_JOINED_CAMPAIGN_REQUEST:
      return { ...state, fetchingJoinedCampaign: true };
    case GET_JOINED_CAMPAIGN_SUCCESS:
      return {
        ...state,
        fetchingJoinedCampaign: false,
        joinedCampaignFetched: true,
        joinedCampaignList: action.payload,
      };
    case GET_JOINED_CAMPAIGN_FAIL:
      return {
        ...state,
        fetchingJoinedCampaign: false,
        campaignError: action.payload,
      };
    case JOIN_CAMPAIGN_REQUEST:
      return { ...state, joining: true };
    case JOIN_CAMPAIGN_SUCCESS:
      return {
        ...state,
        joining: false,
        joined: true,
      };
    case JOIN_CAMPAIGN_RESET:
      return {
        ...state,
        joined: false,
      };
    case JOIN_CAMPAIGN_FAIL:
      return {
        ...state,
        joining: false,
        campaignError: action.payload,
      };
    case LEAVE_CAMPAIGN_REQUEST:
      return { ...state, leaving: true };
    case LEAVE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        leaving: false,
        left: true,
      };
    case LEAVE_CAMPAIGN_RESET:
      return {
        ...state,
        left: false,
      };
    case LEAVE_CAMPAIGN_FAIL:
      return {
        ...state,
        leaving: false,
        campaignError: action.payload,
      };
    case UPDATE_CAMPAIGN_REQUEST:
      return { ...state, updating: true };
    case UPDATE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
      };
    case UPDATE_CAMPAIGN_RESET:
      return {
        ...state,
        updated: false,
      };
    case UPDATE_CAMPAIGN_FAIL:
      return {
        ...state,
        updating: false,
        campaignError: action.payload,
      };
    case DELETE_CAMPAIGN_REQUEST:
      return { ...state, deleting: true };
    case DELETE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
      };
    case DELETE_CAMPAIGN_RESET:
      return {
        ...state,
        deleted: false,
      };
    case DELETE_CAMPAIGN_FAIL:
      return {
        ...state,
        deleting: false,
        campaignError: action.payload,
      };
    case SEND_MESSAGE_REQUEST:
      return { ...state, sendingMessage: true };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sendingMessage: false,
        messageSent: true,
        message: action.payload,
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        sendingMessage: false,
        campaignError: action.payload,
      };
    case CREATE_CAMPAIGN_RESET:
      return {
        ...state,
        campaignAdded: false,
      };
    case RESET_CAMPAIGN:
      return {
        ...state,
        campaignAdded: false,
        campaign: null,
        campaignError: null,
        addingCampaign: false,
        joined: false,
        left: false,
      };
    default:
      return state;
  }
};
