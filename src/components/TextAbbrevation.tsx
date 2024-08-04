type PropType = {
  text: string;
  size?: string;
  textSize?: string;
};

export default function TextAbbrevavtion({ text, size, textSize }: PropType) {
  const splitTitle = text?.trim().split(" ");
  const abbrev =
    splitTitle?.length > 1
      ? `${splitTitle[0].charAt(0)}${splitTitle[1].charAt(0)}`
      : `${splitTitle[0].charAt(0)}${splitTitle[0].charAt(1)}`;
  const badgeSize = size || `w-14 h-14`;
  const badgeText = textSize || `text-2xl`;
  return (
    <div
      className={`rounded-full flex justify-center items-center bg-transparent bg-dark ${badgeSize}`}
    >
      <p className={`font-extrabold uppercase text-primaryLight ${badgeText}`}>
        {abbrev}
      </p>
    </div>
  );
}
