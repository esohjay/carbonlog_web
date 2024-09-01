import Question from "./Question";
import QuestionLayout from "../../../components/QuestionLayout";
// import { useSurveyContext } from "../../../context/providers/survey";
import useSurveyNextPage from "../../../lib/useSurveyNextPage";
import { IoHomeOutline } from "react-icons/io5";

export default function Household() {
  //   const { state } = useSurveyContext();
  //   const { survey } = state;
  const nextScreen = useSurveyNextPage();
  return (
    <QuestionLayout
      color={"bg-blue-500"}
      section={"household"}
      Icon={IoHomeOutline}
      progress={`w-[${11.11}%] `}
      nextScreen={() => nextScreen("energy")}
      // disabled={survey && survey.survey.householdSize === 0}
    >
      <Question />
    </QuestionLayout>
  );
}
