import { useState } from "react";
import CarQuestion from "./Question";
import QuestionLayout from "../../../components/QuestionLayout";
import { useSurveyContext } from "../../../context/providers/survey";
import useSurveyNextPage from "../../../lib/useSurveyNextPage";
import { useSurveyActions } from "../../../context/actions/survey";
import { generateId } from "../../../lib/helperFn";
import { IoCarSportOutline } from "react-icons/io5";

export default function Car() {
  const { updateSurvey, setCarDetails } = useSurveyActions();
  const [errMsg, setErrMsg] = useState("");
  const { state } = useSurveyContext();
  const { survey, carDetails } = state;
  const nextScreen = useSurveyNextPage();
  const submitCarQuestion = () => {
    if (
      carDetails.fuelType &&
      carDetails.value &&
      carDetails.size &&
      carDetails.unit &&
      carDetails.period
    ) {
      updateSurvey({
        car: [...survey.survey.car, { ...carDetails, id: generateId() }],
      });
      setCarDetails({
        size: "",
        fuelType: "",
        value: "",
        period: "",
        unit: "",
        id: "",
      });
      setErrMsg("");
      nextScreen("Bike");
    } else if (
      !carDetails.value &&
      !carDetails.fuelType &&
      !carDetails.size &&
      !carDetails.unit &&
      !carDetails.period
    ) {
      setErrMsg("");
      nextScreen("bike");
    } else {
      setErrMsg("All field must be filled");
      return;
    }
  };
  return (
    <QuestionLayout
      color={"bg-cyan-500"}
      section={"car"}
      Icon={IoCarSportOutline}
      progress={`44.44%`}
      nextScreen={submitCarQuestion}
      disabled={false}
    >
      <CarQuestion errMsg={errMsg} setErrMsg={setErrMsg} />
    </QuestionLayout>
  );
}
