import { ServicesConsumptionUnion } from "../../../types/survey";
import { useSurveyContext } from "../../../context/providers/survey";
import QuestionField from "./QuestionField";
import { useSurveyActions } from "../../../context/actions/survey";

export default function ServicesQuestion() {
  const { updateSurvey } = useSurveyActions();
  const { state } = useSurveyContext();
  const { survey } = state;
  const setPeriod = (field: ServicesConsumptionUnion, period: string) => {
    updateSurvey({
      servicesConsumption: {
        ...survey.survey.servicesConsumption,
        [field]: {
          ...survey.survey.servicesConsumption[field],
          period,
        },
      },
    });
  };
  const setValue = (field: ServicesConsumptionUnion, value: string) => {
    updateSurvey({
      servicesConsumption: {
        ...survey.survey.servicesConsumption,
        [field]: {
          ...survey.survey.servicesConsumption[field],
          value,
        },
      },
    });
  };

  return (
    <section>
      <p className={`font-semibold text-lg mb-3 py-2 text-mainColor`}>
        How much do you/your household spend on average on each of the following
        services over a month/year?
      </p>
      <section className={`flex flex-col gap-y-3`}>
        {/* medicalServices */}
        <QuestionField
          label={"Medical service (£)"}
          field={"medicalServices"}
          setPeriod={setPeriod}
          setValue={setValue}
          dropdownValue={
            survey.survey?.servicesConsumption?.medicalServices?.period
          }
          inputValue={
            survey.survey?.servicesConsumption?.medicalServices?.value
          }
        />
        {/* education */}
        <QuestionField
          label={"Education (£)"}
          field={"education"}
          setPeriod={setPeriod}
          setValue={setValue}
          dropdownValue={survey.survey?.servicesConsumption?.education?.period}
          inputValue={survey.survey?.servicesConsumption?.education?.value}
        />

        {/* veterinaryServices */}
        <QuestionField
          label={"Veterinary Services (£)"}
          field={"veterinaryServices"}
          setPeriod={setPeriod}
          setValue={setValue}
          dropdownValue={
            survey.survey?.servicesConsumption?.veterinaryServices?.period
          }
          inputValue={
            survey.survey?.servicesConsumption?.veterinaryServices?.value
          }
        />
        {/* financialServices */}
        <QuestionField
          label={"Financial Services (£)"}
          field={"financialServices"}
          setPeriod={setPeriod}
          setValue={setValue}
          dropdownValue={
            survey.survey?.servicesConsumption?.financialServices?.period
          }
          inputValue={
            survey.survey?.servicesConsumption?.financialServices?.value
          }
        />
        {/* salonAndGrooming */}
        <QuestionField
          label={"Salon and grooming (£)"}
          field={"salonAndGrooming"}
          setPeriod={setPeriod}
          setValue={setValue}
          dropdownValue={
            survey.survey?.servicesConsumption?.salonAndGrooming?.period
          }
          inputValue={
            survey.survey?.servicesConsumption?.salonAndGrooming?.value
          }
        />
      </section>
    </section>
  );
}
