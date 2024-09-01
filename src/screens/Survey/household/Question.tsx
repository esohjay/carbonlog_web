import Btn from "../../../components/Button";
import { useSurveyContext } from "../../../context/providers/survey";
import { useSurveyActions } from "../../../context/actions/survey";

export default function QuestionOne() {
  const { state } = useSurveyContext();
  const { survey } = state;
  const { updateSurvey } = useSurveyActions();
  return (
    <section>
      <p className={`font-semibold text-lg mb-3 text-mainColor`}>
        How many people are in your household?
      </p>
      <section className={`flex flex-col gap-y-4 py-5`}>
        <Btn
          variant={survey.survey.householdSize === 1 ? "light" : "black"}
          textSize={`text-xl`}
          text={"1"}
          onClick={() => updateSurvey({ householdSize: 1 })}
        />
        <Btn
          variant={survey.survey.householdSize === 2 ? "light" : "black"}
          textSize={`text-xl`}
          text={"2"}
          onClick={() => updateSurvey({ householdSize: 2 })}
        />
        <Btn
          variant={survey.survey.householdSize === 3 ? "light" : "black"}
          textSize={`text-xl`}
          text={"3"}
          onClick={() => updateSurvey({ householdSize: 3 })}
        />
        <Btn
          variant={survey.survey.householdSize === 4 ? "light" : "black"}
          textSize={`text-xl`}
          text={"4"}
          onClick={() => updateSurvey({ householdSize: 4 })}
        />
        <Btn
          variant={survey.survey.householdSize === 5 ? "light" : "black"}
          textSize={`text-xl`}
          text={"5"}
          onClick={() => updateSurvey({ householdSize: 5 })}
        />
      </section>
    </section>
  );
}
