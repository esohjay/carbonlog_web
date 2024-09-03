import Btn from "../../../components/Button";
import { useSurveyContext } from "../../../context/providers/survey";

import BikeQuestionForm from "../../../components/BikeQuestionForm";
import { useSurveyActions } from "../../../context/actions/survey";
import { generateId } from "../../../lib/helperFn";
import { IoAddCircleOutline, IoTrash } from "react-icons/io5";

export default function BikeQuestion({
  errMsg,
  setErrMsg,
}: {
  errMsg: string;
  setErrMsg: (arg: string) => void;
}) {
  const { updateSurvey, setBikeDetails } = useSurveyActions();
  const { state } = useSurveyContext();
  const { survey, bikeDetails } = state;

  const setSize = (size: string) => {
    setBikeDetails({ ...bikeDetails, size });
  };
  const setPeriod = (period: string) => {
    setBikeDetails({ ...bikeDetails, period });
  };
  const setValue = (value: string) => {
    setBikeDetails({ ...bikeDetails, value });
  };
  const setUnit = (unit: string) => {
    setBikeDetails({ ...bikeDetails, unit });
  };
  const addBikeList = () => {
    if (
      bikeDetails.period &&
      bikeDetails.size &&
      bikeDetails.value &&
      bikeDetails.unit
    ) {
      updateSurvey({
        bike: [...survey.survey.bike, { ...bikeDetails, id: generateId() }],
      });
      setBikeDetails({
        size: "",
        period: "",
        value: "",
        unit: "",
        id: "",
      });
      setErrMsg("");
    } else {
      setErrMsg("All field must be filled");
      return;
    }
  };
  const removeFromList = (id: string) => {
    const bikeList = survey.survey.bike.filter((bike) => bike.id !== id);
    updateSurvey({ bike: [...bikeList] });
  };
  return (
    <section>
      <p className={`font-semibold text-lg mb-3 text-mainColor`}>
        Describe your motorbike yealy usage
      </p>
      <section className={`flex flex-col gap-y-3 py-4 mb-3`}>
        {survey.survey.bike.map((bike, i) => (
          <article
            key={i}
            className={`flex gap-y-1 flex-row justify-between items-center gap-x-2   `}
          >
            <article>
              <p className={`font-semibold text-sm capitalize`}>
                {bike.size} size bike
              </p>
              <p className={`font-medium text-xs`}>
                {bike.value}
                {bike.unit} {bike.period}
              </p>
            </article>
            <button className={``} onClick={() => removeFromList(bike.id)}>
              <IoTrash name="trash" size={12} color="red" />
            </button>
          </article>
          // <article key={i} className={`flex gap-x-1 flex-row items-center pb-2`}>
          //   <Ionicons
          //     name="chevron-forward-outline"
          //     size={16}
          //     color="#7d4f50"
          //   />

          //   <p className={`font-medium text-sm capitalize`}>
          //     {bike.size} size motorbike - {bike.value}
          //     {bike.unit} {bike.period}
          //   </p>
          // </article>
        ))}

        <BikeQuestionForm
          setPeriod={setPeriod}
          setSize={setSize}
          setUnit={setUnit}
          setValue={setValue}
          value={bikeDetails.value}
          period={bikeDetails.period}
          unit={bikeDetails.unit}
          size={bikeDetails.size}
          allowPeriod={true}
        />
        <article className={`w-full flex flex-row justify-end py-4`}>
          <article className={` w-1/2`}>
            <Btn
              onClick={addBikeList}
              textSize={`text-[9px]`}
              text={"Add another"}
              Icon={IoAddCircleOutline}
            />
          </article>
        </article>
        <p className={`text-red-500 py-2 `}>{errMsg}</p>
      </section>
    </section>
  );
}
