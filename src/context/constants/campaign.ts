export const CREATE_CAMPAIGN_REQUEST = "CREATE_CAMPAIGN_REQUEST";
export const CREATE_CAMPAIGN_SUCCESS = "CREATE_CAMPAIGN_SUCCESS";
export const CREATE_CAMPAIGN_FAIL = "CREATE_CAMPAIGN_FAIL";
export const CREATE_CAMPAIGN_RESET = "CREATE_CAMPAIGN_RESET";
export const GET_JOINED_CAMPAIGN_REQUEST = "GET_JOINED_CAMPAIGN_REQUEST";
export const GET_JOINED_CAMPAIGN_SUCCESS = "GET_JOINED_CAMPAIGN_SUCCESS";
export const GET_JOINED_CAMPAIGN_FAIL = "GET_JOINED_CAMPAIGN_FAIL";
export const GET_CAMPAIGN_REQUEST = "GET_CAMPAIGN_REQUEST";
export const GET_CAMPAIGN_SUCCESS = "GET_CAMPAIGN_SUCCESS";
export const GET_CAMPAIGN_FAIL = "GET_CAMPAIGN_FAIL";
export const GET_CAMPAIGN_RESET = "GET_CAMPAIGN_RESET";
export const GET_CAMPAIGN_DETAILS_REQUEST = "GET_CAMPAIGN_DETAILS_REQUEST";
export const GET_CAMPAIGN_DETAILS_SUCCESS = "GET_CAMPAIGN_DETAILS_SUCCESS";
export const GET_CAMPAIGN_DETAILS_FAIL = "GET_CAMPAIGN_DETAILS_FAIL";
export const GET_CAMPAIGN_DETAILS_RESET = "GET_CAMPAIGN_DETAILS_RESET";
export const JOIN_CAMPAIGN_REQUEST = "JOIN_CAMPAIGN_REQUEST";
export const JOIN_CAMPAIGN_SUCCESS = "JOIN_CAMPAIGN_SUCCESS";
export const JOIN_CAMPAIGN_FAIL = "JOIN_CAMPAIGN_FAIL";
export const JOIN_CAMPAIGN_RESET = "JOIN_CAMPAIGN_RESET";
export const LEAVE_CAMPAIGN_REQUEST = "LEAVE_CAMPAIGN_REQUEST";
export const LEAVE_CAMPAIGN_SUCCESS = "LEAVE_CAMPAIGN_SUCCESS";
export const LEAVE_CAMPAIGN_FAIL = "LEAVE_CAMPAIGN_FAIL";
export const LEAVE_CAMPAIGN_RESET = "LEAVE_CAMPAIGN_RESET";
export const UPDATE_CAMPAIGN_REQUEST = "UPDATE_CAMPAIGN_REQUEST";
export const UPDATE_CAMPAIGN_SUCCESS = "UPDATE_CAMPAIGN_SUCCESS";
export const UPDATE_CAMPAIGN_FAIL = "UPDATE_CAMPAIGN_FAIL";
export const UPDATE_CAMPAIGN_RESET = "UPDATE_CAMPAIGN_RESET";
export const DELETE_CAMPAIGN_REQUEST = "DELETE_CAMPAIGN_REQUEST";
export const DELETE_CAMPAIGN_SUCCESS = "DELETE_CAMPAIGN_SUCCESS";
export const DELETE_CAMPAIGN_FAIL = "DELETE_CAMPAIGN_FAIL";
export const DELETE_CAMPAIGN_RESET = "DELETE_CAMPAIGN_RESET";
export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAIL = "SEND_MESSAGE_FAIL";
export const SEND_MESSAGE_RESET = "SEND_MESSAGE_RESET";
export const RESET_CAMPAIGN = "RESET_CAMPAIGN";

export type CampaignActionType =
  | typeof CREATE_CAMPAIGN_REQUEST
  | typeof CREATE_CAMPAIGN_SUCCESS
  | typeof CREATE_CAMPAIGN_FAIL
  | typeof CREATE_CAMPAIGN_RESET
  | typeof GET_JOINED_CAMPAIGN_REQUEST
  | typeof GET_JOINED_CAMPAIGN_SUCCESS
  | typeof GET_JOINED_CAMPAIGN_FAIL
  | typeof GET_CAMPAIGN_REQUEST
  | typeof GET_CAMPAIGN_SUCCESS
  | typeof GET_CAMPAIGN_FAIL
  | typeof GET_CAMPAIGN_RESET
  | typeof GET_CAMPAIGN_DETAILS_REQUEST
  | typeof GET_CAMPAIGN_DETAILS_SUCCESS
  | typeof GET_CAMPAIGN_DETAILS_FAIL
  | typeof GET_CAMPAIGN_DETAILS_RESET
  | typeof JOIN_CAMPAIGN_REQUEST
  | typeof JOIN_CAMPAIGN_SUCCESS
  | typeof JOIN_CAMPAIGN_FAIL
  | typeof JOIN_CAMPAIGN_RESET
  | typeof LEAVE_CAMPAIGN_REQUEST
  | typeof LEAVE_CAMPAIGN_SUCCESS
  | typeof LEAVE_CAMPAIGN_FAIL
  | typeof LEAVE_CAMPAIGN_RESET
  | typeof UPDATE_CAMPAIGN_REQUEST
  | typeof UPDATE_CAMPAIGN_SUCCESS
  | typeof UPDATE_CAMPAIGN_FAIL
  | typeof UPDATE_CAMPAIGN_RESET
  | typeof DELETE_CAMPAIGN_REQUEST
  | typeof DELETE_CAMPAIGN_SUCCESS
  | typeof DELETE_CAMPAIGN_FAIL
  | typeof DELETE_CAMPAIGN_RESET
  | typeof SEND_MESSAGE_REQUEST
  | typeof SEND_MESSAGE_SUCCESS
  | typeof SEND_MESSAGE_FAIL
  | typeof SEND_MESSAGE_RESET
  | typeof RESET_CAMPAIGN;
