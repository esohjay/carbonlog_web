import { useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { useAuthContext } from "../context/providers/auth";
import { db } from "../lib/firebaseConfig";
import { useTrackContext } from "../context/providers/track";

import {
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
} from "../context/constants/track";

export default function useGetTrack() {
  //   const { dispatch, state: surveyState } = useSurveyContext();
  const { dispatch, state: trackState } = useTrackContext();
  const { state } = useAuthContext();
  useEffect(() => {
    if (state?.user?.uid) {
      dispatch({ type: GET_ACTIVITY_REQUEST });
      const userId = state.user.uid;
      const q = doc(db, "track", userId);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.data()) {
          dispatch({
            type: GET_ACTIVITY_SUCCESS,
            payload: querySnapshot.data(),
          });
        }
      });
      return () => unsubscribe();
    }
  }, [state?.user?.uid]);
  return {
    activity: trackState.activityList,
    loadingState: trackState?.fetchingActivity,
  };
}
