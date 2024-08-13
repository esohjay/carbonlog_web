import { useMemo, useRef, useEffect, useState } from "react";
import Image from "../components/Image";
// import Btn from "../components/Button";
import TrackCategoryCard from "../components/TrackCategoryCard";
import { TrackModal } from "../components/TrackModal";
// import { useTrackActions } from "../context/actions";
import { useTrackContext } from "../context/providers/track";
import {
  shoppingOptions,
  homeOptions,
  foodAndDrinkOptions,
} from "../lib/trackOptions";
import TrackForm from "../components/TrackForm";
import TrackTravel from "../components/TrackTravel";
import ActivityList from "../components/ActivityList";
import { DELETE_ACTIVITY_RESET } from "../context/constants/track";

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

  const [totalEmission, setTotalEmission] = useState(0);
  const [categories, setCategories] = useState({
    home: { sum: 0, data: [] },
    foodAndDrink: { sum: 0, data: [] },
    travel: { sum: 0, data: [] },
    shopping: { sum: 0, data: [] },
  });
  const { getActivity } = useTrackActions();
  const snapPoints = useMemo(() => ["80%"], []);
  const listSnapPoints = useMemo(() => ["65%", "80%", "95%"], []);

  const homeRef = useRef(null);
  const shoppingRef = useRef(null);
  const foodAndDrinkRef = useRef(null);
  const travelRef = useRef(null);
  const homeListRef = useRef(null);
  const shoppingListRef = useRef(null);
  const foodAndDrinkListRef = useRef(null);
  const travelListRef = useRef(null);

  function handleShowModal(ref) {
    ref?.present();
  }

  useEffect(() => {
    if (!activityFetched) {
      getActivity();
    }
  }, [activityFetched]);
  const sumEmission = (category) => {
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
      const { category } = toBeDelete;
      const newArray = categories[category].data.filter(
        (activity) => activity.id !== toBeDelete.id
      );
      setCategories({
        ...categories,
        [category]: {
          data: newArray,
          sum: Number(sumEmission(newArray).toFixed(2)),
        },
      });
      setToBeDeleted(null);
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
    <main className={`bg-gray-50  `}>
      <article className={`p-5`}>
        <article className={`mb-7`}>
          <article
            className={`w-full h-52 rounded-xl relative bg-white shadow`}
          >
            <div
              className={`h-full max-h-full absolute top-0 left-0 rounded-xl flex max-w-full w-full`}
            >
              <Image
                width="w-full"
                height="h-full"
                path="https://cdn.pixabay.com/photo/2020/01/16/13/36/co2-4770585_1280.jpg"
              />
            </div>

            <article
              className={`h-full w-full flex px-5 justify-between py-3 rounded-2xl bg-black bg-opacity-50`}
            >
              <p className={`text-primaryLight font-semibold text-lg`}>
                My emissions
              </p>
              <article
                className={`w-full h-[155px] flex justify-center items-center `}
              >
                <article
                  className={`h-[130px] w-[130px] flex justify-center items-center rounded-full border-[3px] border-altColor`}
                >
                  <p className={`font-semibold text-lg text-primaryLight`}>
                    {totalEmission}
                    kg
                  </p>
                  <p className={`text-primaryLight font-medium`}>
                    <p className={`text-base `}>of C0</p>
                    <p className={`text-xs leading-3`}>2</p>
                  </p>
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
              className={`h-full w-full flex flex-row justify-center items-center p-3 rounded-lg bg-black bg-opacity-60`}
            >
              <p className={`text-primaryLight font-bold text-base `}>
                Record and article your activities under each category
              </p>
            </article>
          </article>
        </article>
        <article className={`flex flex-row gap-4 flex-wrap w-full`}>
          <TrackCategoryCard
            category={"Home"}
            value={categories.home.sum}
            bgUrl={
              "https://cdn.pixabay.com/photo/2022/10/03/23/41/house-7497001_1280.png"
            }
            handleAddBtn={() => handleShowModal(homeRef.current)}
            handleListBtn={() => handleShowModal(homeListRef.current)}
          />
          <TrackCategoryCard
            category={"Travel"}
            value={categories.travel.sum}
            bgUrl={
              "https://cdn.pixabay.com/photo/2012/10/10/05/04/train-60539_1280.jpg"
            }
            handleAddBtn={() => handleShowModal(travelRef.current)}
            handleListBtn={() => handleShowModal(travelListRef.current)}
          />
          <TrackCategoryCard
            category={"Food & Drink"}
            value={categories.foodAndDrink.sum}
            bgUrl={
              "https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_1280.jpg"
            }
            handleAddBtn={() => handleShowModal(foodAndDrinkRef.current)}
            handleListBtn={() => handleShowModal(foodAndDrinkListRef.current)}
          />
          <TrackCategoryCard
            category={"Shopping"}
            value={categories.shopping.sum}
            bgUrl={
              "https://cdn.pixabay.com/photo/2020/03/27/17/03/shopping-4974313_1280.jpg"
            }
            handleAddBtn={() => handleShowModal(shoppingRef.current)}
            handleListBtn={() => handleShowModal(shoppingListRef.current)}
          />
        </article>
        <TrackModal trackRef={homeRef} snapPoints={snapPoints}>
          <TrackForm
            category={"home"}
            options={homeOptions}
            heading={"Emissions from activities in your home"}
          />
        </TrackModal>
        <TrackModal trackRef={shoppingRef} snapPoints={snapPoints}>
          <TrackForm
            category={"shopping"}
            options={shoppingOptions}
            heading={"Emissions from expenses on lifestyle"}
          />
        </TrackModal>
        <TrackModal trackRef={foodAndDrinkRef} snapPoints={snapPoints}>
          <TrackForm
            category={"foodAndDrink"}
            options={foodAndDrinkOptions}
            heading={"Emissions from food and drink consumption"}
          />
        </TrackModal>
        <TrackModal trackRef={travelRef} snapPoints={snapPoints}>
          <TrackTravel />
        </TrackModal>
        {/* Activity Lists */}
        <TrackModal
          trackRef={homeListRef}
          snapPoints={listSnapPoints}
          bg="rgb(249, 250, 251)"
          index={2}
        >
          <ActivityList
            sliderData={categories.home.data}
            heading={"Home activities"}
            total={categories.home.sum}
            category={"home"}
          />
        </TrackModal>
        <TrackModal
          trackRef={shoppingListRef}
          snapPoints={listSnapPoints}
          bg="rgb(249, 250, 251)"
          index={2}
        >
          <ActivityList
            sliderData={categories.shopping.data}
            heading={"Shopping activities"}
            total={categories.shopping.sum}
            category={"shopping"}
          />
        </TrackModal>
        <TrackModal
          trackRef={travelListRef}
          snapPoints={listSnapPoints}
          bg="rgb(249, 250, 251)"
          index={2}
        >
          <ActivityList
            sliderData={categories.travel.data}
            heading={"Travel activities"}
            total={categories.travel.sum}
            category={"travel"}
          />
        </TrackModal>
        <TrackModal
          trackRef={foodAndDrinkListRef}
          snapPoints={listSnapPoints}
          bg="rgb(249, 250, 251)"
          index={2}
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
