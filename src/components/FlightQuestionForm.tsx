type PropType = {
  setValue: (arg1: string, arg2: string) => void;
  distance: string;
  trip: string;
};

const distanceOptions = [
  { label: "Select distance", value: "" },
  { label: "Domestic (~1 hour)", value: "domestic" },
  { label: "Short haul (~2 hours)", value: "shortHaul" },
  { label: "Long haul (8+ hours)", value: "longHaul" },
];

const tripOptions = [
  { label: "Select trip", value: "" },
  { label: "One way trip", value: "oneWay" },
  { label: "Round trip", value: "return" },
];

export default function FlightQuestionForm({
  setValue,
  distance,
  trip,
}: PropType) {
  return (
    <section className={`flex flex-col gap-y-3 mb-3`}>
      <section className={``}>
        <p className={`font-semibold mb-2 text-dark`}>Trip</p>
        <select
          name=""
          className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
          id=""
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setValue("trip", e.target.value)
          }
          value={trip}
        >
          {tripOptions.map((trip) => (
            <option key={trip.value} value={trip.value}>
              {trip.label}
            </option>
          ))}
        </select>
      </section>
      <section className={``}>
        <p className={`font-semibold mb-2 text-dark`}>Distance</p>
        <select
          name=""
          className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
          id=""
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setValue("distance", e.target.value)
          }
          value={distance}
        >
          {distanceOptions.map((distance) => (
            <option key={distance.value} value={distance.value}>
              {distance.label}
            </option>
          ))}
        </select>
      </section>
    </section>
  );
}
