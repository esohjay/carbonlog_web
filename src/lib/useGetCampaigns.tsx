import { useEffect } from "react";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
// import { useAuthContext } from "../context/providers/auth";
import { db } from "../lib/firebaseConfig";
import { useCampaignContext } from "../context/providers/campaign";
import {
  GET_CAMPAIGN_REQUEST,
  GET_CAMPAIGN_SUCCESS,
} from "../context/constants/campaign";

export default function useGetCampaigns() {
  const { dispatch, state } = useCampaignContext();
  useEffect(() => {
    dispatch({ type: GET_CAMPAIGN_REQUEST });
    const q = query(collection(db, "campaign"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({ type: GET_CAMPAIGN_SUCCESS, payload: result });
    });

    return () => unsubscribe();
  }, []);
  return {
    campaign: state?.campaignList,
    loadingState: state?.fetchingCampaign,
  };
}
