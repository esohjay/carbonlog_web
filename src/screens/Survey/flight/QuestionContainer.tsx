import QuestionField from "./QuestionField";

type PropType = {
  setValue: (arg1: string, arg2: string) => void;
  flight: { domestic: string; shortHaul: string; longHaul: string };
};

export default function QuestionContainer({ setValue, flight }: PropType) {
  return (
    <section className={`flex flex-col gap-y-3 py-4 mb-3`}>
      {/* Domestic */}
      <QuestionField
        value={flight.domestic}
        label={"Domestic (~1 hour)"}
        field={"domestic"}
        setValue={setValue}
      />
      {/* shortHaul */}
      <QuestionField
        value={flight.shortHaul}
        label={"Short haul (~2 hours)"}
        field={"shortHaul"}
        setValue={setValue}
      />
      {/* longHaul */}
      <QuestionField
        value={flight.longHaul}
        label={"Long haul (8+ hours)"}
        field={"longHaul"}
        setValue={setValue}
      />
    </section>
  );
}
