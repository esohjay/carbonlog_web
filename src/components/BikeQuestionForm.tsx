type PropType = {
  setPeriod?: (arg: string) => void;
  setUnit: (arg: string) => void;
  setSize: (arg: string) => void;
  setValue: (arg: string) => void;
  period: string;
  unit: string;
  size: string;
  value: string;
  allowPeriod: boolean;
};

const sizeOptions = [
  { label: "Select size", value: "" },
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "Average", value: "average" },
];
const unitOptions = [
  { label: "Unit", value: "" },
  { label: "Km", value: "km" },
  { label: "Mile", value: "mile" },
];
const periodOption = [
  { label: "Period", value: "" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];
export default function BikeQuestionForm({
  setPeriod,
  setUnit,
  setSize,
  setValue,
  period,
  unit,
  size,
  value,
  allowPeriod,
}: PropType) {
  return (
    <section>
      <section className={`flex flex-row gap-x-3 mb-3`}>
        <div className={`w-2/3`}>
          <p className={`font-semibold mb-2 text-dark`}>Car size</p>
          <select
            name=""
            className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
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
              className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
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
              className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
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
                className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
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
