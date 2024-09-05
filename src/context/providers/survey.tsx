import React, { useContext, createContext, useReducer } from "react";
import {
  SurveyInitialDataType,
  SurveyState,
  SurveyAction,
} from "../../types/survey";
import { SurveyReducer } from "../reducers/survey";

interface SurveyContextProps {
  state: SurveyState;
  dispatch: React.Dispatch<SurveyAction>;
}

export const surveyInitialData: SurveyInitialDataType = {
  totalEmission: 0,
  emissionCategory: {
    home: 0,
    shopping: 0,
    diet: 0,
    travel: 0,
  },
  survey: {
    householdSize: 0,
    energy: {
      electricity: { value: "", unit: "" },
      gas: { value: "", unit: "" },
      coal: { value: "", unit: "" },
      lpg: { value: "", unit: "" },
      propane: { value: "", unit: "" },
      wood: { value: "", unit: "" },
    },
    flight: {
      domestic: "",
      shortHaul: "",
      longHaul: "",
    },
    car: [],
    bike: [],
    publicTransport: {
      bus: { value: "", unit: "", period: "" },
      train: { value: "", unit: "", period: "" },
      coach: { value: "", unit: "", period: "" },
    },
    diet: "",
    goodsConsumption: {
      clothingMaterials: { value: "", period: "" },
      shoesAndFootwear: { value: "", period: "" },
      furniture: { value: "", period: "" },
      pharmaceuticalProducts: { value: "", period: "" },
      booksAndNewspapers: { value: "", period: "" },
      petFood: { value: "", period: "" },
      tobacco: { value: "", period: "" },
      alcohol: { value: "", period: "" },
      gamesOrToyOrHobbies: { value: "", period: "" },
      householdAppliances: { value: "", period: "" },
    },
    servicesConsumption: {
      medicalServices: { value: "", period: "" },
      education: { value: "", period: "" },
      veterinaryServices: { value: "", period: "" },
      financialServices: { value: "", period: "" },
      salonAndGrooming: { value: "", period: "" },
    },
  },
};
const initialState: SurveyState = {
  loading: false,
  success: false,
  surveySaved: false,
  error: null,
  footprint: null,
  surveyUpdated: false,
  survey: surveyInitialData,
  fetchingSurvey: false,
  bikeDetails: {
    size: "",
    period: "",
    value: "",
    unit: "",
    id: "",
  },
  carDetails: {
    size: "",
    fuelType: "",
    value: "",
    unit: "",
    period: "",
    id: "",
  },
};
const SurveyContext = createContext<SurveyContextProps | undefined>(undefined);
const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(SurveyReducer, initialState);
  //   const [carList, setCarList] = useState([]);
  //   const [carDetail, setCarDetail] = useState<CarType>({
  //     size: "",
  //     fuelType: "",
  //     value: "",
  //     unit: "",
  //     period: "",
  //   });
  //   const [bikeList, setBikeList] = useState([]);
  //   const [bikeDetail, setBikeDetail] = useState({
  //     size: "",
  //     period: "",
  //     value: "",
  //     unit: "",
  //   });
  //   const [surveyData, setSurveyData] = useState({
  //     householdSize: 0,
  //     energy: {
  //       electricity: {
  //         value: "",
  //         unit: "",
  //       },
  //       gas: {
  //         value: "",
  //         unit: "",
  //       },
  //       coal: {
  //         value: "",
  //         unit: "",
  //       },
  //       lpg: {
  //         value: "",
  //         unit: "",
  //       },
  //       propane: {
  //         value: "",
  //         unit: "",
  //       },
  //       wood: {
  //         value: "",
  //         unit: "",
  //       },
  //     },
  //     flight: {
  //       domestic: "",
  //       shortHaul: "",
  //       longHaul: "",
  //     },
  //     car: [],
  //     bike: [],
  //     publicTransport: {
  //       bus: {
  //         value: "",
  //         unit: "",
  //         period: "",
  //       },
  //       train: {
  //         value: "",
  //         unit: "",
  //         period: "",
  //       },
  //       coach: {
  //         value: "",
  //         unit: "",
  //         period: "",
  //       },
  //     },
  //     diet: "",
  //     goodsConsumption: {
  //       clothingMaterials: { value: "", period: "" },
  //       shoesAndFootwear: { value: "", period: "" },
  //       furniture: { value: "", period: "" },
  //       pharmaceuticalProducts: { value: "", period: "" },
  //       booksAndNewspapers: { value: "", period: "" },
  //       petFood: { value: "", period: "" },
  //       tobacco: { value: "", period: "" },
  //       alcohol: { value: "", period: "" },
  //       gamesOrToyOrHobbies: { value: "", period: "" },
  //       householdAppliances: { value: "", period: "" },
  //     },
  //     servicesConsumption: {
  //       medicalServices: { value: "", period: "" },
  //       education: { value: "", period: "" },
  //       veterinaryServices: { value: "", period: "" },
  //       financialServices: { value: "", period: "" },
  //       saloonAndGrooming: { value: "", period: "" },
  //     },
  //   });
  //   const addAnswer = (answer) => {
  //     setSurveyData({ ...surveyData, ...answer });
  //   };

  return (
    <SurveyContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurveyContext = () => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { SurveyContext, SurveyProvider };
