import { useState } from "react";
import PublicTransportQuestion from "./Question";
import QuestionLayout from "../../../components/QuestionLayout";
import useSurveyNextPage from "../../../lib/useSurveyNextPage";
import { useSurveyContext } from "../../../context/providers/survey";
import { IoTrainOutline } from "react-icons/io5";

export default function PublicTransport() {
  const { state } = useSurveyContext();
  const { survey } = state;
  const [error, setError] = useState("");
  const nextScreen = useSurveyNextPage();
  const handleNextPage = () => {
    for (const key in survey.survey.publicTransport) {
      // Use type assertion to tell TypeScript that key is a key of the energy object
      const publicTransportKey =
        key as keyof typeof survey.survey.publicTransport;
      if (
        (survey.survey.publicTransport[publicTransportKey].value &&
          (!survey.survey.publicTransport[publicTransportKey].unit ||
            !survey.survey.publicTransport[publicTransportKey].period)) ||
        ((survey.survey.publicTransport[publicTransportKey].unit ||
          survey.survey.publicTransport[publicTransportKey].period) &&
          !survey.survey.publicTransport[publicTransportKey].value)
      ) {
        setError("Ensure distance, unit and period are filled.");
        return;
      } else {
        setError("");
      }
    }
    nextScreen("diet");
  };
  return (
    <QuestionLayout
      color={"bg-lime-500"}
      section={"Public Transport"}
      Icon={IoTrainOutline}
      progress={`w-[${66.66}%]`}
      nextScreen={handleNextPage}
      disabled={false}
    >
      <PublicTransportQuestion />
      <p className={`text-red-500 py-2`}>{error}</p>
    </QuestionLayout>
  );
}
