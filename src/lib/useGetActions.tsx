import { useEffect, useState } from "react";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { useAuthContext } from "../context/providers/auth";
import { db } from "../lib/firebaseConfig";
import { getPointTarget } from "../lib/helperFn";

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
  const [actions, setActions] = useState<Action[]>([]);
  const [pointDetails, setPointDetails] = useState<PointDetails>();
  const [actionSummary, setActionSummary] = useState({
    pointsEarned: 0,
    carbonSaved: 0,
    actionTaken: 0,
    treeCount: 0,
  });

  useEffect(() => {
    if (state.user?.uid) {
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
        setActions(fetchedActions);
      });
      return () => unsubscribe();
    }
  }, []);
  useEffect(() => {
    if (actions) {
      const carbonPerTree = 22;
      let carbonSaved = 0;
      let pointsEarned = 0;
      const actionTaken = actions.length;
      for (let action of actions) {
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
  }, [actions.length]);
  console.log(actions);
  useEffect(() => {
    if (actionSummary) {
      setPointDetails(getPointTarget(actionSummary.pointsEarned));
    }
  }, [actionSummary]);
  return { actionSummary, actions, pointDetails };
}
