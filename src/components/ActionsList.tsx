import { useEffect } from "react";
import ActionCard from "./ActionCard";
import { useActionActions } from "../context/actions/action";
import { useActionContext } from "../context/providers/action";
// import ActionCardSkeleton from "./skeletons/ActionCardSkeleton";
import Spinner from "./Spinner";

export default function ActionsList() {
  const { getActions } = useActionActions();
  const { state } = useActionContext();
  useEffect(() => {
    if (!state.actionList) {
      getActions();
    }
  }, [state.actionList]);

  return (
    <section
      className={` flex overflow-x-scroll flex-cl py-5 gap-x-3 flex-nowrap `}
    >
      {state?.actionList ? (
        state?.actionList
          ?.slice(state?.actionList?.length - 4, state?.actionList?.length - 1)
          .map((item) => <ActionCard data={item} key={item.id} />)
      ) : (
        // <ActionCardSkeleton />
        <Spinner />
      )}
    </section>
  );
}
