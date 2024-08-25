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
  GET_JOINED_CAMPAIGN_FAIL,
  GET_JOINED_CAMPAIGN_REQUEST,
  GET_JOINED_CAMPAIGN_SUCCESS,
  GET_CAMPAIGN_DETAILS_FAIL,
  GET_CAMPAIGN_DETAILS_REQUEST,
  GET_CAMPAIGN_DETAILS_SUCCESS,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  UPDATE_CAMPAIGN_FAIL,
  UPDATE_CAMPAIGN_REQUEST,
  UPDATE_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_FAIL,
  DELETE_CAMPAIGN_REQUEST,
  DELETE_CAMPAIGN_SUCCESS,
} from "../constants/campaign";
import { ErrorType } from "../../types/context";

import { useCampaignContext } from "../providers/campaign";
import { auth } from "../../lib/firebaseConfig";

export const useCampaignActions = () => {
  const { dispatch } = useCampaignContext();
  const handleError = (error: ErrorType) => {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return message;
  };
  const createCampaign = async (campaignData: {
    title: string;
    description: string;
  }) => {
    try {
      dispatch({ type: CREATE_CAMPAIGN_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/campaign`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(campaignData),
        }
      );
      const data = await response.json();
      // const data = await response;
      dispatch({ type: CREATE_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: CREATE_CAMPAIGN_FAIL, payload: message });
      }
    }
  };
  const sendMessage = async (message: { message: string; id: string }) => {
    try {
      dispatch({ type: SEND_MESSAGE_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/campaign/${
          message.id
        }/conversation`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(message),
        }
      );
      const data = await response.json();
      // const data = await response;
      dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: SEND_MESSAGE_FAIL, payload: message });
      }
    }
  };
  const joinCampaign = async (campaignId: string) => {
    try {
      dispatch({ type: JOIN_CAMPAIGN_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/campaign/${campaignId}/join`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ campaignId }),
        }
      );
      const data = await response.json();
      // const data = await response;
      dispatch({ type: JOIN_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: JOIN_CAMPAIGN_FAIL, payload: message });
      }
    }
  };
  const leaveCampaign = async (campaignId: string) => {
    try {
      dispatch({ type: LEAVE_CAMPAIGN_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/campaign/${campaignId}/leave`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ campaignId }),
        }
      );
      const data = await response.json();
      // const data = await response;
      dispatch({ type: LEAVE_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: LEAVE_CAMPAIGN_FAIL, payload: message });
      }
    }
  };
  const updateCampaign = async (campaign: {
    title: string;
    description: string;
    id: string;
  }) => {
    try {
      dispatch({ type: UPDATE_CAMPAIGN_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/campaign/${
          campaign.id
        }/edit`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(campaign),
        }
      );
      const data = await response.json();
      // const data = await response;
      dispatch({ type: UPDATE_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: UPDATE_CAMPAIGN_FAIL, payload: message });
      }
    }
  };
  const deleteCampaign = async (campaignId: string) => {
    try {
      dispatch({ type: DELETE_CAMPAIGN_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/campaign/${campaignId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ campaignId }),
        }
      );
      const data = await response.json();
      // const data = await response;
      dispatch({ type: DELETE_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: DELETE_CAMPAIGN_FAIL, payload: message });
      }
    }
  };
  const getCampaigns = async () => {
    try {
      dispatch({ type: GET_CAMPAIGN_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/campaign`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      dispatch({ type: GET_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: GET_CAMPAIGN_FAIL, payload: message });
      }
    }
  };
  const getCampaign = async (campaignId: string) => {
    try {
      dispatch({ type: GET_CAMPAIGN_DETAILS_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/campaign/${campaignId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      dispatch({ type: GET_CAMPAIGN_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: GET_CAMPAIGN_DETAILS_FAIL, payload: message });
      }
    }
  };
  const getJoinedCampaigns = async () => {
    try {
      dispatch({ type: GET_JOINED_CAMPAIGN_REQUEST });
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/campaign/joined-campaign`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      dispatch({ type: GET_JOINED_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        const message = handleError(error);
        dispatch({ type: GET_JOINED_CAMPAIGN_FAIL, payload: message });
      }
    }
  };
  return {
    createCampaign,
    getCampaigns,
    leaveCampaign,
    joinCampaign,
    getJoinedCampaigns,
    getCampaign,
    sendMessage,
    deleteCampaign,
    updateCampaign,
  };
};
