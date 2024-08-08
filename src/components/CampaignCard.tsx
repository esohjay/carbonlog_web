import { useNavigate } from "react-router-dom";
type PropType = {
  title: string;
  id: string;
};

function CampignCard({ title, id }: PropType) {
  const navigate = useNavigate();
  const splitTitle = title.split(" ");
  const abbrev =
    splitTitle.length > 2
      ? `${splitTitle[0].charAt(0)}${splitTitle[1].charAt(0)}`
      : `${splitTitle[0].charAt(0)}${splitTitle[0].charAt(1)}`;
  return (
    <div
      onClick={() => navigate(`/campaign/${id}`)}
      className={`flex flex-col gap-y-1 items-center w-28`}
    >
      <div className={`border-[3px] border-secondaryAlt rounded-full`}>
        <div
          className={`w-20 h-20 lg:w-28 lg:h-28 rounded-full flex justify-center items-center bg-dark`}
        >
          <p className={`text-2xl font-bold uppercase text-primaryLight`}>
            {abbrev}
          </p>
        </div>
      </div>
      <p className={`font-medium text-sm text-center text-mainColor`}>
        {title.length > 20 ? `${title.substring(0, 16)}..` : title}
      </p>
    </div>
  );
}

export default CampignCard;
