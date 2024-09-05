import FlightQuestion from "./Question";
import QuestionLayout from "../../../components/QuestionLayout";
import useSurveyNextPage from "../../../lib/useSurveyNextPage";
import { IoAirplaneOutline } from "react-icons/io5";

export default function Flight() {
  const nextScreen = useSurveyNextPage();
  return (
    <QuestionLayout
      color={"bg-rose-500"}
      section={"flight"}
      Icon={IoAirplaneOutline}
      progress={`33.33%`}
      nextScreen={() => nextScreen("car")}
      disabled={false}
    >
      <FlightQuestion />
    </QuestionLayout>
  );
}
