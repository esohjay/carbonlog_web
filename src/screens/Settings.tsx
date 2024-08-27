// import { useState } from "react";
// import Btn from "../components/Button";
import { useAuthContext } from "../context/providers/auth";
import SupportList from "../components/SupportList";
// import useShareHandler from "../lib/useShareHandler";
import { useAuthActions } from "../context/actions/auth";
import {
  IoChevronForward,
  IoInformationCircle,
  IoChatboxEllipses,
  IoLogOut,
} from "react-icons/io5";
import { useNavigate, useParams, Link } from "react-router-dom";
import ShareButtons from "../components/SocialShare";

function SettingsScreen() {
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { logOut } = useAuthActions();
  //   const handleOpenLink = useOpenLink();
  //   const onShare = useShareHandler();
  //   const [switchState, setSwitchState] = useState(false);
  //   const onSwitchChange = () => {
  //     setSwitchState(!switchState);
  //   };
  return (
    <section className={`py-3 lg:pr-28`}>
      <article className={`pb-6 border-b border-b-altColor`}>
        <p className={`text-lg font-semibold text-mainColor`}>Profile</p>
        <p className={`text-xs font-medium text-mainColor mb-3`}>
          View and update update your profile.
        </p>
        <Link to={`/${userId}/profile`} className="block">
          <article
            className={`flex flex-row justify-between items-center p-3 bg-white shadow rounded-lg`}
          >
            <article>
              <p className={`text-base text-mainColor font-bold mb-1`}>
                {state?.profile?.fullName}
              </p>
              <p className={`text-sm text-dark font-medium mb-1`}>
                {state?.user?.email}
              </p>
            </article>
            <IoChevronForward
              name={"chevron-forward"}
              size={30}
              color="#7d4f50"
            />
          </article>
        </Link>
      </article>

      {/* <View className={`pb-6 pt-4 border-b border-b-altColor`}>
          <Text className={`text-lg font-semibold text-mainColor`}>
            Preference
          </Text>
          <Text className={`text-xs font-medium text-mainColor mb-3`}>
            Set your preferences
          </Text>

          <View
            className={`flex flex-row justify-between items-center mt-3 p-3 bg-white shadow rounded-lg`}
          >
            <Text className={`text-base text-mainColor font-bold`}>
              Notification
            </Text>
            <Switch
              onValueChange={onSwitchChange}
              value={switchState}
              trackColor={{ false: "#767577", true: "#7d4f50" }}
              // thumbColor={switchState ? "#ffffff" : "#eae0d5"}
            />
          </View>
        </View> */}
      <section
        className={`p-5 mt-4 bg-white rounded-lg shadow flex flex-col gap-y-6`}
      >
        <SupportList
          text={"About"}
          Icon={IoInformationCircle}
          onClick={() => navigate(`/${userId}/about`)}
        />
        {/* <SupportList
          text={"Share with friend"}
          Icon={IoPeople}
          // onClick={onShare}
        /> */}
        <a
          href="https://forms.gle/qzbWXjcn74JyVctYA"
          target="_blank"
          className="block"
        >
          <SupportList
            text={"Send us feedback"}
            Icon={IoChatboxEllipses}
            // onClick={() =>
            //   handleOpenLink("https://forms.gle/qzbWXjcn74JyVctYA")
            // }
          />
        </a>

        {/* <SupportList text={"Help"} icon={"help-circle"} /> */}
        <SupportList text={"Logout"} Icon={IoLogOut} onClick={logOut} />
      </section>
      <article className="flex flex-col gap-y-3 py-4">
        <p className={`text-lg font-semibold text-mainColor`}>
          Share with friends
        </p>
        <ShareButtons />
      </article>
    </section>
  );
}

export default SettingsScreen;
