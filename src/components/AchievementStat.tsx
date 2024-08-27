import { IconType } from "react-icons";

type PropType = {
  Icon: IconType;
  stat: number | string;
  type: string;
};

function AchievementStat({ Icon, stat, type }: PropType) {
  return (
    <article className={`flex flex-row items-center gap-x-2 w-1/2`}>
      <article
        className={`h-10 w-10 rounded-full flex items-center justify-center bg-altColor`}
      >
        <Icon size={24} color="#7d4f50" />
      </article>
      <article className={``}>
        <p className={`text-base font-semibold text-dark`}>{stat}</p>
        <p className={`font-medium text-xs text-dark`}>{type}</p>
      </article>
    </article>
  );
}

export default AchievementStat;
