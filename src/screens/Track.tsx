import { useMemo, useRef, useEffect, useState } from "react";
import Image from "../components/Image";
// import Btn from "../components/Button";
import TrackCategoryCard from "../components/TrackCategoryCard";
import { TrackModal } from "../components/TrackModal";
import { useTrackActions } from "../context/actions/track";
import { useTrackContext } from "../context/providers/track";
import {
  shoppingOptions,
  homeOptions,
  foodAndDrinkOptions,
} from "../lib/trackOptions";
import TrackForm from "../components/TrackForm";
import TrackTravel from "../components/TrackTravel";
import ActivityList from "../components/ActivityList";
import {
  DELETE_ACTIVITY_RESET,
  SET_ACTIVITY_TOBEDELETED,
} from "../context/constants/track";
import { Activity } from "../types/track";

type Category = {
  sum: number;
  data: Activity[];
};
type Categories = {
  home: Category;
  foodAndDrink: Category;
  travel: Category;
  shopping: Category;
};

const HOME = "HOME";
const SHOPPING = "SHOPPING";
const FOODANDDRINK = "FOODANDDRINK";
const TRAVEL = "TRAVEL";
const HOMELIST = "HOMELIST";
const SHOPPINGLIST = "SHOPPINGLIST";
const FOODANDDRINKLIST = "FOODANDDRINKLIST";
const TRAVELLIST = "TRAVELLIST";

function TrackScreen() {
  const { state, dispatch } = useTrackContext();
  const {
    activityList,
    fetchingActivity,
    activityFetched,
    activityAdded,
    activity,
    activityDeleted,
  } = state;
  const [showCategory, setShowCategory] = useState("");
  const [totalEmission, setTotalEmission] = useState(0);
  const [categories, setCategories] = useState<Categories>({
    home: { sum: 0, data: [] },
    foodAndDrink: { sum: 0, data: [] },
    travel: { sum: 0, data: [] },
    shopping: { sum: 0, data: [] },
  });
  const { getActivity } = useTrackActions();
  const snapPoints = useMemo(() => ["80%"], []);
  const listSnapPoints = useMemo(() => ["65%", "80%", "95%"], []);

  // function handleShowModal(ref) {
  //   ref?.present();
  // }

  useEffect(() => {
    if (!activityFetched) {
      getActivity();
    }
  }, [activityFetched]);
  const sumEmission = (category: Activity[]) => {
    return category.reduce(
      (accumulator, categoryData) => accumulator + categoryData.emission,
      0
    );
  };
  useEffect(() => {
    if (activityFetched && activityList) {
      const { travel, home, foodAndDrink, shopping } = activityList;
      setCategories({
        home: { data: home, sum: Number(sumEmission(home).toFixed(2)) },
        travel: { data: travel, sum: Number(sumEmission(travel).toFixed(2)) },
        shopping: {
          data: shopping,
          sum: Number(sumEmission(shopping).toFixed(2)),
        },
        foodAndDrink: {
          data: foodAndDrink,
          sum: Number(sumEmission(foodAndDrink).toFixed(2)),
        },
      });
      setTotalEmission(
        sumEmission(home) +
          sumEmission(travel) +
          sumEmission(foodAndDrink) +
          sumEmission(shopping)
      );
    }
  }, [activityFetched]);

  //when new activity is added
  useEffect(() => {
    if (activityAdded && activity) {
      const { category } = activity.data;
      const newArray = [activity.data, ...categories[category].data];
      setCategories({
        ...categories,
        [category]: {
          data: newArray,
          sum: Number(sumEmission(newArray).toFixed(2)),
        },
      });
    }
  }, [activityAdded, activity]);

  //when activity is deleted
  useEffect(() => {
    if (activityDeleted) {
      const category = state.toBeDeleted?.category!;
      const newArray = categories[category].data.filter(
        (activity) => activity.id !== state?.toBeDeleted?.id
      );
      setCategories({
        ...categories,
        [category]: {
          data: newArray,
          sum: Number(sumEmission(newArray).toFixed(2)),
        },
      });

      dispatch({ type: SET_ACTIVITY_TOBEDELETED, payload: null });
      dispatch({ type: DELETE_ACTIVITY_RESET });
    }
  }, [activityDeleted]);
  // update total emission
  useEffect(() => {
    setTotalEmission(
      categories.foodAndDrink.sum +
        categories.home.sum +
        categories.shopping.sum +
        categories.travel.sum
    );
  }, [categories]);
  return (
    <main className={``}>
      <article className={`md:py-5`}>
        <article className={`mb-7`}>
          <article
            className={`w-full h-52 lg:h-[350px] rounded-xl relative bg-white shadow`}
          >
            <div
              className={`h-full z-0 max-h-full absolute top-0 left-0 rounded-xl flex max-w-full w-full`}
            >
              <Image
                width="w-full"
                height="h-full"
                borderRadius="rounded-xl"
                path="https://cdn.pixabay.com/photo/2020/01/16/13/36/co2-4770585_1280.jpg"
              />
            </div>

            <article
              className={`h-full z-10 w-full flex flex-col px-5 justify-center items-center py-3 rounded-2xl bg-black bg-opacity-50 absolute top-0 left-0`}
            >
              <p
                className={`text-primaryLight font-semibold text-lg lg:text-2xl`}
              >
                My emissions
              </p>
              <article
                className={`w-full h-[155px] lg:h-[250px] flex justify-center items-center `}
              >
                <article
                  className={`h-[130px] w-[130px] lg:h-[230px] lg:w-[230px] flex flex-col justify-center items-center rounded-full border-[3px] lg:border-[6px] border-altColor`}
                >
                  <p className={`font-semibold text-lg text-primaryLight`}>
                    {totalEmission}
                    kg
                  </p>{" "}
                  <span className={`text-primaryLight flex items-end`}>
                    <p className={`text-base lg:text-lg font-semibold`}>
                      {" "}
                      of C0
                    </p>
                    <p
                      className={`text-xs lg:text-base leading-3 font-semibold`}
                    >
                      2
                    </p>
                  </span>
                </article>
              </article>
            </article>
          </article>
        </article>
        <article className={`mb-7`}>
          <article
            className={`w-full h-20 rounded-lg relative bg-white shadow`}
          >
            <div
              className={`h-full max-h-full absolute top-0 left-0 rounded-lg flex max-w-full w-full`}
            >
              <Image
                width="w-full"
                height="h-full"
                path="https://cdn.pixabay.com/photo/2020/07/24/01/26/e-scooter-5432641_1280.jpg"
              />
            </div>
            <article
              className={`h-full w-full absolute top-0 left-0 flex flex-row justify-center items-center p-3 rounded-lg bg-black bg-opacity-60`}
            >
              <p className={`text-primaryLight font-bold text-base `}>
                Record and article your activities under each category
              </p>
            </article>
          </article>
        </article>
        <article
          className={`flex flex-row gap-4 lg:justify-center flex-wrap w-full`}
        >
          <TrackCategoryCard
            category={"Home"}
            value={categories.home.sum}
            bgUrl={
              "https://cdn.pixabay.com/photo/2022/10/03/23/41/house-7497001_1280.png"
            }
            handleAddBtn={() => setShowCategory(HOME)}
            handleListBtn={() => setShowCategory(HOMELIST)}
          />
          <TrackCategoryCard
            category={"Travel"}
            value={categories.travel.sum}
            bgUrl={
              "https://cdn.pixabay.com/photo/2012/10/10/05/04/train-60539_1280.jpg"
            }
            handleAddBtn={() => setShowCategory(TRAVEL)}
            handleListBtn={() => setShowCategory(TRAVELLIST)}
          />
          <TrackCategoryCard
            category={"Food & Drink"}
            value={categories.foodAndDrink.sum}
            bgUrl={
              "https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_1280.jpg"
            }
            handleAddBtn={() => setShowCategory(FOODANDDRINK)}
            handleListBtn={() => setShowCategory(FOODANDDRINKLIST)}
          />
          <TrackCategoryCard
            category={"Shopping"}
            value={categories.shopping.sum}
            bgUrl={
              "https://cdn.pixabay.com/photo/2020/03/27/17/03/shopping-4974313_1280.jpg"
            }
            handleAddBtn={() => setShowCategory(SHOPPING)}
            handleListBtn={() => setShowCategory(SHOPPINGLIST)}
          />
        </article>
        <TrackModal isOpen={showCategory === HOME} closeModal={setShowCategory}>
          <TrackForm
            category={"home"}
            options={homeOptions}
            heading={"Emissions from activities in your home"}
          />
        </TrackModal>
        <TrackModal
          isOpen={showCategory === SHOPPING}
          closeModal={setShowCategory}
        >
          <TrackForm
            category={"shopping"}
            options={shoppingOptions}
            heading={"Emissions from expenses on lifestyle"}
          />
        </TrackModal>
        <TrackModal
          isOpen={showCategory === FOODANDDRINK}
          closeModal={setShowCategory}
        >
          <TrackForm
            category={"foodAndDrink"}
            options={foodAndDrinkOptions}
            heading={"Emissions from food and drink consumption"}
          />
        </TrackModal>
        <TrackModal
          isOpen={showCategory === TRAVEL}
          closeModal={setShowCategory}
        >
          <TrackTravel />
        </TrackModal>
        {/* Activity Lists */}
        <TrackModal
          isOpen={showCategory === HOMELIST}
          closeModal={setShowCategory}
        >
          <ActivityList
            sliderData={categories.home.data}
            heading={"Home activities"}
            total={categories.home.sum}
            category={"home"}
          />
        </TrackModal>
        <TrackModal
          isOpen={showCategory === SHOPPINGLIST}
          closeModal={setShowCategory}
        >
          <ActivityList
            sliderData={categories.shopping.data}
            heading={"Shopping activities"}
            total={categories.shopping.sum}
            category={"shopping"}
          />
        </TrackModal>
        <TrackModal
          isOpen={showCategory === TRAVELLIST}
          closeModal={setShowCategory}
        >
          <ActivityList
            sliderData={categories.travel.data}
            heading={"Travel activities"}
            total={categories.travel.sum}
            category={"travel"}
          />
        </TrackModal>
        <TrackModal
          isOpen={showCategory === FOODANDDRINKLIST}
          closeModal={setShowCategory}
        >
          <ActivityList
            sliderData={categories.foodAndDrink.data}
            heading={"Activities related to food and drinks"}
            total={categories.foodAndDrink.sum}
            category={"foodAndDrink"}
          />
        </TrackModal>
      </article>
    </main>
  );
}

export default TrackScreen;
