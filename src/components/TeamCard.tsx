// import { useAuthContext } from "../context/providers/auth";
import TextAbbrevavtion from "./TextAbbrevation";
import { Campaign } from "../types/campaign";
import { Link } from "react-router-dom";
import { IoPeople } from "react-icons/io5";

type PropType = {
  data: Campaign;
  isFullWidth: boolean;
};

export default function TeamCard({ data, isFullWidth = true }: PropType) {
  //   const { state } = useAuthContext();
  //   const navigation = useNavigation();
  const { title, description, users, id } = data;

  return (
    <Link
      to={`campaign/${id}`}
      className={`${
        isFullWidth ? "w-full" : "w-[300px]"
      } bg-white flex justify-between gap-y-5 shadow rounded-lg p-5`}
    >
      <section className={`bg-white`}>
        <article className={`flex gap-x-3 flex-row items-center`}>
          <TextAbbrevavtion text={title} size="w-12 h-12" textSize="text-xl" />
          <p
            className={`text-lg lg:text-xl font-bold text-mainColor flex flex-wrap flex-1`}
          >
            {title}
          </p>
        </article>
        <p className={`font-normal text-xs py-1 text-dark`}>
          {description.substring(0, 60)}...
        </p>
      </section>
      <section className={`flex flex-row justify-between`}>
        <article className={`flex flex-row items-center gap-x-1`}>
          <p className={`text-base text-dark font-semibold`}>{users.length}</p>
          <IoPeople name={"people"} size={24} color="#7d4f50" />
        </article>
        {/* {!users.includes(state?.user?.id) && (
          <Button text={"join"} icon={"add-circle"} />
        )} */}
      </section>
    </Link>
  );
}
