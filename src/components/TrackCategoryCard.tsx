import Image from "./Image";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";

type PropType = {
  category: string;
  value: number;
  bgUrl: string;
  handleAddBtn: () => void;
  handleListBtn: () => void;
};

function TrackCategoryCard({
  category,
  value,
  bgUrl,
  handleAddBtn,
  handleListBtn,
}: PropType) {
  return (
    <section className={`shadow bg-white h-40 w-[47%] rounded-xl relative`}>
      <button onClick={handleAddBtn} className={`absolute right-3 top-3 z-10`}>
        <IoMdAddCircleOutline />
      </button>
      <div
        className={`h-full max-h-full absolute top-0 left-0 rounded-xl flex max-w-full w-full`}
      >
        <Image height="h-full" width="w-full" path={bgUrl} />
      </div>

      <section
        className={`h-full w-full flex px-3 justify-end py-3 rounded-xl bg-black bg-opacity-50`}
      >
        <div className={`flex gap-y-4`}>
          <button onClick={handleListBtn} className={`flex gap-x-2 flex-row`}>
            <p className={`text-primaryLight font-semibold text-base`}>
              {category}
            </p>

            <IoEyeOutline />
          </button>
          <div>
            <p className={`text-lg font-semibold text-primaryLight`}>{value}</p>
            <p className={`text-primaryLight font-medium`}>
              <p className={`text-base `}>kg of C0</p>
              <p className={`text-xs leading-3`}>2</p>
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default TrackCategoryCard;
