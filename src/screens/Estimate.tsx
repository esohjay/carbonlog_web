import { useEffect, useState } from "react";
import Image from "../components/Image";
import Btn from "../components/Button";
import { calculatePercentageDifference } from "../lib/footprintPercentDiff";
import useGetSurvey from "../lib/useGetSurvey";
import { IoCreate } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "react-apexcharts";

type CategoryData = {
  value: number;
  name: string;
  text: string;
  color: string;
  percentage: number;
};

type ChartState = {
  value: number[];
  label: string[];
  color: string[];

  series: number[];
};

function EstimateScreen() {
  const { survey } = useGetSurvey();
  const [surveyCategory, setSurveyCategory] = useState<CategoryData[]>([]);
  const [chartState, setChartState] = useState<ChartState | null>(null);

  const [percentageDifference, setPercentageDifference] = useState({
    uk: "",
    world: "",
  });
  const colors = ["#177AD5", "#136f63", "#582f0e", "#ED6665"];

  const ukAverageEmission = 10;
  const worldAverageEmission = 4.76;

  const navigate = useNavigate();
  const { userId } = useParams();

  //   const chartState = {
  //     options: {},
  //     series: [44, 55, 41, 17, 15],
  //     labels: ["A", "B", "C", "D", "E"],
  //   };
  useEffect(() => {
    if (survey) {
      let categoryData = [];
      let categoryValueArray = [];
      let index = 0;
      for (const [category, categoryValue] of Object.entries(
        survey.emissionCategory
      )) {
        const percent = ((categoryValue / survey.totalEmission) * 100).toFixed(
          1
        );
        const value = (categoryValue / 1000).toFixed(2);
        categoryData.push({
          value: parseFloat(value),
          name: category,
          text: `${percent}%`,
          percentage: parseFloat(percent),
          color: colors[index],
        });
        categoryValueArray.push(value);
        index++;
      }
      //   setSurveyCategoryValueArray(categoryValueArray)
      setSurveyCategory(categoryData);
      setPercentageDifference({
        uk: calculatePercentageDifference(
          ukAverageEmission,
          survey.totalEmission / 1000
        ),
        world: calculatePercentageDifference(
          worldAverageEmission,
          survey.totalEmission / 1000
        ),
      });
    }
  }, [survey]);

  useEffect(() => {
    if (surveyCategory) {
      const label = surveyCategory.map((survey) => survey.name);
      const value = surveyCategory.map((survey) => survey.value);
      const series = surveyCategory.map((survey) => survey.percentage);
      const color = surveyCategory.map((_, i) => colors[i]);

      setChartState({ value, label, series, color });
    }
  }, [surveyCategory]);
  console.log(chartState);
  return (
    <section className={`py-3 w-full flex flex-col gap-5 items-center`}>
      {chartState && (
        <Chart
          options={{
            labels: chartState.label,
            colors: chartState.color,
            legend: { position: "bottom" },
            dataLabels: {
              enabled: false,
              background: {
                borderWidth: 0,
                borderColor: "transparent",
              },
            },
          }}
          series={chartState.series}
          type="donut"
          width="100%"
        />
      )}
      <article>
        <p className="font-semibold text-mainColor text-lg lg:text-xl">
          Your estimated carbon emission is
        </p>
        <p className={`text-dark text-center font-bold text-xl lg:text-3xl `}>
          {(survey?.totalEmission / 1000).toFixed(2)} tonnes
        </p>
      </article>
      <article className={`grid grid-cols-2 py-5 gap-x-3`}>
        <article className={`flex flex-col rounded-lg bg-[#EDE4F1] px-3 py-2`}>
          <p className={`text-[#51315E] text-sm lg:text-base font-bold`}>
            {percentageDifference.uk}
          </p>
          <p className={`text-[#51315E] font-semibold text-xs`}>
            than British average
          </p>
        </article>
        <article className={`flex flex-col  rounded-lg bg-[#D6F8FF] px-3 py-2`}>
          <p className={`text-[#004452] text-sm lg:text-base  font-bold`}>
            {percentageDifference.world}
          </p>
          <p className={`text-[#004452] font-semibold text-xs`}>
            than Global average
          </p>
        </article>
      </article>
      <article className={`flex flex-row gap-4 flex-wrap w-full`}>
        {chartState &&
          chartState.value.length > 0 &&
          chartState.value.map((item, i) => (
            <article
              key={i}
              style={{ backgroundColor: chartState.color[i] }}
              className={`shadow  h-40 w-[47%] flex flex-col px-5 justify-end py-3 rounded-xl relative`}
            >
              <p
                className={`text-primaryLight capitalize font-extrabold md:text-lg`}
              >
                {chartState.label[i]}
              </p>
              <p className={`text-sm md:text-base font-bold text-primaryLight`}>
                {item} tonnes
              </p>
              <article className={`flex gap-y-2 mt-4`}>
                <article>
                  <p className={`text-sm font-bold text-primaryLight`}>
                    {chartState.series[i]}%
                  </p>
                  <span
                    className={`text-primaryLight flex items-end font-semibold`}
                  >
                    <p className={`text-sm `}>of overall C0</p>
                    <p className={`text-xs leading-3`}>2</p>
                  </span>
                </article>
              </article>
            </article>
          ))}
      </article>
      <section className={`py-3 w-full md:w-3/4 flex justify-center`}>
        <article className={`w-full h-20 rounded-lg relative bg-white shadow`}>
          <Image
            width="w-full"
            height="h-full"
            path="https://cdn.pixabay.com/photo/2020/07/24/01/26/e-scooter-5432641_1280.jpg"
            borderRadius="rounded-md"
          />
          <article
            className={`h-full w-full flex justify-between items-center absolute left-0 top-0 p-3 rounded-lg bg-black bg-opacity-60`}
          >
            <p className={`text-primaryLight font-bold text-sm md:text-base `}>
              Update survey
            </p>

            <Btn
              text={"Update"}
              Icon={IoCreate}
              variant="light"
              mode="inline"
              padding="px-4 py-2"
              onClick={() => navigate(`/${userId}/survey`)}
            />
          </article>
        </article>
      </section>
    </section>
  );
}

export default EstimateScreen;
