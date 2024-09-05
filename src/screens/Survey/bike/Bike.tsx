import { useState } from "react";
import BikeQuestion from "./Question";
import QuestionLayout from "../../../components/QuestionLayout";
import { useSurveyContext } from "../../../context/providers/survey";
import useSurveyNextPage from "../../../lib/useSurveyNextPage";
import { useSurveyActions } from "../../../context/actions/survey";
import { generateId } from "../../../lib/helperFn";
import { IoBicycleOutline } from "react-icons/io5";

export default function Bike() {
  const { updateSurvey, setBikeDetails } = useSurveyActions();
  const [errMsg, setErrMsg] = useState("");
  const { state } = useSurveyContext();
  const { survey, bikeDetails } = state;
  const nextScreen = useSurveyNextPage();
  const submitBikeQuestion = () => {
    if (
      bikeDetails.period &&
      bikeDetails.value &&
      bikeDetails.size &&
      bikeDetails.unit
    ) {
      updateSurvey({
        bike: [...survey.survey.bike, { ...bikeDetails, id: generateId() }],
      });
      setBikeDetails({
        size: "",
        value: "",
        period: "",
        unit: "",
        id: "",
      });
      setErrMsg("");
      nextScreen("public-transport");
    } else if (
      !bikeDetails.period &&
      !bikeDetails.value &&
      !bikeDetails.size &&
      !bikeDetails.unit
    ) {
      setErrMsg("");
      nextScreen("public-transport");
    } else {
      setErrMsg("All field must be filled");
      return;
    }
  };
  return (
    <QuestionLayout
      color={"bg-violet-500"}
      section={"motorbike"}
      Icon={IoBicycleOutline}
      progress={`55.55%`}
      nextScreen={submitBikeQuestion}
      disabled={false}
    >
      <BikeQuestion errMsg={errMsg} setErrMsg={setErrMsg} />
    </QuestionLayout>
  );
}
