import { useEffect, useState } from "react";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { useAuthContext } from "../context/providers/auth";
import { db } from "../lib/firebaseConfig";
import { getPointTarget } from "../lib/helperFn";
import {
  GET_MY_ACTION_REQUEST,
  GET_MY_ACTION_SUCCESS,
} from "../context/constants/action";
import { useActionContext } from "../context/providers/action";

type Action = {
  title: string;
  carbonSaved: number;
  pointsEarned: number;
  attemptCount: number;
  id: string;
};

type PointDetails = {
  level: number;
  target: number;
  remainder: number;
  percentage: number;
};
export default function useGetActions() {
  const { state } = useAuthContext();
  const { dispatch, state: actionState } = useActionContext();
  const { fetchingAction, myActionsFetched, myActions } = actionState;
  //   const [actions, setActions] = useState<Action[]>([]);
  const [pointDetails, setPointDetails] = useState<PointDetails>();
  const [actionSummary, setActionSummary] = useState({
    pointsEarned: 0,
    carbonSaved: 0,
    actionTaken: 0,
    treeCount: 0,
  });

  useEffect(() => {
    if (state.user?.uid) {
      dispatch({ type: GET_MY_ACTION_REQUEST });
      const userId = state.user.uid;
      const q = query(
        collection(db, "profile", userId, "action-log"),
        orderBy("timestamp")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedActions: Action[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Action, "id">),
          id: doc.id,
        }));
        dispatch({ type: GET_MY_ACTION_SUCCESS, payload: fetchedActions });
        // setActions(fetchedActions);
      });
      return () => unsubscribe();
    }
  }, [state?.user?.uid]);
  useEffect(() => {
    if (myActionsFetched && myActions) {
      const carbonPerTree = 22;
      let carbonSaved = 0;
      let pointsEarned = 0;
      const actionTaken = myActions.length;
      for (let action of myActions) {
        pointsEarned += action.pointsEarned;
        carbonSaved += action.carbonSaved;
      }
      const treeCount = Math.round(carbonSaved / carbonPerTree);
      setActionSummary({
        carbonSaved,
        pointsEarned,
        actionTaken,
        treeCount,
      });
    }
  }, [myActionsFetched]);
  console.log(myActions);
  useEffect(() => {
    if (actionSummary) {
      setPointDetails(getPointTarget(actionSummary.pointsEarned));
    }
  }, [actionSummary]);
  return {
    actionSummary,
    actions: myActions,
    pointDetails,
    isFetching: fetchingAction,
  };
}
