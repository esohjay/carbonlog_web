import { Badge } from "./Badge";
import { useNavigate, useParams } from "react-router-dom";
import { Action } from "../types/action";

type PropType = {
  data: Action;
  isFullWidth?: boolean;
};

function ActionCard({ data, isFullWidth = false }: PropType) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { title, category, description, sdg, id, emission, point } = data;
  return (
    <article
      onClick={() => navigate(`/${userId}/${id}`)}
      className={`shadow bg-white p-3 rounded-lg shrink-0  cursor-pointer ${
        isFullWidth ? "w-full" : "w-[300px]"
      }`}
    >
      <p className={`font-semibold lg:text-lg mb-2 text-dark`}>{title}</p>
      <div className={`flex flex-row justify-start gap-2 mb-3 flex-wrap`}>
        <Badge text={category} variant="success" textStyle={`capitalize`} />
        <div className={`flex gap-1 flex-row items-center flex-wrap`}>
          {sdg.map((goal, i) => {
            if (i === 2) {
              return;
            }
            return <Badge key={i} text={`SDG ${goal}`} variant="blue" />;
          })}
        </div>
      </div>
      <p className={`text-mainColor text-xs lg:text-sm font-normal mb-3`}>
        {description.substring(0, 65)}...
      </p>
      <div className={`flex flex-row justify-between items-center`}>
        <div
          className={`flex flex-row gap-x-1 py-1 items-center px-2 bg-[#0d47a1] rounded-full`}
        >
          {/* <Ionicons name={"trophy"} size={16} color="#ffffff" /> */}
          <p className={`text-white text-xs lg:text-sm font-semibold`}>
            {point} points
          </p>
        </div>
        <div
          className={`flex flex-row gap-x-1 py-1 items-center px-2 bg-[#f5b700] rounded-full`}
        >
          {/* <Ionicons name={"cloud-download"} size={16} color="#ffffff" /> */}
          <span className={`text-white flex items-end`}>
            <p className={`text-xs lg:text-sm `}> {emission}kgC0</p>
            <p className={`text-[10px] lg:text-xs `}>2</p>
          </span>
          {/* <Text className={`text-white font-semibold`}>
            {val.toFixed(1)}kg saved
          </Text> */}
        </div>
      </div>
    </article>
  );
}

export default ActionCard;
