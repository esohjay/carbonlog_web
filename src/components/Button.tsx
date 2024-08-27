import Spinner from "./Spinner";
import { IconType } from "react-icons";

type BtnProp = {
  text: string;
  variant?:
    | "fill"
    | "disabled"
    | "outline"
    | "outlineBorder"
    | "light"
    | "destructive";
  onClick?: () => void;
  mode?: "block" | "inline";
  padding?: string;
  isLoading?: boolean;
  textSize?: string;
  loaderText?: string;
  Icon?: IconType;
  disable?: boolean;
};

function Btn({
  text,
  variant = "fill",
  onClick = () => null,
  mode = "block",
  padding = "px-6 py-2",
  textSize = "text-sm",
  isLoading = false,
  loaderText = "",
  disable = false,
  Icon,
  ...props
}: BtnProp) {
  const fill = "text-white  bg-mainColor text-center rounded-md";
  const light = "text-mainColor  bg-altColor text-center rounded-md";
  const destructive = "text-white  bg-red-500 text-center rounded-md";
  const disabled = "text-white  bg-[#D7D3D1] text-center rounded-md";
  const outline = "text-mainColor bg-altColor text-center rounded-md";
  const outlineBorder =
    "text-mainColor bg-white border-2 border-mainColor text-center rounded-md";
  const block = `w-full flex items-center justify-center gap-x-2 ${padding}`;
  const inline = `inline-flex items-center justify-center gap-x-2 ${padding}`;
  return (
    <button
      {...props}
      disabled={disable}
      onClick={onClick}
      className={`${
        variant === "fill"
          ? fill
          : variant === "disabled"
          ? disabled
          : variant === "outline"
          ? outline
          : variant === "light"
          ? light
          : variant === "destructive"
          ? destructive
          : outlineBorder
      } ${
        mode === "block" ? block : inline
      } font-semibold uppercase ${textSize}`}
    >
      {Icon && <Icon className="text-sm " />}
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
