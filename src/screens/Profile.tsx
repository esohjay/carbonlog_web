import { useEffect, useState } from "react";
import Btn from "../components/Button";
import { useAuthContext } from "../context/providers/auth";
import AchievementStat from "../components/AchievementStat";
import UpdatePassword from "../components/UpdatePassword";
import UpdateName from "../components/UpdateName";
import TextAbbrevavtion from "../components/TextAbbrevation";
import useGetActions from "../lib/useGetActions";
import { useAuthActions } from "../context/actions/auth";
import PopUpModal from "../components/PopUpModal";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";
import LeftTree from "../assets/left-tree.png";
import RightTree from "../assets/right-tree.png";
import Image from "../components/Image";
import BackButton from "../components/BackButton";
import useGetProfile from "../lib/useGetProfile";
import {
  IoMail,
  IoCreateOutline,
  IoCloudy,
  IoMedal,
  IoAperture,
  IoDiamond,
} from "react-icons/io5";

export default function ProfileScreen() {
  const { state } = useAuthContext();
  const { profile } = useGetProfile();
  const navigate = useNavigate();
  const { delteProfile, logOut } = useAuthActions();
  const { actionSummary, pointDetails } = useGetActions();
  const [openPasswordModal, setOpenPasswordModal] = useState("");
  const [openEditModal, setOpenEditModal] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleProfileDelete = () => {
    logOut();
    delteProfile();
  };

  useEffect(() => {
    if (state?.deleted) {
      navigate("/register");
    }
  }, [state?.deleted]);
  return (
    <section className={`py-3 flex flex-col gap-3`}>
      <article className="flex justify-between items-center ">
        <BackButton />
        <button
          className={`flex items-center flex-row mb-1 gap-x-1`}
          onClick={() => setOpenEditModal("Opened")}
        >
          <p className={`text-sm text-dark font-semibold underline`}>
            Update profile
          </p>
        </button>
      </article>
      <article
        className={`flex flex-row items-start p-3 lg:py-8 lg:px-6 bg-white rounded-lg shadow gap-x-3 lg:gap-x-6`}
      >
        <article className={`flex items-center gap-y-1  w-[20%`}>
          {profile && (
            <TextAbbrevavtion
              text={profile?.fullName}
              size="w-16 h-16 lg:w-20 lg:h-20"
              textSize="text-3xl lg:text-4xl"
            />
          )}
        </article>
        <article className={`w-[70% flex flex-col gap-3`}>
          <p className={`text-lg lg:text-3xl text-mainColor font-bold `}>
            {profile?.fullName}
          </p>

          <article className={`flex flex-row items-center gap-x-2`}>
            <IoMail name={"mail"} size={20} color="#7d4f50" />
            <p className={`text-sm text-dark font-medium  lg:text-lg`}>
              {profile?.email}
            </p>
          </article>
          <button
            className={`flex items-center flex-row  gap-x-1`}
            onClick={() => setOpenPasswordModal("Opened")}
          >
            <IoCreateOutline
              name={"create-outline"}
              size={20}
              color="#7d4f50"
            />
            <p className={`text-sm text-dark lg:text-lg font-medium`}>
              Update password
            </p>
          </button>
        </article>
      </article>
      <article className={`bg-white shadow rounded-lg p-3 mt-4`}>
        <article
          className={`flex flex-row gap-x-3 justify-between mb-5 w-full`}
        >
          <AchievementStat
            stat={actionSummary?.carbonSaved?.toFixed(2)}
            type={"KgCO2e saved"}
            Icon={IoCloudy}
          />
          <AchievementStat
            stat={actionSummary?.actionTaken}
            type={"Actions"}
            Icon={IoMedal}
          />
        </article>
        <article
          className={`flex flex-row gap-x-3 justify-between mb-5 w-full`}
        >
          <AchievementStat
            stat={actionSummary.pointsEarned}
            type={"Points"}
            Icon={IoAperture}
          />
          {pointDetails && (
            <AchievementStat
              stat={pointDetails?.level}
              type={"Level"}
              Icon={IoDiamond}
            />
          )}
        </article>
      </article>
      <article
        className={`w-full h-40 lg:h-52 relative flex flex-row justify-between bg-white rounded-lg shadow`}
      >
        <article
          className={`absolute p-4 flex flex-col items-center gap-3 h-full bg-transparent top-0 left-0 w-full bg-white bg-opacity-30 z-10`}
        >
          <p
            className={`text-sm lg:text-lg font-medium text-center text-mainColor`}
          >
            According to{" "}
            <a
              href="https://www.eea.europa.eu/articles/forests-health-and-climate-change"
              className={`font-bold underline`}
              target="_blank"
            >
              EEA
            </a>
            , a mature tree can absorb 22KgCO2 per year. Your saved emission of{" "}
            <p className={`font-bold`}>
              {actionSummary?.carbonSaved.toFixed(2)}KgCO2e
            </p>{" "}
            would equate to
          </p>

          <p className={`font-extrabold text-base lg:text-2xl text-green-800`}>
            {actionSummary?.treeCount < 1
              ? "Less than 1 tree"
              : actionSummary?.treeCount === 1
              ? "1 tree"
              : `${actionSummary?.treeCount} trees`}
          </p>
        </article>
        <article className={`w-1/3 h-24 lg:h-36 mb-3 bg-transparent self-end`}>
          <Image width="w-full" height="h-full" path={LeftTree} />
        </article>
        <article className={`w-1/3 h-24 lg:h-36 mb-3 bg-transparent self-end`}>
          <Image width="w-full" height="h-full" path={RightTree} />
        </article>
      </article>
      <article className={`py-4`}>
        <Btn
          text={"Delete account"}
          isLoading={state?.deleting}
          onClick={() => setOpenDeleteModal(true)}
          mode="inline"
        />
      </article>
      <Modal isOpen={openEditModal === "Opened"} closeModal={setOpenEditModal}>
        <article className={`px-5`}>
          {/* email */}
          {/* <UpdateEmail /> */}
          <UpdateName />
        </article>
      </Modal>
      <Modal
        isOpen={openPasswordModal === "Opened"}
        closeModal={setOpenPasswordModal}
      >
        <article className={`px-5`}>
          {/* password */}
          <UpdatePassword />
        </article>
      </Modal>
      <PopUpModal
        controlModal={setOpenDeleteModal}
        heading="Delete profile?"
        text="Your profile will be deleted permanently"
        show={openDeleteModal}
        onConfirm={handleProfileDelete}
      />
    </section>
  );
}
