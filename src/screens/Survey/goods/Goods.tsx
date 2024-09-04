import { useState } from "react";
import Question from "./Question";
import QuestionLayout from "../../../components/QuestionLayout";
import { useSurveyContext } from "../../../context/providers/survey";
import useSurveyNextPage from "../../../lib/useSurveyNextPage";
import { IoCartOutline } from "react-icons/io5";

export default function Goods() {
  const [error, setError] = useState("");
  const { state } = useSurveyContext();
  const { survey } = state;
  const nextScreen = useSurveyNextPage();
  const handleNextPage = () => {
    for (const key in survey.survey.goodsConsumption) {
      // Use type assertion to tell TypeScript that key is a key of the energy object
      const goodsConsumptionKey =
        key as keyof typeof survey.survey.goodsConsumption;
      if (
        (survey.survey.goodsConsumption[goodsConsumptionKey].value &&
          !survey.survey.goodsConsumption[goodsConsumptionKey].period) ||
        (!survey.survey.goodsConsumption[goodsConsumptionKey].value &&
          survey.survey.goodsConsumption[goodsConsumptionKey].period)
      ) {
        setError("Ensure amount and period are filled.");
        return;
      } else {
        setError("");
      }
    }
    nextScreen("Services");
  };
  return (
    <QuestionLayout
      color={"bg-sky-500"}
      section={"Goods consumption"}
      Icon={IoCartOutline}
      progress={`w-[${88.88}%]`}
      nextScreen={handleNextPage}
      disabled={false}
    >
      <Question />
      <p className={`text-red-500 py-2`}>{error}</p>
    </QuestionLayout>
  );
}
