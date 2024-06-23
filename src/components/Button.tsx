import Spinner from "./Spinner";

type BtnProp = {
  text: string;
  variant: "fill" | "disabled" | "outline";
  onClick: () => void;
  mode: "block" | "inline";
  padding: string;
  isLoading: boolean;
  loaderText?: string;
};

function Btn({
  text,
  variant = "fill",
  onClick = () => null,
  mode = "block",
  padding = "px-6 py-2",
  isLoading = false,
  loaderText = "",
  ...props
}: BtnProp) {
  const fill = "text-white  bg-mainColor text-center rounded-full";
  const disabled = "text-white  bg-[#D7D3D1] text-center rounded-full";
  const outline =
    "text-mainColor bg-white border-2 border-mainColor text-center rounded-full";
  const block = `w-full block ${padding}`;
  const inline = `inline-block ${padding}`;
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${
        variant === "fill" ? fill : variant === "disabled" ? disabled : outline
      } ${mode === "block" ? block : inline}`}
    >
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
