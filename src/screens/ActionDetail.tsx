import { useEffect, useState } from "react";

import BackButton from "../components/BackButton";
import { useActionActions } from "../context/actions/action";
import { useActionContext } from "../context/providers/action";
import { Badge } from "../components/Badge";
import { getGoal } from "../lib/getSdg";
import SdgCard from "../components/SdgCard";
import { RESET_ACTION_LOGGING } from "../context/constants/action";
import { Action } from "../types/action";
import { IoTrophy } from "react-icons/io5";
import { IoCloudDownloadSharp } from "react-icons/io5";
import Btn from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function ActDetails() {
  const { actionId } = useParams();
  const [action, setAction] = useState<Action | undefined>();
  const { getActions, logAction } = useActionActions();
  const { state, dispatch } = useActionContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.actionList) {
      getActions();
    }
  }, [state.actionList]);

  useEffect(() => {
    if (state.actionList) {
      const actionDetails = state.actionList.find(
        (action) => action.id === actionId
      );
      setAction(actionDetails);
    }
  }, [state.actionList]);

  useEffect(() => {
    if (state.actionAdded) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: RESET_ACTION_LOGGING });
        navigate(-1);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [state.actionAdded]);

  return (
    <section className={` lg:py-3 min-h-screen`}>
      <section className={`relative p-5 bg-white rounded-b-3xl shadow-md`}>
        <BackButton />
        <section
          className={`w-full absolute left-0 -bottom-7 flex flex-col items-center`}
        >
          <div
            className={`flex h-16 w-16 p-1 justify-center shadow-md shadow-white items-center  bg-[#0d47a1] rounded-full`}
          >
            <div
              className={`flex flex-row gap-x-1 border border-white w-full h-full items-center justify-center rounded-full`}
            >
              <IoTrophy name={"trophy"} size={16} color="#ffffff" />
              <p className={`text-white font-semibold`}>{action?.point}</p>
            </div>
          </div>
        </section>
        <section className={`pt-5 pb-8 flex flex-col gap-5 items-center mb-2`}>
          <p
            className={`font-extrabold capitalize text-mainColor text-center text-lg lg:text-2xl`}
          >
            {action?.title}
          </p>
          {action && (
            <Badge
              text={action?.category}
              variant="success"
              textStyle={`capitalize`}
            />
          )}
          <p
            className={`font-medium text-justify text-dark text-sm lg:text-base mb-2`}
          >
            {action?.description}
          </p>
        </section>
      </section>
      <section className={`px-5 mt-16`}>
        {state.actionAdded && (
          <p className={`my-2 text-sm text-green-500`}>Action logged!</p>
        )}
        <section className={` bg-mainColor p-4 shadow-md rounded-lg`}>
          <p className={`font-semibold mb-2 text-primaryLight lg:text-lg`}>
            By taking this action, you are saving
          </p>
          <article
            className={`flex flex-row gap-x-1 py-1 justify-center items-center px-2 bg-primaryLight w-[120px] rounded-full`}
          >
            <IoCloudDownloadSharp
              name={"cloud-download"}
              size={16}
              color="green"
            />
            <span className={`text-green-800 items-end flex font-semibold`}>
              <p className={`text-xs lg:text-sm `}> {action?.emission}kgC0</p>
              <p className={`text-[10px] lg:text-xs `}>2</p>
            </span>
          </article>
          <div className={`w-full flex flex-row justify-end pt-4`}>
            <div className={` max-w-2/3`}>
              {action && (
                <Btn
                  textSize="text-[9px] lg:text-sm"
                  padding="px-4 py-2 lg:px-6 lg:py-3"
                  text={"log action"}
                  Icon={IoCloudDownloadSharp}
                  isLoading={state.addingAction}
                  onClick={() => logAction(action)}
                  variant="light"
                />
              )}
            </div>
          </div>
        </section>
        <article className={`flex flex-col gap-5 my-6`}>
          <p
            className={`font-bold text-lg lg:text-2xl text-center text-mainColor`}
          >
            Sustainable Development Goals
          </p>
          <p
            className={`font-medium text-center text-sm lg:text-base text-dark`}
          >
            These action relates to the following United Nations Developemnt
            Goals. By completing this action, you're contributing to the
            acomplishment of the SDGs.
          </p>
          <section
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}
          >
            {action?.sdg?.map((sdgNumber) => {
              const sdg = getGoal(sdgNumber);
              return <SdgCard key={sdg.goal} data={sdg} />;
            })}
          </section>
        </article>
      </section>
    </section>
  );
}
