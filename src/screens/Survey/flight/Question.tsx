import { useSurveyContext } from "../../../context/providers/survey";
import QuestionContainer from "./QuestionContainer";
import { useSurveyActions } from "../../../context/actions/survey";

export default function FlightQuestion() {
  const { state } = useSurveyContext();
  const { survey } = state;
  const { updateSurvey } = useSurveyActions();
  const setValue = (field: string, value: string) => {
    updateSurvey({
      flight: {
        ...survey.survey.flight,
        [field]: value,
      },
    });
  };
  return (
    <section className={``}>
      <p className={`font-semibold text-lg mb-3 text-mainColor`}>
        How many flight do you take yearly
      </p>
      <QuestionContainer
        setValue={setValue}
        flight={{
          domestic: survey.survey?.flight?.domestic,
          shortHaul: survey.survey?.flight?.shortHaul,
          longHaul: survey.survey?.flight?.longHaul,
        }}
      />
    </section>
  );
}
