import { useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { useAuthContext } from "../context/providers/auth";
import { db } from "../lib/firebaseConfig";
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
} from "../context/constants/auth";

export default function useGetProfile() {
  const { state, dispatch } = useAuthContext();
  useEffect(() => {
    if (state?.user?.uid) {
      dispatch({ type: GET_PROFILE_REQUEST });
      const q = doc(db, "profile", state.user.uid);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        dispatch({ type: GET_PROFILE_SUCCESS, payload: querySnapshot.data() });
      });
      return () => unsubscribe();
    }
  }, [state?.user?.uid]);
  return {
    profile: state?.profile,
    loadingState: state?.loading,
  };
}
