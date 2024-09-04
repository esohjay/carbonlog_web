import Question from "./Question";
import QuestionLayout from "../../../components/QuestionLayout";
import { useSurveyContext } from "../../../context/providers/survey";
import useSurveyNextPage from "../../../lib/useSurveyNextPage";

import { IoFastFoodOutline } from "react-icons/io5";

export default function Diet() {
  const { state } = useSurveyContext();
  const { survey } = state;
  const nextScreen = useSurveyNextPage();
  return (
    <QuestionLayout
      color={"bg-fuchsia-500"}
      section={"diet"}
      Icon={IoFastFoodOutline}
      progress={`w-[${77.77}%]`}
      nextScreen={() => nextScreen("goods")}
      disabled={survey.survey.diet === ""}
    >
      <Question />
    </QuestionLayout>
  );
}
