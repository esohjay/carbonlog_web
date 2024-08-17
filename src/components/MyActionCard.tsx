import { IoCloudDownload, IoTrophy } from "react-icons/io5";

type Action = {
  title: string;
  carbonSaved: number;
  pointsEarned: number;
  attemptCount: number;
};

type PropType = {
  data: Action;
};

export default function MyActionCard({ data }: PropType) {
  return (
    <section
      className={`bg-white shadow rounded-lg flex flex-col gap-3 p-5 w-full`}
    >
      <p className={`lg:text-lg font-bold text-mainColor`}>{data.title}</p>
      <article className={`flex flex-row justify-start items-center gap-x-2`}>
        <article
          className={`flex flex-row gap-x-2 py-1 items-center px-2 bg-[#f5b700] rounded-full`}
        >
          <IoCloudDownload name={"cloud-download"} size={16} color="#ffffff" />
          <p className={`text-white text-xs lg:text-base font-semibold`}>
            {data.carbonSaved}kg saved
          </p>
        </article>
        <article
          className={`flex flex-row gap-x-2 py-1 items-center px-4 bg-[#0d47a1] rounded-full`}
        >
          <IoTrophy name={"trophy"} size={16} color="#ffffff" />
          <p className={`text-white text-xs lg:text-base font-semibold`}>
            {data.pointsEarned} points
          </p>
        </article>
      </article>
      <p className={`text-dark text-sm lg:text-base font-semibold`}>
        You have performed this action {data.attemptCount} times
      </p>
    </section>
  );
}
