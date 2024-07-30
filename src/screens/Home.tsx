// import React from "react";
// import { useAuthActions } from "../context/actions/auth";
import Btn from "../components/Button";
// import { useAuthContext } from "../context/providers/auth";
import useGetSurvey from "../lib/useGetSurvey";
import Image from "../components/Image";
import { FaPaw } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SurveyImg from "../assets/Analyze-amico.png";
import CampaignList from "../components/CampaignList";

export default function Home() {
  const { survey, loadingState } = useGetSurvey();
  // const { logOut } = useAuthActions();
  // const { state } = useAuthContext();
  const navigate = useNavigate();
  // console.log(state, survey);
  return (
    <main className="p-5">
      {/* <Btn text="Logout" onClick={logOut} /> */}
      {survey && survey?.totalEmission ? (
        <section className={`mb-7`}>
          <section
            className={`w-full h-44 rounded-lg relative bg-white shadow`}
          >
            <Image
              width="w-full"
              height="h-full"
              path="https://cdn.pixabay.com/photo/2018/04/04/13/38/nature-3289812_1280.jpg"
            />
            <section
              className={`h-full w-full flex items-center p-3 rounded-lg bg-black bg-opacity-60`}
            >
              <p className={`text-primaryLight font-bold text-2xl  `}>
                {(survey?.totalEmission / 1000).toFixed(2)} tonnes
              </p>
              <p className={`text-primaryLight font-bold text-sm mb-3 `}>
                (Estimated footprint)
              </p>
              <p
                className={`text-altColor font-semibold mb-3 text-center w-3/4`}
              >
                section more details about your carbon footprint
              </p>
              <Btn
                text={"View"}
                Icon={FaPaw}
                variant="outline"
                onClick={() => navigate("/estimate")}
              />
            </section>
          </section>
        </section>
      ) : (
        <section
          className={`flex flex-row gap-10 w-full md:h-[350px] p-5 items-center shadow md:shadow-none bg-white rounded-lg`}
        >
          <section
            className={`h-20 md:h-[400px] mb-3 bg-transparent w-3/12 md:w-1/3`}
          >
            <Image width="w-full" height="h-full" path={SurveyImg} />
          </section>
          <section className={` w-9/12 md:w-1/2`}>
            <p
              className={`font-semibold text-lg text-mainColor mb-1 md:font-bold md:text-4xl`}
            >
              Estimate footprint
            </p>
            <p className={`text-dark mb-3 font-normal md:text-2xl`}>
              Take a quick survey to estimate how much carbon you emit yearly.
            </p>
            <section className={`flex items-start`}>
              <Btn
                text={"Start now"}
                Icon={FaPaw}
                variant="outline"
                onClick={() => navigate("/survey")}
                mode="inline"
              />
            </section>
          </section>
        </section>
      )}
      <section className={`py-3`}>
        <h3 className={`text-mainColor font-bold mb-5 text-xl`}>Campaigns</h3>
        <CampaignList />
        <div className={`h-[1px] bg-altColor w-full my-3`}></div>
        <p className={`text-dark font-medium mb-1`}>
          Want to start a campaign?
        </p>
        <p
          onClick={() => navigate("/campaign")}
          className={`text-base font-semibold text-dark`}
        >
          Start campaign
        </p>
      </section>
    </main>
  );
}
