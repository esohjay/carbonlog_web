import { useEffect, useState } from "react";
import Question from "./Question";
import QuestionLayout from "../../../components/QuestionLayout";
import { useSurveyContext } from "../../../context/providers/survey";
import useSurveyNextPage from "../../../lib/useSurveyNextPage";
import { useSurveyActions } from "../../../context/actions/survey";
import { CREATE_SURVEY_RESET } from "../../../context/constants/survey";
import { IoBusinessOutline } from "react-icons/io5";

export default function Services() {
  const { state, dispatch } = useSurveyContext();
  const { survey, surveySaved, loading } = state;
  const [error, setError] = useState("");
  const { createSurvey } = useSurveyActions();
  const nextScreen = useSurveyNextPage();
  const handleNextPage = () => {
    for (const key in survey.survey.servicesConsumption) {
      // Use type assertion to tell TypeScript that key is a key of the energy object
      const servicesConsumptionKey =
        key as keyof typeof survey.survey.servicesConsumption;
      if (
        (survey.survey.servicesConsumption[servicesConsumptionKey].value &&
          !survey.survey.servicesConsumption[servicesConsumptionKey].period) ||
        (!survey.survey.servicesConsumption[servicesConsumptionKey].value &&
          survey.survey.servicesConsumption[servicesConsumptionKey].period) ||
        typeof parseFloat(
          survey.survey.servicesConsumption[servicesConsumptionKey].value
        ) !== "number"
      ) {
        setError("Ensure amount and period are filled.");
        return;
      } else {
        setError("");
      }
    }
    createSurvey(survey.survey);
  };
  useEffect(() => {
    if (surveySaved) {
      dispatch({ type: CREATE_SURVEY_RESET });
      nextScreen(`estimate`, true);
    }
  }, [surveySaved]);
  return (
    <QuestionLayout
      color={"bg-green-500"}
      section={"Services"}
      Icon={IoBusinessOutline}
      progress={`100%`}
      nextScreen={handleNextPage}
      disabled={false}
      btnText={loading ? "Submitting" : "Submit survey"}
    >
      <Question />
      <p className={`text-red-500 py-2`}>{error}</p>
    </QuestionLayout>
  );
}
