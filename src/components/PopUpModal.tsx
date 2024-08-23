import { FaTimes } from "react-icons/fa";

type PropType = {
  controlModal: (arg: boolean) => void;
  heading: string;
  text: string;
  show: boolean;
  onConfirm: () => void;
};

function PopUpModal({
  controlModal,
  heading,
  text,
  show,
  onConfirm,
}: PropType) {
  return (
    <>
      <div
        className={`${
          show ? "grid" : "hidden"
        } fixed top-0 left-0 w-full z-[53] h-screen px-5  bg-black grid place-items-center bg-opacity-50 backdrop-blur-sm backdrop-filter`}
      >
        <div
          className="bg-white w-full  p-10 max-w-3xl mx-auto rounded-md flex flex-col justify-center relative
    "
        >
          <FaTimes
            className="absolute top-3 right-3 text-red-500 text-lg cursor-pointer"
            onClick={() => controlModal(false)}
          />
          <h3 className="font-bold capitalize text-center text-extrabold text-dark text-2xl md:text-4xl mb-3">
            {heading}
          </h3>
          <p className="font-semibold text-mainColor text-center md:text-2xl mb-8">
            {text}
          </p>
          <div className="flex items-center gap-2 w-full justify-center ">
            <button
              onClick={onConfirm}
              className="block bg-mainColor px-5 py-3 text-white rounded-md font-semibold"
            >
              OK
            </button>
            <button
              onClick={() => controlModal(false)}
              className="block bg-altColor px-5 py-3 text-mainColor rounded-md font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopUpModal;
