type PropType = {
  setFuelType: (arg: string) => void;
  setPeriod?: (arg: string) => void;
  setUnit: (arg: string) => void;
  setSize: (arg: string) => void;
  setValue: (arg: string) => void;
  period: string;
  unit: string;
  size: string;
  value: string;
  fuelType: string;
  allowPeriod: boolean;
};

const sizeOptions = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "Average", value: "average" },
];
const fuelOptions = [
  { label: "Diesel", value: "diesel" },
  { label: "Petrol", value: "petrol" },
  { label: "Hybrid", value: "hybrid" },
  { label: "CNG", value: "cng" },
  { label: "LPG", value: "lpg" },
  { label: "Plugin Hybrid", value: "pluginHybrid" },
  { label: "Battery Hybrid", value: "batteryHybrid" },
  { label: "Unknown", value: "unknown" },
];
const unitOptions = [
  { label: "Km", value: "km" },
  { label: "Mile", value: "mile" },
];
const periodOption = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];
export default function CarQuestionForm({
  setFuelType,
  setPeriod,
  setUnit,
  setSize,
  setValue,
  period,
  unit,
  size,
  value,
  fuelType,
  allowPeriod,
}: PropType) {
  return (
    <section>
      <section className={`flex flex-row gap-x-3 mb-3`}>
        <div className={`w-1/3`}>
          <p className={`font-semibold mb-2 text-dark`}>Car size</p>
          <select
            name=""
            id=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSize(e.target.value)
            }
            value={size}
          >
            {sizeOptions.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
        <div className={`w-1/2`}>
          <p className={`font-semibold mb-2 text-dark`}>Fuel type</p>
          <select
            name=""
            id=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFuelType(e.target.value)
            }
            value={fuelType}
          >
            {fuelOptions.map((fuel) => (
              <option key={fuel.value} value={fuel.value}>
                {fuel.label}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section>
        <p className={`font-semibold mb-2 text-dark`}>Distance travelled</p>
        <section className={`flex flex-row items-end gap-x-3`}>
          <div className={`w-1/3`}>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              type="number"
              placeholder="0"
              // label={"Distance travelled"}
              value={value}
            />
          </div>

          <div className={`w-1/4`}>
            <select
              name=""
              id=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setUnit(e.target.value)
              }
              value={unit}
            >
              {unitOptions.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
          {allowPeriod && setPeriod && (
            <div className={`w-1/3`}>
              <select
                name=""
                id=""
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setPeriod(e.target.value)
                }
                value={period}
              >
                {periodOption.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </section>
      </section>
    </section>
  );
}
