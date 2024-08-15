import { useState, useEffect } from "react";
import Btn from "./Button";
import TrackTravelBtn from "./TrackTravelBtn";
import CarQuestionForm from "./CarQuestionForm";
import BikeQuestionForm from "./BikeQuestionForm";
import FlightQuestionForm from "./FlightQuestionForm";
import PublicTransportForm from "./PublicTransportForm";
import { useTrackActions } from "../context/actions/track";
import { useTrackContext } from "../context/providers/track";
import { RESET_ACTIVITY } from "../context/constants/track";
import { IoIosAddCircleOutline } from "react-icons/io";

const CAR = "CAR";
const PUBLIC = "PUBLIC";
const BIKE = "BIKE";
const FLIGHT = "FLIGHT";
export default function TrackTravel() {
  const [errMsg, setErrMsg] = useState("");
  const { addTravelActivity } = useTrackActions();
  const { state, dispatch } = useTrackContext();
  const [mode, setMode] = useState(CAR);
  const [publicTransport, setPublicTransport] = useState({
    distance: "",
    transportMode: "",
    unit: "",
  });
  const [flight, setFlight] = useState({
    trip: "",
    distance: "",
  });

  const [detail, setDetail] = useState({
    size: "",
    fuelType: "",
    value: "",
    unit: "",
    period: "monthly",
  });
  const setSize = (size: string) => {
    setDetail({ ...detail, size });
  };

  const setFuelType = (fuelType: string) => {
    setDetail({ ...detail, fuelType });
  };
  const setValue = (value: string) => {
    setDetail({ ...detail, value });
  };
  const setUnit = (unit: string) => {
    setDetail({ ...detail, unit });
  };
  const setFlightValue = (field: string, value: string) => {
    setFlight({
      ...flight,
      [field]: value,
    });
  };

  const setPublicTransportValue = (field: string, value: string) => {
    setPublicTransport({
      ...publicTransport,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (mode === CAR) {
      console.log(detail);
      if (
        detail.fuelType &&
        detail.size &&
        detail.value &&
        detail.unit &&
        detail.period
      ) {
        addTravelActivity({ car: detail });
        setDetail({
          size: "",
          fuelType: "",
          value: "",
          period: "monthly",
          unit: "",
        });
        setErrMsg("");
      } else {
        setErrMsg("All field must be filled");
        return;
      }
    }
    if (mode === BIKE) {
      if (detail.size && detail.value && detail.unit && detail.period) {
        addTravelActivity({
          bike: {
            size: detail.size,
            unit: detail.unit,
            period: detail.period,
            value: detail.value,
          },
        });
        setDetail({
          size: "",
          fuelType: "",
          value: "",
          period: "monthly",
          unit: "",
        });
        setErrMsg("");
      } else {
        setErrMsg("All field must be filled");
        return;
      }
    }
    if (mode === PUBLIC) {
      if (
        publicTransport.distance &&
        publicTransport.transportMode &&
        publicTransport.unit
      ) {
        addTravelActivity({
          publicTransport,
        });
        setPublicTransport({
          distance: "",
          transportMode: "",
          unit: "",
        });
        setErrMsg("");
      } else {
        setErrMsg("All field must be filled");
        return;
      }
    }
    if (mode === FLIGHT) {
      if (flight.distance && flight.trip) {
        addTravelActivity({
          flight,
        });
        setFlight({
          distance: "",
          trip: "",
        });
        setErrMsg("");
      } else {
        setErrMsg("All field must be filled");
        return;
      }
    }
  };

  useEffect(() => {
    if (state.activityAdded) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: RESET_ACTIVITY });
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [state.activityAdded]);
  return (
    <section>
      <div className={`flex flex-col gap-2 p-5 pb-8`}>
        <p className={`font-semibold text-base text-dark mb-2`}>
          Select your travel mode
        </p>
        <div className={`flex flex-row justify-cente gap-x-2`}>
          <TrackTravelBtn mode={CAR} currentMode={mode} setMode={setMode} />
          <TrackTravelBtn mode={BIKE} currentMode={mode} setMode={setMode} />
          <TrackTravelBtn mode={FLIGHT} currentMode={mode} setMode={setMode} />
          <TrackTravelBtn mode={PUBLIC} currentMode={mode} setMode={setMode} />
        </div>
        <div className={`pt-5 pb-3`}>
          {mode === BIKE && (
            <BikeQuestionForm
              setSize={setSize}
              setUnit={setUnit}
              setValue={setValue}
              value={detail.value}
              period={detail.period}
              unit={detail.unit}
              size={detail.size}
              allowPeriod={false}
            />
          )}
          {mode === CAR && (
            <CarQuestionForm
              setFuelType={setFuelType}
              setSize={setSize}
              setUnit={setUnit}
              setValue={setValue}
              value={detail.value}
              period={detail.period}
              unit={detail.unit}
              fuelType={detail.fuelType}
              size={detail.size}
              allowPeriod={false}
            />
          )}
          {mode === FLIGHT && (
            <FlightQuestionForm
              setValue={setFlightValue}
              trip={flight.trip}
              distance={flight.distance}
            />
          )}
          {mode === PUBLIC && (
            <PublicTransportForm
              setValue={setPublicTransportValue}
              distance={publicTransport.distance}
              transportMode={publicTransport.transportMode}
              unit={publicTransport.unit}
            />
          )}
        </div>
        <p className={`text-red-500 py-2 `}>{errMsg}</p>
        {state.activityAdded && (
          <p className={`mt-1 text-sm text-green-500`}>Activity added!</p>
        )}
        <div className={`w-full flex flex-row justify-end py-4`}>
          <div className={` max-w-2/3`}>
            <Btn
              text={"Add acttivity"}
              Icon={IoIosAddCircleOutline}
              isLoading={state.addingActivity}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
