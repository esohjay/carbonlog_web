import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-altColor text-mainColor text-sm shadow font-semibold px-2 py-1 rounded-md"
    >
      <span className="inline-flex gap-x-1 items-center">
        <IoArrowBack />
        <p>Back</p>
      </span>
    </button>
  );
}
