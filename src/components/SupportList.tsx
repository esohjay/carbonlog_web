import { IconType } from "react-icons";
import { IoChevronForward } from "react-icons/io5";

type PropType = {
  text: string;
  Icon: IconType;
  onClick?: () => void;
};

export default function SupportList({ text, Icon, onClick }: PropType) {
  return (
    <section onClick={onClick}>
      <div className={`flex flex-row justify-between items-center `}>
        <div className={`flex flex-row items-center gap-x-3`}>
          <Icon size={30} color="#7d4f50" />
          <p className={`text-base text-mainColor font-bold`}>{text}</p>
        </div>
        <IoChevronForward name={"chevron-forward"} size={30} color="#7d4f50" />
      </div>
    </section>
  );
}
