import { EnergyValueUnion } from "../../../types/survey";
type LabelType = {
  label: string;
  value: string;
};

type PropType = {
  label: string;
  field: EnergyValueUnion;
  setValue: (arg1: EnergyValueUnion, arg2: string) => void;
  setUnit: (arg1: EnergyValueUnion, arg2: string) => void;
  dropdownValue: string;
  dropdownOptions: LabelType[];
  inputValue: string;
};

export default function QuestionField({
  label,
  field,
  setValue,
  setUnit,
  dropdownValue,
  dropdownOptions,
  inputValue,
}: PropType) {
  return (
    <section className={`flex flex-row items-end gap-x-3`}>
      <div className={`w-1/2`}>
        <p className={`font-semibold mb-2 text-dark`}>{label}</p>
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
            setUnit(field, e.target.value)
          }
          value={dropdownValue}
          className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
        >
          {dropdownOptions.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
        {/* <DropdownSelect
          options={[...dropdownOptions]}
          onSelect={setUnit}
          value={dropdownValue}
          onSelectArg={field}
        /> */}
      </div>
    </section>
  );
}
