import { useState } from "react";
import { formatText } from "../lib/formatTrackText";
import { useTrackActions } from "../context/actions/track";
import { useTrackContext } from "../context/providers/track";
import { Activity, ActivityList } from "../types/track";
import { AiOutlineDelete } from "react-icons/ai";
import Spinner from "./Spinner";
import { SET_ACTIVITY_TOBEDELETED } from "../context/constants/track";
import PopUpModal from "./PopUpModal";

type PropType = {
  data: Activity;
  category: keyof ActivityList;
  categoryData: Activity[];
};
export default function ActivityCard({
  data,
  category,
  categoryData,
}: PropType) {
  const [popUpModalOpened, setPopUpModalOpened] = useState(false);
  const { deleteActivity } = useTrackActions();
  const { state, dispatch } = useTrackContext();
  const { activity, amount, emission, value, mode, unit, id } = data;
  const handleDelete = () => {
    dispatch({
      type: SET_ACTIVITY_TOBEDELETED,
      payload: { ...data, category },
    });
    deleteActivity({ ...data, category }, categoryData);
  };
  return (
    <section style={{ flex: 1 }}>
      {activity ? (
        <section
          className={`flex flex-row justify-between gap-x-5  bg-white shadow  mb-2 rounded-md p-3`}
        >
          <article className={`flex flex-col gap-y-5`}>
            <p className={`capitalize font-semibold text-base text-mainColor`}>
              {formatText(activity)}
            </p>
            <p className={`font-medium text-mainColor text-sm`}>£{amount}</p>
          </article>
          <article className={`flex flex-col gap-y-3 items-end`}>
            <article>
              <p className={`font-semibold text-sm text-dark`}>
                {emission.toFixed(2)}
                kg
              </p>
              <span className={`text-dark  flex items-end -my-1`}>
                <p className={`text-sm font-medium`}>of C0</p>
                <p className={`text-xs font-medium leading-3`}>2e</p>
              </span>
            </article>
            <button
              onClick={() => setPopUpModalOpened(true)}
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
          className={`flex flex-row justify-between gap-x-5 bg-white shadow mb-2 rounded-md p-3`}
        >
          <article className={`flex flex-col gap-y-5`}>
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
          <section className={`flex flex-col gap-y-3 items-end`}>
            <article>
              <p className={`font-semibold text-sm text-dark`}>
                {emission.toFixed(2)}
                kg
              </p>
              <span className={`text-dark  flex items-end -my-1`}>
                <p className={`text-sm font-medium`}>of C0</p>
                <p className={`text-xs font-medium leading-3`}>2e</p>
              </span>
            </article>
            <button
              onClick={() => setPopUpModalOpened(true)}
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
          </section>
        </section>
      )}
      <PopUpModal
        controlModal={setPopUpModalOpened}
        heading="Delete activity?"
        text="This activity will be deleted permanently"
        show={popUpModalOpened}
        onConfirm={handleDelete}
      />
    </section>
  );
}
