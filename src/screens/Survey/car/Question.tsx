import Btn from "../../../components/Button";
import { useSurveyContext } from "../../../context/providers/survey";
import CarQuestionForm from "../../../components/CarQuestionForm";
import { useSurveyActions } from "../../../context/actions/survey";
import { generateId } from "../../../lib/helperFn";
import { IoAddCircleOutline, IoTrash } from "react-icons/io5";

export default function CarQuestion({
  errMsg,
  setErrMsg,
}: {
  errMsg: string;
  setErrMsg: (arg: string) => void;
}) {
  const { updateSurvey, setCarDetails } = useSurveyActions();
  const { state } = useSurveyContext();
  const { survey, carDetails: carDetail } = state;
  const removeFromList = (id: string) => {
    const carList = survey.survey.car.filter((car) => car.id !== id);
    updateSurvey({ car: [...carList] });
  };
  const setSize = (size: string) => {
    setCarDetails({ ...carDetail, size });
  };
  const setPeriod = (period: string) => {
    setCarDetails({ ...carDetail, period });
  };
  const setFuelType = (fuelType: string) => {
    setCarDetails({ ...carDetail, fuelType });
  };
  const setValue = (value: string) => {
    setCarDetails({ ...carDetail, value });
  };
  const setUnit = (unit: string) => {
    setCarDetails({ ...carDetail, unit });
  };
  const addCarList = () => {
    if (
      carDetail.fuelType &&
      carDetail.size &&
      carDetail.value &&
      carDetail.unit &&
      carDetail.period
    ) {
      updateSurvey({
        car: [...survey.survey.car, { ...carDetail, id: generateId() }],
      });
      setCarDetails({
        size: "",
        fuelType: "",
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
  return (
    <section>
      <p className={`font-semibold text-lg mb-3 text-mainColor`}>
        Describe your car yealy usage
      </p>
      <article className={`flex flex-col gap-y-3 py-4 mb-5`}>
        {survey.survey.car.map((car, i) => (
          <article
            key={i}
            className={`flex gap-y-1 flex-row justify-between items-center gap-x-2   `}
          >
            <article>
              <p className={`font-semibold text-sm capitalize`}>
                {car.size} size car ({car.fuelType})
              </p>
              <p className={`font-medium text-xs`}>
                {car.value}
                {car.unit} {car.period}
              </p>
            </article>
            <button className={``} onClick={() => removeFromList(car.id)}>
              <IoTrash name="trash" size={12} color="red" />
            </button>
          </article>
        ))}
        <CarQuestionForm
          setFuelType={setFuelType}
          setPeriod={setPeriod}
          setSize={setSize}
          setUnit={setUnit}
          setValue={setValue}
          value={carDetail.value}
          period={carDetail.period}
          unit={carDetail.unit}
          fuelType={carDetail.fuelType}
          size={carDetail.size}
          allowPeriod={true}
        />

        <article className={`w-full flex flex-row justify-end py-4`}>
          <article className={` w-1/2`}>
            <Btn
              onClick={addCarList}
              textSize={`text-[9px]`}
              text={"Add another"}
              Icon={IoAddCircleOutline}
            />
          </article>
        </article>
        <p className={`text-red-500 py-2 `}>{errMsg}</p>
      </article>
    </section>
  );
}
