import { IconType } from "react-icons";

type PropType = {
  bgColor: string;
  text: string;
  value: number | string;
  Icon: IconType;
};

function ActionStat({ bgColor, text, Icon, value }: PropType) {
  return (
    <section className={`flex flex-col gap-x-1 items-center w-[31%]`}>
      <div
        className={`h-10 w-10 rounded-full bg-[${bgColor}] flex items-center justify-center `}
      >
        <Icon size={24} color="#ffffff" />
      </div>
      <p className={`text-xs font-semibold text-mainColor text-center `}>
        {text}
      </p>
      <p className={`text-base font-bold text-dark`}>{value}</p>
    </section>
  );
}

export default ActionStat;
