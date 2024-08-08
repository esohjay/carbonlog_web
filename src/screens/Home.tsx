// import React from "react";
// import { useAuthActions } from "../context/actions/auth";
import Btn from "../components/Button";
// import { useAuthContext } from "../context/providers/auth";
import useGetSurvey from "../lib/useGetSurvey";
import Image from "../components/Image";
import { FaPaw } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import SurveyImg from "../assets/Analyze-amico.png";
import CampaignList from "../components/CampaignList";
import ActionsList from "../components/ActionsList";
import LinkBtn from "../components/LinkBtn";
import ActionCard from "../components/ActionCard";

export default function Home() {
  const { survey, loadingState } = useGetSurvey();
  // const { logOut } = useAuthActions();
  // const { state } = useAuthContext();
  const navigate = useNavigate();
  // console.log(state, survey);
  return (
    <main className="">
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
          className={`lg:flex lg:flex-row gap-10 w-full lg:h-[350px] p-5 lg:items-center shadow lg:shadow-none bg-white rounded-lg lg:mb-10`}
        >
          <section className="flex items-center justify-center flex-col gap-y-3 lg:block lg:gap-x-0 lg:w-1/3">
            <div
              className={`h-24 lg:h-[400px] lg:mb-3 bg-transparent w-24 lg:w-full `}
            >
              <Image width="w-full" height="h-full" path={SurveyImg} />
            </div>
            <p
              className={`font-semibold text-xl text-mainColor mb-1 lg:font-bold lg:text-4xl lg:hidden`}
            >
              Estimate footprint
            </p>
          </section>
          <section className={` w-full lg:w-1/2`}>
            <p
              className={`font-semibold text-lg text-mainColor mb-1 lg:font-bold lg:text-4xl lg:block hidden`}
            >
              Estimate footprint
            </p>
            <p
              className={`text-dark mb-3 font-normal lg:text-xl text-center lg:text-left`}
            >
              Take a quick survey to estimate how much carbon you emit yearly.
            </p>
            <section
              className={`flex items-start justify-center lg:justify-start`}
            >
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
      <section className={`py-2`}>
        <article
          className={`flex flex-row items-center justify-between mb-1 w-full`}
        >
          <p className={`text-mainColor font-bold text-xl`}>Actions</p>
          <Link
            to={"/act"}
            className={`text-secondaryAlt text-base font-normal`}
            // onClick={() => navigate("/act")}
          >
            See all
          </Link>
        </article>
        <ActionsList />
        <ActionCard
          data={{
            title: "Hgehe",
            category: "djdjjd",
            description: "jshhsh",
            sdg: [9],
            id: "dd",
            emission: 9,
            point: 10,
          }}
        />
      </section>
      <section className={`mb-7`}>
        <section className={`w-full h-44 rounded-lg relative bg-white shadow`}>
          <Image
            height="h-full"
            width="w-full"
            path="https://cdn.pixabay.com/photo/2017/09/20/06/27/bridge-2767545_1280.jpg"
          />
          <div
            className={`h-full w-full flex flex-col items-center absolute top-0 left-0 p-3 rounded-lg bg-black bg-opacity-60`}
          >
            <p className={`text-primaryLight font-bold text-2xl mb-3 `}>
              Did you know?
            </p>
            <p className={`text-altColor font-semibold mb-3 text-center w-3/4`}>
              Regular visits to greenspaces improves your mental health.
            </p>
            <LinkBtn
              text={"Explore greenspaces"}
              // icon={"rocket"}
              variant="fill"
              mode="inline"
              path="https://greenspace-explorer.vercel.app/"
            />
          </div>
        </section>
      </section>
      <section className={`pb-10`}>
        <section className={`bg-white shadow rounded-lg p-5 `}>
          <p className={`text-xl font-bold mb-2 text-mainColor`}>
            More is better
          </p>
          <p className={` font-medium mb-2 text-mainColor`}>
            Make a big impact by helping others reduce their carbon emission.
          </p>
          <LinkBtn
            text={"Invite friends"}
            variant="fill"
            mode="inline"
            path="https://greenspace-explorer.vercel.app/"
          />
        </section>
      </section>
    </main>
  );
}
