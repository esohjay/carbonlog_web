import { useState } from "react";
import EnergyQuestion from "./Question";
import QuestionLayout from "../../../components/QuestionLayout";
import { useSurveyContext } from "../../../context/providers/survey";
import useSurveyNextPage from "../../../lib/useSurveyNextPage";
import { IoFlashOutline } from "react-icons/io5";

export default function Energy() {
  const [error, setError] = useState("");
  const { state } = useSurveyContext();
  const { survey } = state;
  const nextScreen = useSurveyNextPage();
  const handleNextPage = () => {
    for (const key in survey.survey.energy) {
      // Use type assertion to tell TypeScript that key is a key of the energy object
      const energyKey = key as keyof typeof survey.survey.energy;
      if (
        (survey.survey.energy[energyKey].value &&
          !survey.survey.energy[energyKey].unit) ||
        (!survey.survey.energy[energyKey].value &&
          survey.survey.energy[energyKey].unit) ||
        typeof parseFloat(survey.survey.energy[energyKey].value) !== "number"
      ) {
        setError("Ensure both value and unit are filled correctly.");
        return;
      } else {
        setError("");
      }
    }
    nextScreen("flight");
  };
  return (
    <QuestionLayout
      color={"bg-yellow-500"}
      section={"energy"}
      Icon={IoFlashOutline}
      progress={`22.22%`}
      nextScreen={handleNextPage}
      disabled={false}
    >
      <EnergyQuestion />
      <p className={`text-red-500 py-2`}>{error}</p>
    </QuestionLayout>
  );
}
