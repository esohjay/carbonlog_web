import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Btn from "../components/Button";
import {
  JOIN_CAMPAIGN_RESET,
  LEAVE_CAMPAIGN_RESET,
  GET_CAMPAIGN_DETAILS_REQUEST,
  GET_CAMPAIGN_DETAILS_SUCCESS,
  DELETE_CAMPAIGN_RESET,
} from "../context/constants/campaign";
import { useCampaignActions } from "../context/actions/campaign";
import { useCampaignContext } from "../context/providers/campaign";
import { useAuthContext } from "../context/providers/auth";
import Spinner from "../components/Spinner";
import EditCampaignForm from "../components/EditCampaignForm";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { IoPeople } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { IoChatbubbles } from "react-icons/io5";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import PopUpModal from "../components/PopUpModal";

export default function CampaignDetails() {
  const { state: userState } = useAuthContext();
  const navigate = useNavigate();
  const [modalOpened, setModalOpened] = useState("");
  const [popUpModalOpened, setPopUpModalOpened] = useState(false);
  const { campaignId } = useParams();
  //   const [campaign, setCampaign] = useState(null);
  const { joinCampaign, leaveCampaign, deleteCampaign } = useCampaignActions();
  const { state, dispatch } = useCampaignContext();
  const { campaign, left, joined, fetchingCampaign, deleted } = state;

  useEffect(() => {
    if (campaignId) {
      dispatch({ type: GET_CAMPAIGN_DETAILS_REQUEST });
      const q = doc(db, "campaign", campaignId);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        dispatch({
          type: GET_CAMPAIGN_DETAILS_SUCCESS,
          payload: { ...querySnapshot.data(), id: querySnapshot.id },
        });
      });
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (left) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: LEAVE_CAMPAIGN_RESET });
        // getCampaign(campaignId);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [left]);
  useEffect(() => {
    if (joined) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: JOIN_CAMPAIGN_RESET });
        // getCampaign(campaignId);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [joined]);
  useEffect(() => {
    if (deleted) {
      dispatch({ type: DELETE_CAMPAIGN_RESET });
      navigate(-1);
    }
  }, [deleted]);

  return (
    <section className={` min-h-screen lg:pr-24 lg:py-5`}>
      {!fetchingCampaign ? (
        <section>
          <section className={`relative p-5 bg-white rounded-b-3xl shadow-md`}>
            <BackButton />
            <section
              className={`w-full absolute left-0 justify-center -bottom-7 flex items-`}
            >
              <article
                className={` h-12 w-1/2 p-1 justify-center shadow-md shadow-white items-center bg-emerald-500 rounded-full`}
              >
                <article
                  className={`flex flex-row gap-x-1  w-full h-full items-center justify-center rounded-full`}
                >
                  <IoPeople name={"people"} size={16} color="#ffffff" />
                  <p className={`text-white font-semibold`}>
                    {campaign?.users?.length}
                  </p>
                  <p className={`text-white font-semibold`}>
                    {campaign && campaign?.users?.length > 1
                      ? "Members"
                      : "Member"}
                  </p>
                </article>
              </article>
            </section>
            <article className={`py-5`}>
              <p
                className={`font-extrabold mb-3 capitalize text-mainColor text-center text-lg lg:text-2xl`}
              >
                {campaign?.title}
              </p>
              <p
                className={`font-medium text-center text-dark text-sm lg:text-base mb-2`}
              >
                {campaign?.description}
              </p>
            </article>
          </section>
          <section className={`mt-16`}>
            {joined && (
              <p className={`my-2 text-sm text-green-500 lg:text-lg`}>
                You have joined this campaign!
              </p>
            )}
            {left && (
              <p className={`my-2 text-sm text-green-500`}>
                You left this campaign
              </p>
            )}
            <section className={` bg-mainColor p-4 shadow-md rounded-lg`}>
              <p className={`font-semibold mb-2 text-primaryLight`}>
                {userState.user &&
                campaign?.users?.includes(userState?.user?.uid)
                  ? "You are a member of this campaign"
                  : "Join this campaign to make changes to our world"}
              </p>
              <div className={`w-full flex flex-row justify-start pt-4`}>
                {campaignId && (
                  <div className={`max-w-2/3`}>
                    {userState.user &&
                    campaign?.users?.includes(userState?.user?.uid) ? (
                      <Btn
                        padding="px-4 py-1 lg:px-6 lg:py-3"
                        textSize="text-[9px] lg:text-sm"
                        text={"leave campaign"}
                        Icon={IoPersonRemove}
                        isLoading={state.leaving}
                        onClick={() => leaveCampaign(campaignId)}
                        variant="light"
                      />
                    ) : (
                      <Btn
                        padding="px-4 py-1 lg:px-6 lg:py-3"
                        textSize="text-[9px] lg:text-sm"
                        text={"join campaign"}
                        Icon={IoPersonAdd}
                        isLoading={state.joining}
                        onClick={() => joinCampaign(campaignId)}
                        variant="light"
                      />
                    )}
                  </div>
                )}
              </div>
            </section>
            {campaign?.createdBy === userState?.user?.uid && (
              <div className={`flex flex-row my-3 gap-x-4`}>
                <Btn
                  padding="px-4 py-1 lg:px-6 lg:py-3"
                  textSize="text-[9px] lg:text-sm"
                  text={"edit"}
                  Icon={TbEdit}
                  mode="inline"
                  onClick={() => setModalOpened("Opened")}
                />
                <Btn
                  padding="px-4 py-1 lg:px-6 lg:py-3"
                  textSize="text-[9px] lg:text-sm"
                  text="delete"
                  Icon={MdDelete}
                  isLoading={state.deleting}
                  onClick={() => setPopUpModalOpened(true)}
                  variant="destructive"
                  mode="inline"
                />
              </div>
            )}
            {userState.user &&
              campaign?.users?.includes(userState?.user?.uid) && (
                <div className={`w-full flex flex-row justify-end pt-4`}>
                  <div className={`max-w-2/3`}>
                    <Btn
                      padding="px-4 py-1 lg:px-6 lg:py-3"
                      textSize="text-[9px] lg:text-sm"
                      text={"go to chat"}
                      Icon={IoChatbubbles}
                      onClick={() => navigate(`chat`)}
                      variant="light"
                    />
                  </div>
                </div>
              )}
          </section>
        </section>
      ) : (
        <div className={` p-5 flex gap-4`}>
          <BackButton />
          <Spinner />
        </div>
      )}
      <Modal isOpen={modalOpened === "Opened"} closeModal={setModalOpened}>
        <EditCampaignForm closeForm={() => setModalOpened("")} />
      </Modal>
      {campaignId && (
        <PopUpModal
          controlModal={setPopUpModalOpened}
          heading="Delete campaign?"
          text="This campaign will be deleted permanently"
          show={popUpModalOpened}
          onConfirm={() => deleteCampaign(campaignId)}
        />
      )}
    </section>
  );
}
