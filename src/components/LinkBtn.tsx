import { Link } from "react-router-dom";
import { IconType } from "react-icons";

type LinkProp = {
  path: string;
  text: string;
  variant?: "fill" | "disabled" | "outline" | "outlineBorder";
  padding?: string;
  mode?: "inline" | "block";
  Icon?: IconType;
};
export default function LinkBtn({
  path,
  text,
  variant = "fill",
  mode = "block",
  padding = "px-6 py-2",
  Icon,
}: LinkProp) {
  const fill = "text-white  bg-mainColor text-center rounded-full";
  const disabled = "text-white  bg-[#D7D3D1] text-center rounded-full";
  const outline = "text-mainColor bg-altColor text-center rounded-md";
  const outlineBorder =
    "text-mainColor bg-white border-2 border-mainColor text-center rounded-md";
  const block = `w-full block flex items-center justify-center gap-x-2  ${padding}`;
  const inline = `inline-block flex items-center justify-center gap-x-2  ${padding}`;
  return (
    <Link
      className={`font-medium block  ${
        variant === "fill"
          ? fill
          : variant === "disabled"
          ? disabled
          : variant === "outline"
          ? outline
          : outlineBorder
      } ${mode === "block" ? block : inline}`}
      to={path}
    >
      {text}
      {Icon && <Icon className="text-sm text-mainColor" />}
    </Link>
  );
}
