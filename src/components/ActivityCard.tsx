import { formatText } from "../lib/formatTrackText";
import { useTrackActions } from "../context/actions/track";
import { useTrackContext } from "../context/providers/track";
import { Activity, ActivityList } from "../types/track";
import { AiOutlineDelete } from "react-icons/ai";
import Spinner from "./Spinner";
import { SET_ACTIVITY_TOBEDELETED } from "../context/constants/track";

type PropType = {
  data: Activity;
  category: keyof ActivityList;
};
export default function ActivityCard({ data, category }: PropType) {
  const { deleteActivity } = useTrackActions();
  const { state, dispatch } = useTrackContext();
  const { activity, amount, emission, value, mode, unit, id } = data;
  const handleDelete = () => {
    dispatch({
      type: SET_ACTIVITY_TOBEDELETED,
      payload: { ...data, category },
    });
    deleteActivity({ ...data, category });
  };
  //   const createAlert = () =>
  //     Alert.alert(
  //       "Delete activity?",
  //       "This activity will be deleted permanently.",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel",
  //         },
  //         { text: "Delete", onPress: handleDelete },
  //       ]
  //     );
  return (
    <section style={{ flex: 1 }}>
      {activity ? (
        <section
          className={`flex flex-row justify-between gap-x-5  bg-white shadow  rounded-md p-3`}
        >
          <article className={`flex gap-y-5`}>
            <p className={`capitalize font-semibold text-base text-mainColor`}>
              {formatText(activity)}
            </p>
            <p className={`font-medium text-mainColor text-sm`}>£{amount}</p>
          </article>
          <article className={`flex gap-y-3 items-end`}>
            <article>
              <p className={`font-semibold text-sm text-dark`}>
                {emission.toFixed(2)}
                kg
              </p>
              <p className={`text-dark font-medium -my-1`}>
                <p className={`text-sm `}>of C0</p>
                <p className={`text-xs leading-3`}>2e</p>
              </p>
            </article>
            <button
              // onPress={createAlert}
              disabled={state.deletingActivity || state.activityDeleted}
            >
              {(state.deletingActivity || state.activityDeleted) &&
              id === state.toBeDeleted?.id ? (
                <Spinner
                  // animating={true}
                  color="#7d4f50"
                  // size="small"
                />
              ) : (
                <AiOutlineDelete name="delete-outline" size={18} color="red" />
              )}
            </button>
          </article>
        </section>
      ) : (
        <section
          className={`flex flex-row justify-between gap-x-5 bg-white shadow  rounded-md p-3`}
        >
          <article className={`flex gap-y-5`}>
            <p className={`capitalize font-semibold text-base text-mainColor`}>
              {mode === "publicTransport" ? "Public transport" : mode}
            </p>
            <p className={`font-medium text-mainColor text-sm`}>
              {value === "longHaul"
                ? "Long haul"
                : value === "shortHaul"
                ? "Short haul"
                : value}
              {unit === "mile" ? "miles" : unit}
            </p>
          </article>
          <section className={`flex gap-y-3 items-end`}>
            <article>
              <p className={`font-semibold text-sm text-dark`}>
                {emission.toFixed(2)}
                kg
              </p>
              <p className={`text-dark font-medium -my-1`}>
                <p className={`text-sm `}>of C0</p>
                <p className={`text-xs leading-3`}>2e</p>
              </p>
            </article>
            <button
            //   onPress={createAlert}
            //   disabled={state.deletingActivity || state.activityDeleted}
            >
              {(state.deletingActivity || state.activityDeleted) &&
              id === state.toBeDeleted?.id ? (
                <Spinner
                  // animating={true}
                  color="#7d4f50"
                  // size="small"
                />
              ) : (
                <AiOutlineDelete />
              )}
            </button>
          </section>
        </section>
      )}
    </section>
  );
}
