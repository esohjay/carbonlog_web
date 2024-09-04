import { GoodsConsumptionUnion } from "../../../types/survey";
type PropType = {
  label: string;
  field: GoodsConsumptionUnion;
  setValue: (arg1: GoodsConsumptionUnion, arg2: string) => void;
  inputValue: string;
  setPeriod: (arg1: GoodsConsumptionUnion, arg2: string) => void;
  dropdownValue: string;
};

const periodOptions = [
  { label: "Period", value: "" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

export default function QuestionField({
  label,
  field,
  setValue,
  setPeriod,
  dropdownValue,
  inputValue,
}: PropType) {
  return (
    <section className={`flex flex-row items-end gap-x-3`}>
      <p className={`w-1/2 text-base font-semibold mb-2 text-dark`}>{label}</p>
      <div className={`w-1/2`}>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(field, e.target.value)
          }
          type="number"
          placeholder="0"
          className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
          // label={"Distance travelled"}
          value={inputValue}
        />
      </div>
      <div className={`w-1/3`}>
        <select
          name=""
          id=""
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPeriod(field, e.target.value)
          }
          value={dropdownValue}
          className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
        >
          {periodOptions.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
