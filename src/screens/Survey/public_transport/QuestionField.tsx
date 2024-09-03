import { PublicTransportValueUnion } from "../../../types/survey";

type PropType = {
  label: string;
  field: PublicTransportValueUnion;
  setValue: (arg1: PublicTransportValueUnion, arg2: string) => void;
  value: string;
  setUnit: (arg1: PublicTransportValueUnion, arg2: string) => void;
  dropdownPeriodValue: string;
  setPeriod: (arg1: PublicTransportValueUnion, arg2: string) => void;
  dropdownUnitValue: string;
  allowPeriod: boolean;
};

const unitOptions = [
  { label: "Km", value: "km" },
  { label: "Mile", value: "mile" },
];
const periodOptions = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];
export default function QuestionField({
  label,
  field,
  setValue,
  value,
  setUnit,
  dropdownPeriodValue,
  setPeriod,
  dropdownUnitValue,
  allowPeriod,
}: PropType) {
  return (
    <section>
      <p className={`w-1/2 text-base font-semibold mb-2 text-dark`}>{label}</p>
      <section className={`flex flex-row items-end gap-x-3`}>
        <div className={`w-1/3`}>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(field, e.target.value)
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
              setUnit(field, e.target.value)
            }
            value={dropdownUnitValue}
            className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
          >
            {unitOptions.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
        {allowPeriod && (
          <div className={`w-1/3`}>
            <select
              name=""
              id=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setPeriod(field, e.target.value)
              }
              value={dropdownPeriodValue}
              className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
            >
              {periodOptions.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </section>
    </section>
  );
}
