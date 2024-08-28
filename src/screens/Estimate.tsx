import { useEffect, useState } from "react";
import Image from "../components/Image";
import Btn from "../components/Button";
import { calculatePercentageDifference } from "../lib/footprintPercentDiff";
import useGetSurvey from "../lib/useGetSurvey";
import { IoCreate } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import { EmissionCategoryType } from "../types/survey";

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
  bgColors: string[];
  series: number[];
};

function EstimateScreen() {
  const { survey, loadingState } = useGetSurvey();
  const [surveyCategory, setSurveyCategory] = useState<CategoryData[]>([]);
  const [chartState, setChartState] = useState<ChartState | null>(null);

  const [percentageDifference, setPercentageDifference] = useState({
    uk: "",
    world: "",
  });
  const colors = ["#177AD5", "#136f63", "#582f0e", "#ED6665"];
  const bgColors = [
    "bg-fuchsia-500",
    "bg-rose-500",
    "bg-sky-500",
    "bg-green-500",
  ];
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
      const bgColor = surveyCategory.map((_, i) => bgColors[i]);
      setChartState({ value, label, series, color, bgColors: bgColor });
    }
  }, [surveyCategory]);
  console.log(chartState);
  return (
    <section className={`bg-gray-50`}>
      <section className={`p-5 w-full flex flex-col items-center`}>
        {chartState && (
          <Chart
            options={{ labels: chartState.label, colors: chartState.color }}
            series={chartState.series}
            type="donut"
            width="380"
          />
        )}
        {/* <article>
          <PieChart
            donut
            data={surveyCategory}
            radius={120}
            // showText
            // textColor="black"
            // textSize={10}
            // showTextBackground
            // textBackgroundRadius={20}
            innerRadius={87}
            innerCircleColor={"#FFF7F2"}
            centerLabelComponent={() => {
              return (
                <ChartCenter
                  value={(survey?.totalEmission / 1000).toFixed(2)}
                />
              );
            }}
          />
        </article> */}
        <article className={`flex flex-row py-5 gap-x-3`}>
          <article
            className={`flex items-center w-[45%] rounded-lg bg-[#EDE4F1] px-3 py-2`}
          >
            <p className={`text-[#51315E] text-base font-bold`}>
              {percentageDifference.uk}
            </p>
            <p className={`text-[#51315E] font-semibold text-xs`}>
              than British average
            </p>
          </article>
          <article
            className={`flex items-center w-[45%] rounded-lg bg-[#D6F8FF] px-3 py-2`}
          >
            <p className={`text-[#004452] text-base font-bold`}>
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
                className={`shadow ${chartState.bgColors[i]} h-40 w-[47%] flex px-5 justify-end py-3 rounded-xl relative`}
              >
                <p
                  className={`text-primaryLight capitalize font-extrabold text-lg`}
                >
                  {chartState.label[i]}
                </p>
                <p className={`text-base font-bold text-primaryLight`}>
                  {item} tonnes
                </p>
                <article className={`flex gap-y-2 mt-4`}>
                  <article>
                    <p className={`text-sm font-bold text-primaryLight`}>
                      {chartState.series[i]}
                    </p>
                    <span
                      className={`text-primaryLight flex items-start font-semibold`}
                    >
                      <p className={`text-sm `}>of overall C0</p>
                      <p className={`text-xs leading-3`}>2</p>
                    </span>
                  </article>
                </article>
              </article>
            ))}
        </article>
        <section className={`py-3 w-full`}>
          <article
            className={`w-full h-20 rounded-lg relative bg-white shadow`}
          >
            <Image
              width="w-full"
              height="h-full"
              path="https://cdn.pixabay.com/photo/2020/07/24/01/26/e-scooter-5432641_1280.jpg"
              borderRadius="rounded-md"
            />
            <article
              className={`h-full w-full  flex flex-row justify-between items-center p-3 rounded-lg bg-black bg-opacity-60`}
            >
              <p className={`text-primaryLight font-bold text-base `}>
                Update survey
              </p>

              <Btn
                text={"Update"}
                Icon={IoCreate}
                variant="light"
                onClick={() => navigate(`/${userId}/survey`)}
              />
            </article>
          </article>
        </section>
      </section>
    </section>
  );
}

export default EstimateScreen;
