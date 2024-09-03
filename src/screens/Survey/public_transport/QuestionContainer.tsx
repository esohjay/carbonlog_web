import QuestionField from "./QuestionField";
import { PublicTransportValueUnion } from "../../../types/survey";

type PropType = {
  setValue: (arg1: PublicTransportValueUnion, arg2: string) => void;
  value: { bus: string; coach: string; train: string };
  setUnit: (arg1: PublicTransportValueUnion, arg2: string) => void;
  dropdownPeriodValue: { bus: string; coach: string; train: string };
  setPeriod: (arg1: PublicTransportValueUnion, arg2: string) => void;
  dropdownUnitValue: { bus: string; coach: string; train: string };
  allowPeriod: boolean;
};
export default function QuestionContainer({
  value,
  setPeriod,
  setUnit,
  setValue,
  allowPeriod,
  dropdownPeriodValue,
  dropdownUnitValue,
}: PropType) {
  return (
    <section className={`flex flex-col gap-y-3`}>
      {/* Bus */}

      <QuestionField
        label={"Bus"}
        field={"bus"}
        value={value.bus}
        setUnit={setUnit}
        setValue={setValue}
        setPeriod={setPeriod}
        allowPeriod={allowPeriod}
        dropdownPeriodValue={dropdownPeriodValue.bus}
        dropdownUnitValue={dropdownUnitValue.bus}
      />
      {/* Coach */}
      <QuestionField
        label={"Coach"}
        field={"coach"}
        value={value.coach}
        setUnit={setUnit}
        setValue={setValue}
        setPeriod={setPeriod}
        allowPeriod={allowPeriod}
        dropdownPeriodValue={dropdownPeriodValue.coach}
        dropdownUnitValue={dropdownUnitValue.coach}
      />

      {/* Train */}
      <QuestionField
        label={"Train"}
        field={"train"}
        value={value.train}
        setUnit={setUnit}
        setValue={setValue}
        setPeriod={setPeriod}
        allowPeriod={allowPeriod}
        dropdownPeriodValue={dropdownPeriodValue.train}
        dropdownUnitValue={dropdownUnitValue.train}
      />
    </section>
  );
}
