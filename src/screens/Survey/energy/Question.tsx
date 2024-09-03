import { useSurveyContext } from "../../../context/providers/survey";
import QuestionField from "./QuestionField";
import { useSurveyActions } from "../../../context/actions/survey";
import { EnergyValueUnion } from "../../../types/survey";

export default function EnergyQuestion() {
  const { state } = useSurveyContext();
  const { survey } = state;
  const { updateSurvey } = useSurveyActions();
  const setUnit = (field: EnergyValueUnion, unit: string) => {
    updateSurvey({
      energy: {
        ...survey.survey.energy,
        [field]: {
          ...survey.survey.energy[field],
          unit,
        },
      },
    });
  };
  const setValue = (field: EnergyValueUnion, value: string) => {
    updateSurvey({
      energy: {
        ...survey.survey.energy,
        [field]: {
          ...survey.survey.energy[field],
          value,
        },
      },
    });
  };

  return (
    <section>
      <p className={`font-semibold text-lg mb-3 text-mainColor`}>
        Enter your consumption of each of the following
      </p>
      <section className={`flex flex-col gap-y-4 py-5`}>
        {/* Electricity */}
        <QuestionField
          label={"Electricity"}
          field={"electricity"}
          setUnit={setUnit}
          setValue={setValue}
          dropdownOptions={[
            { label: "Unit", value: "" },
            { label: "kWh", value: "kWh" },
          ]}
          dropdownValue={survey.survey?.energy?.electricity?.unit}
          inputValue={survey.survey?.energy?.electricity?.value}
        />

        {/* Gas */}
        <QuestionField
          label={"Gas"}
          field={"gas"}
          setUnit={setUnit}
          setValue={setValue}
          dropdownOptions={[
            { label: "Unit", value: "" },
            { label: "kWh", value: "kWh" },
            { label: "Cubic meter", value: "cubicMeter" },
            { label: "Tonne", value: "tonne" },
          ]}
          dropdownValue={survey.survey?.energy?.gas?.unit}
          inputValue={survey.survey?.energy?.gas?.value}
        />

        {/* Coal */}
        <QuestionField
          label={"Coal"}
          field={"coal"}
          setUnit={setUnit}
          setValue={setValue}
          dropdownOptions={[
            { label: "Unit", value: "" },
            { label: "kWh", value: "kWh" },
            { label: "Tonne", value: "tonne" },
          ]}
          dropdownValue={survey.survey?.energy?.coal?.unit}
          inputValue={survey.survey?.energy?.coal?.value}
        />

        {/* Lpg */}
        <QuestionField
          label={"LPG"}
          field={"lpg"}
          setUnit={setUnit}
          setValue={setValue}
          dropdownOptions={[
            { label: "Unit", value: "" },
            { label: "Litre", value: "litre" },
            { label: "Tonne", value: "tonne" },
          ]}
          dropdownValue={survey.survey?.energy?.lpg?.unit}
          inputValue={survey.survey?.energy?.lpg?.value}
        />

        {/* Propane */}
        <QuestionField
          label={"Propane"}
          field={"propane"}
          setUnit={setUnit}
          setValue={setValue}
          dropdownOptions={[
            { label: "Unit", value: "" },
            { label: "Litre", value: "litre" },
            { label: "Tonne", value: "tonne" },
            { label: "kWh", value: "kWh" },
          ]}
          dropdownValue={survey.survey?.energy?.propane?.unit}
          inputValue={survey.survey?.energy?.propane?.value}
        />

        {/* Wood */}
        <QuestionField
          label={"Wood"}
          field={"wood"}
          setUnit={setUnit}
          setValue={setValue}
          dropdownOptions={[
            { label: "Unit", value: "" },
            { label: "Tonne", value: "tonne" },
            { label: "kWh", value: "kWh" },
          ]}
          dropdownValue={survey.survey?.energy?.wood?.unit}
          inputValue={survey.survey?.energy?.wood?.value}
        />
      </section>
    </section>
  );
}
