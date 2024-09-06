import { useState, useEffect } from "react";
import Btn from "../components/Button";
import TeamCard from "../components/TeamCard";
import CampaignForm from "../components/CampaignForm";
import { useCampaignActions } from "../context/actions/campaign";
import { Modal } from "../components/Modal";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import Spinner from "../components/Spinner";
import { useCampaignContext } from "../context/providers/campaign";
// import CampaignCardSkeleton from "../components/skeletons/CampaignCardSkeleton";
import useGetCampaigns from "../lib/useGetCampaigns";
import {
  onSnapshot,
  collection,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  GET_JOINED_CAMPAIGN_REQUEST,
  GET_JOINED_CAMPAIGN_SUCCESS,
} from "../context/constants/campaign";
import { db } from "../lib/firebaseConfig";
import { useAuthContext } from "../context/providers/auth";

function CampaignScreen() {
  //   const { getCampaigns, getJoinedCampaigns } = useCampaignActions();
  const { state: userState } = useAuthContext();
  const {} = useGetCampaigns();
  const { state, dispatch } = useCampaignContext();
  const [modalOpened, setModalOpened] = useState("");
  useEffect(() => {
    if (userState?.user?.uid) {
      dispatch({ type: GET_JOINED_CAMPAIGN_REQUEST });
      const q = query(
        collection(db, "campaign"),
        where("users", "array-contains", userState.user.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const result = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch({ type: GET_JOINED_CAMPAIGN_SUCCESS, payload: result });
      });

      return () => unsubscribe();
    }
  }, [userState?.user?.uid]);
  // useEffect(() => {
  //   if (!state.joinedCampaignList) {
  //     getJoinedCampaigns();
  //   }
  // }, [state.joinedCampaignList]);
  return (
    <section className={``}>
      <section className={`lg:py-5`}>
        <p className={`font-normal text-sm lg:text-lg text-dark mb-2`}>
          Join and explore campaigns to improve your positive impact!
        </p>
        <div className={`flex flex-row items-start`}>
          <Btn
            text={"Start a Campaign"}
            mode="inline"
            Icon={IoAddCircleOutline}
            onClick={() => setModalOpened("Opened")}
          />
        </div>
        <section className={`py-5`}>
          <p className={`text-lg lg:text-xl text-mainColor font-bold mb-3`}>
            Your teams
          </p>
          {state?.joinedCampaignList && state?.joinedCampaignList?.length ? (
            <section className={`flex flex-col gap-y-3 `}>
              {/* Change to flatlist */}
              {state?.joinedCampaignList?.map((campaign) => (
                <TeamCard
                  key={campaign.id}
                  data={campaign}
                  isFullWidth={true}
                />
              ))}
            </section>
          ) : state?.joinedCampaignList &&
            !state?.joinedCampaignList?.length ? (
            <p className={`font-medium text-base`}>
              You have not joined any campaign yet.
            </p>
          ) : !state?.joinedCampaignList && state.fetchingJoinedCampaign ? (
            <Spinner />
          ) : null}
        </section>
        <section className={`py-5`}>
          <article
            className={`flex flex-row justify-between w-full items-center py-2`}
          >
            <p className={`text-xl text-mainColor font-bold mb-3`}>Campaigns</p>
            <Link
              className={`text-secondaryAlt text-base font-normal`}
              to={"all-campaign"}
            >
              See all
            </Link>
          </article>
          <section className={`grid grid-cols-1 md:grid-cols-2 gap-3`}>
            {state?.campaignList &&
              state?.campaignList?.length &&
              state.campaignList.map((campaign) => (
                <TeamCard
                  data={campaign}
                  key={campaign.id}
                  isFullWidth={true}
                />
              ))}
          </section>
        </section>
        <Modal isOpen={modalOpened === "Opened"} closeModal={setModalOpened}>
          <CampaignForm closeForm={() => setModalOpened("")} />
        </Modal>
      </section>
    </section>
  );
}

export default CampaignScreen;
