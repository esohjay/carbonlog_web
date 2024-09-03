import { ErrorType } from "./context";
import { SurveyActionType } from "../context/constants/survey";

export type EnergyValueUnion =
  | "electricity"
  | "coal"
  | "gas"
  | "lpg"
  | "propane"
  | "wood";

export type PublicTransportValueUnion = "bus" | "train" | "coach";

export interface EnergyType {
  value: string;
  unit: string;
}
export interface CarType {
  size: string;
  fuelType: string;
  value: string;
  unit: string;
  period: string;
  id: string;
}
export interface BikeType {
  size: string;
  value: string;
  unit: string;
  period: string;
  id: string;
}

export interface PublicTransportType {
  value: string;
  unit: string;
  period: string;
}

export interface GoodsConsumptionType {
  value: string;
  period: string;
}

export interface ServicesConsumptionType {
  value: string;
  period: string;
}

export interface SurveyType {
  householdSize: number;
  energy: {
    electricity: EnergyType;
    gas: EnergyType;
    coal: EnergyType;
    lpg: EnergyType;
    propane: EnergyType;
    wood: EnergyType;
  };
  flight: {
    domestic: string;
    shortHaul: string;
    longHaul: string;
  };
  car: CarType[] | [];
  bike: BikeType[] | [];
  publicTransport: {
    bus: PublicTransportType;
    train: PublicTransportType;
    coach: PublicTransportType;
  };
  diet: string;
  goodsConsumption: {
    clothingMaterials: GoodsConsumptionType;
    shoesAndFootwear: GoodsConsumptionType;
    furniture: GoodsConsumptionType;
    pharmaceuticalProducts: GoodsConsumptionType;
    booksAndNewspapers: GoodsConsumptionType;
    petFood: GoodsConsumptionType;
    tobacco: GoodsConsumptionType;
    alcohol: GoodsConsumptionType;
    gamesOrToyOrHobbies: GoodsConsumptionType;
    householdAppliances: GoodsConsumptionType;
  };
  servicesConsumption: {
    medicalServices: ServicesConsumptionType;
    education: ServicesConsumptionType;
    veterinaryServices: ServicesConsumptionType;
    financialServices: ServicesConsumptionType;
    saloonAndGrooming: ServicesConsumptionType;
  };
}

export interface EmissionCategoryType {
  home: number;
  shopping: number;
  diet: number;
  travel: number;
}

export interface SurveyInitialDataType {
  totalEmission: number;
  emissionCategory: EmissionCategoryType;
  survey: SurveyType;
}

export interface SurveyState {
  loading: boolean;
  success: boolean;
  surveySaved: boolean;
  error: ErrorType | null;
  footprint: null;
  surveyUpdated: boolean;
  survey: SurveyInitialDataType;
  fetchingSurvey: boolean;
  carDetails: CarType;
  bikeDetails: BikeType;
}

export interface SurveyAction {
  type: SurveyActionType;
  payload?: any;
}
