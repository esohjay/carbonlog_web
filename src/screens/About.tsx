import { IoCheckmarkCircle } from "react-icons/io5";
import BackButton from "../components/BackButton";

export default function About() {
  return (
    <section className={`relative bg-white rounded-b-3xl py-3`}>
      <BackButton />
      <article className={`py-7 flex flex-col gap-y-3`}>
        <p
          className={`font-normal text-dark text-sm md:text-base text-justify`}
        >
          Carbon Log empowers users to understand and reduce their carbon
          footprint. The app offers four key features:
        </p>
        <article className={`flex flex-col gap-x-2 items-start w-full `}>
          <article className={`flex gap-x-2 flex-row items-center`}>
            <IoCheckmarkCircle
              name="checkmark-circle"
              size={20}
              color="#7d4f50"
            />
            <p className={`text-base font-semibold text-mainColor`}>
              Calculate Overall Emissions
            </p>
          </article>
          <p className={`ml-7 text-sm text-dark font-normal text-justify`}>
            Complete a short questionnaire to estimate your annual carbon
            emissions and you can update it to reflect new habits, motivating
            continuous improvement.
          </p>
        </article>
        <article className={`flex flex-col gap-x-2 items-start w-full `}>
          <article className={`flex gap-x-2 flex-row items-center`}>
            <IoCheckmarkCircle
              name="checkmark-circle"
              size={20}
              color="#7d4f50"
            />
            <p className={`text-base font-semibold text-mainColor`}>
              Track Emissions
            </p>
          </article>
          <p className={`ml-7 text-sm text-dark font-normal text-justify`}>
            Log daily activities to see their carbon impact and resource usage,
            encouraging more eco-friendly choices.
          </p>
        </article>
        <article className={`flex flex-col gap-x-2 items-start w-full `}>
          <article className={`flex gap-x-2 flex-row items-center`}>
            <IoCheckmarkCircle
              name="checkmark-circle"
              size={20}
              color="#7d4f50"
            />
            <p className={`text-base font-semibold text-mainColor`}>
              Take Action
            </p>
          </article>
          <p className={`ml-7 text-sm text-dark font-normal text-justify`}>
            Access tips on easy to implement sustainable practices in your daily
            life. Log actions and see the carbon savings, highlighting the
            positive impact of your choices.
          </p>
        </article>
        <article className={`flex flex-col gap-x-2 items-start w-full `}>
          <article className={`flex gap-x-2 flex-row items-center`}>
            <IoCheckmarkCircle
              name="checkmark-circle"
              size={20}
              color="#7d4f50"
            />
            <p className={`text-base font-semibold text-mainColor`}>
              Start or join campaigns
            </p>
          </article>
          <p className={`ml-7 text-sm text-dark font-normal text-justify`}>
            Start or join campaigns where you can discuss and share tips with
            like minds on how to save our environment.
          </p>
        </article>
      </article>
      <article>
        <h3 className="text-dark font-semibold">Credits</h3>
        <p className="text-mainColor">
          Illustration images used on this website were created by storyset
        </p>
        <a
          className="text-mainColor underline font-bold"
          target="_blank"
          href="https://storyset.com/nature"
        >
          Nature illustrations by Storyset
        </a>
        <a
          className="text-mainColor underline font-bold"
          target="_blank"
          href="https://storyset.com/people"
        >
          People illustrations by Storyset
        </a>
      </article>
    </section>
  );
}
