import { useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { useAuthContext } from "../context/providers/auth";
import { db } from "../lib/firebaseConfig";
import {
  useSurveyContext,
  surveyInitialData,
} from "../context/providers/survey";
import {
  GET_SURVEY_SUCCESS,
  GET_SURVEY_REQUEST,
} from "../context/constants/survey";

export default function useGetSurvey() {
  const { dispatch, state: surveyState } = useSurveyContext();
  const { state } = useAuthContext();
  useEffect(() => {
    if (state?.user?.uid) {
      dispatch({ type: GET_SURVEY_REQUEST });
      const userId = state.user.uid;
      const q = doc(db, "profile", userId, "survey", userId);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.data()) {
          dispatch({ type: GET_SURVEY_SUCCESS, payload: querySnapshot.data() });
        } else {
          dispatch({ type: GET_SURVEY_SUCCESS, payload: surveyInitialData });
        }
      });
      return () => unsubscribe();
    }
  }, [state?.user?.uid]);
  return {
    survey: surveyState?.survey,
    loadingState: surveyState?.fetchingSurvey,
  };
}
