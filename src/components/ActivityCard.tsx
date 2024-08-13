import { formatText } from "../lib/formatTrackText";
import { useTrackActions } from "../context/actions/track";
import { useTrackContext } from "../context/providers/track";
import { CarActivity } from "../types/track";
import { AiOutlineDelete } from "react-icons/ai";

type PropType = {
  data: CarActivity;
  category: string;
};
export default function ActivityCard({ data, category }: PropType) {
  const { deleteActivity } = useTrackActions();
  const { state } = useTrackContext();
  const { activity, amount, emission, value, mode, unit, id } = data;
  const handleDelete = () => {
    state.setToBeDeleted({ ...data, category });
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
          style={tw`flex flex-row justify-between gap-x-5  bg-white shadow  rounded-md p-3`}
        >
          <article style={tw`flex gap-y-5`}>
            <p style={tw`capitalize font-semibold text-base text-mainColor`}>
              {formatText(activity)}
            </p>
            <p style={tw`font-medium text-mainColor text-sm`}>£{amount}</p>
          </article>
          <article style={tw`flex gap-y-3 items-end`}>
            <article>
              <p style={tw`font-semibold text-sm text-dark`}>
                {emission.toFixed(2)}
                kg
              </p>
              <p style={tw`text-dark font-medium -my-1`}>
                <p style={tw`text-sm `}>of C0</p>
                <p style={tw`text-xs leading-3`}>2e</p>
              </p>
            </article>
            <Pressable
              onPress={createAlert}
              disabled={state.deletingActivity || state.activityDeleted}
            >
              {(state.deletingActivity || state.activityDeleted) &&
              id === toBeDelete.id ? (
                <ActivityIndicator
                  animating={true}
                  color="#7d4f50"
                  size="small"
                />
              ) : (
                <MaterialIcons name="delete-outline" size={18} color="red" />
              )}
            </Pressable>
          </article>
        </section>
      ) : (
        <section
          style={tw`flex flex-row justify-between gap-x-5 bg-white shadow  rounded-md p-3`}
        >
          <article style={tw`flex gap-y-5`}>
            <p style={tw`capitalize font-semibold text-base text-mainColor`}>
              {mode === "publicTransport" ? "Public transport" : mode}
            </p>
            <p style={tw`font-medium text-mainColor text-sm`}>
              {value === "longHaul"
                ? "Long haul"
                : value === "shortHaul"
                ? "Short haul"
                : value}
              {unit === "mile" ? "miles" : unit}
            </p>
          </article>
          <section style={tw`flex gap-y-3 items-end`}>
            <article>
              <p style={tw`font-semibold text-sm text-dark`}>
                {emission.toFixed(2)}
                kg
              </p>
              <p style={tw`text-dark font-medium -my-1`}>
                <p style={tw`text-sm `}>of C0</p>
                <p style={tw`text-xs leading-3`}>2e</p>
              </p>
            </article>
            <button
            //   onPress={createAlert}
            //   disabled={state.deletingActivity || state.activityDeleted}
            >
              {(state.deletingActivity || state.activityDeleted) &&
              id === toBeDelete.id ? (
                <ActivityIndicator
                  animating={true}
                  color="#7d4f50"
                  size="small"
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
