// import React from 'react'
import Hero from "../assets/hero.svg";
import Logo from "../assets/logo.png";
import LinkBtn from "../components/LinkBtn";
import Features from "../components/Features";
import CalculateImg from "../assets/calculate_emission.png";
import TrackImg from "../assets/track_emmission.png";
import ActionImg from "../assets/landing_banner.png";
import CampaignImg from "../assets/campaign.png";
// import HeroBlob from "./assets/hero-blob-solid.png";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative w-full flex flex-col justify-between gap-5 lg:flex-row py-5 lg:items-center bg-heroBg bg-contain bg-no-repeat bg-left-top">
        {/* <figure className="h-[350px] w-[350px] absolute -left-2 -top-2 z-[1] ">
          <img
            src={HeroBlob}
            alt=""
            className="block max-w-full max-h-full h-full w-full"
          />
        </figure> */}
        <article className="w-full lg:w-1/2 flex  flex-col px-5 lg:px-12 relative z-[2]">
          <figure className="h-24 -ml-2">
            <img
              src={Logo}
              alt=""
              className="block max-w-full max-h-full h-full"
            />
          </figure>
          <h1 className="text-2xl lg:text-4xl font-bold text-mainColor mb-1">
            Live a sustainable lifestyle.
          </h1>
          <p className="text-dark font-medium text-sm mb-4 w-[85%]">
            Carbon log consist of features that will help you to live a
            sustainable lifestyle.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <LinkBtn
              text="Get started"
              variant="fill"
              path="/login"
              mode="inline"
              padding="px-10 py-2"
            />
            <LinkBtn
              text="Download the app"
              variant="fill"
              path="https://drive.google.com/drive/folders/1SVLgRLZR8AUuNvi0uXX_G_gRe5gn5Kpt?usp=drive_link"
              mode="inline"
              padding="px-10 py-2"
              target="_blank"
            />
          </div>
        </article>
        <figure className="w-full h-[350px] md:w-2/3 lg:w-1/2 md:h-[450px] lg:h-[550px] block">
          <img
            src={Hero}
            alt="hero"
            className="block w-full max-w-full max-h-full h-full object-contain"
          />
        </figure>
      </section>
      <section className="grid py-7 px-5 md:grid-cols-2 lg:grid-cols-4 mb-6 gap-7 md:px-14">
        <Features
          text={
            "Calculate your houdehold carbon emission by answering few questions."
          }
          heading={"Calculate footprint"}
          imgPath={CalculateImg}
        />
        <Features
          text={
            "Track the amount of carbon emitted from your daily activities."
          }
          heading={"Track emmission"}
          imgPath={TrackImg}
        />
        <Features
          text={"Take actions that reduces your carbon footprint."}
          heading={"Take action"}
          imgPath={ActionImg}
        />
        <Features
          text={
            "Start or join campaigns that reduces carbon emissions in your area."
          }
          heading={"Join campaigns"}
          imgPath={CampaignImg}
        />
      </section>
    </main>
  );
}
