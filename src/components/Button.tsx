import Spinner from "./Spinner";
import { IconType } from "react-icons";

type BtnProp = {
  text: string;
  variant?: "fill" | "disabled" | "outline" | "outlineBorder";
  onClick?: () => void;
  mode?: "block" | "inline";
  padding?: string;
  isLoading?: boolean;
  loaderText?: string;
  Icon?: IconType;
};

function Btn({
  text,
  variant = "fill",
  onClick = () => null,
  mode = "block",
  padding = "px-6 py-2",
  isLoading = false,
  loaderText = "",
  Icon,
  ...props
}: BtnProp) {
  const fill = "text-white  bg-mainColor text-center rounded-md";
  const disabled = "text-white  bg-[#D7D3D1] text-center rounded-md";
  const outline = "text-mainColor bg-altColor text-center rounded-md";
  const outlineBorder =
    "text-mainColor bg-white border-2 border-mainColor text-center rounded-md";
  const block = `w-full flex items-center justify-center gap-x-2 ${padding}`;
  const inline = `inline-flex items-center justify-center gap-x-2 ${padding}`;
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${
        variant === "fill"
          ? fill
          : variant === "disabled"
          ? disabled
          : variant === "outline"
          ? outline
          : outlineBorder
      } ${mode === "block" ? block : inline} font-semibold uppercase text-sm`}
    >
      {Icon && <Icon className="text-sm text-mainColor" />}
      {isLoading ? (
        <span className="inline-flex items-center justify-center gap-x-2">
          <Spinner isFullWidth={loaderText ? false : true} />{" "}
          <p>{loaderText}</p>
        </span>
      ) : (
        text
      )}
    </button>
  );
}

export default Btn;
