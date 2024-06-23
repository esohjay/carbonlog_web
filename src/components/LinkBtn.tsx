import { Link } from "react-router-dom";

type LinkProp = {
  path: string;
  text: string;
  variant?: "fill" | "disabled" | "outline";
  padding?: string;
  mode?: "inline" | "block";
};
export default function LinkBtn({
  path,
  text,
  variant = "fill",
  mode = "block",
  padding = "px-6 py-2",
}: LinkProp) {
  const fill = "text-white  bg-mainColor text-center rounded-full";
  const disabled = "text-white  bg-[#D7D3D1] text-center rounded-full";
  const outline =
    "text-mainColor bg-white border-2 border-mainColor text-center rounded-full";
  const block = `w-full block ${padding}`;
  const inline = `inline-block ${padding}`;
  return (
    <Link
      className={`font-medium block  ${
        variant === "fill" ? fill : variant === "disabled" ? disabled : outline
      } ${mode === "block" ? block : inline}`}
      to={path}
    >
      {text}
    </Link>
  );
}
