import { PublicTransportValueUnion } from "../../../types/survey";
import { useSurveyContext } from "../../../context/providers/survey";
import QuestionContainer from "./QuestionContainer";
import { useSurveyActions } from "../../../context/actions/survey";

export default function PublicTransportQuestion() {
  const { updateSurvey } = useSurveyActions();
  const { state } = useSurveyContext();
  const { survey } = state;
  const setPeriod = (field: PublicTransportValueUnion, period: string) => {
    updateSurvey({
      publicTransport: {
        ...survey.survey.publicTransport,
        [field]: {
          ...survey.survey.publicTransport[field],
          period,
        },
      },
    });
  };
  const setValue = (field: PublicTransportValueUnion, value: string) => {
    updateSurvey({
      publicTransport: {
        ...survey.survey.publicTransport,
        [field]: {
          ...survey.survey.publicTransport[field],
          value,
        },
      },
    });
  };
  const setUnit = (field: PublicTransportValueUnion, unit: string) => {
    updateSurvey({
      publicTransport: {
        ...survey.survey.publicTransport,
        [field]: {
          ...survey.survey.publicTransport[field],
          unit,
        },
      },
    });
  };
  return (
    <section>
      <p className={`font-semibold text-lg mb-3 py-2 text-mainColor`}>
        Which public transport do you use?{" "}
      </p>
      <QuestionContainer
        value={{
          bus: survey.survey?.publicTransport?.bus?.value,
          coach: survey.survey?.publicTransport?.coach?.value,
          train: survey.survey?.publicTransport?.train?.value,
        }}
        setUnit={setUnit}
        setValue={setValue}
        setPeriod={setPeriod}
        allowPeriod={true}
        dropdownPeriodValue={{
          bus: survey.survey?.publicTransport?.bus?.period,
          coach: survey.survey?.publicTransport?.coach?.period,
          train: survey.survey?.publicTransport?.train?.period,
        }}
        dropdownUnitValue={{
          bus: survey.survey?.publicTransport?.bus?.unit,
          coach: survey.survey?.publicTransport?.coach?.unit,
          train: survey.survey?.publicTransport?.train?.unit,
        }}
      />
    </section>
  );
}
