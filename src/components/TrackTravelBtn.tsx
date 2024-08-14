import Btn from "./Button";

type PropType = {
  mode: string;
  currentMode: string;
  setMode: (mode: string) => void;
};
export default function TrackTravelBtn({
  mode,
  currentMode,
  setMode,
}: PropType) {
  return (
    <div>
      <Btn
        variant={currentMode === mode ? "light" : "fill"}
        text={mode}
        onClick={() => setMode(mode)}
        padding="px-3 py-1"
        textSize="text-xs"
      />
    </div>
  );
}
