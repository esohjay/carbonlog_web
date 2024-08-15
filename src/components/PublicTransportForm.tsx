type PropType = {
  setValue: (arg1: string, arg2: string) => void;
  distance: string;
  unit: string;
  transportMode: string;
};

const transportModeOptions = [
  { label: "Select transit mode", value: "" },
  { label: "Bus", value: "bus" },
  { label: "Train", value: "train" },
  { label: "Coach", value: "coach" },
];
const unitOptions = [
  { label: "Unit", value: "" },
  { label: "Km", value: "km" },
  { label: "Mile", value: "mile" },
];

export default function PublicTransportForm({
  setValue,
  distance,
  unit,
  transportMode,
}: PropType) {
  return (
    <section className={`flex flex-col gap-y-3`}>
      <section className={`flex flex-row gap-x-3 mb-3`}>
        <div className={`w-[70%]`}>
          <p className={`font-semibold mb-2 text-dark`}>
            Public transport mode
          </p>
          <select
            name=""
            id=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setValue("transportMode", e.target.value)
            }
            value={transportMode}
            className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
          >
            {transportModeOptions.map((transportMode) => (
              <option key={transportMode.value} value={transportMode.value}>
                {transportMode.label}
              </option>
            ))}
          </select>
          {/* <DropdownSelect
            options={[
              { label: "Bus", value: "bus" },
              { label: "Train", value: "train" },
              { label: "Coach", value: "coach" },
            ]}
            onSelect={setValue}
            value={transportMode}
            onSelectArg="transportMode"
            placeholder="Select transport mode"
          /> */}
        </div>
      </section>
      <section>
        <p className={`font-semibold mb-2 text-dark`}>Distance travelled</p>
        <section className={`flex flex-row items-end gap-x-3`}>
          <div className={`w-1/2`}>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue("distance", e.target.value)
              }
              type="number"
              placeholder="0"
              className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
              // label={"Distance travelled"}
              value={distance}
            />
            {/* <TextInput
              onChangeText={(text) => setValue("distance", text)}
              keyboardType="number-pad"
              placeholder="0"
              // label={"Distance travelled"}
              border={true}
              value={distance}
            /> */}
          </div>
          <div className={`w-1/3`}>
            <select
              name=""
              id=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setValue("unit", e.target.value)
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
            {/* <DropdownSelect
              options={[
                { label: "Km", value: "km" },
                { label: "Mile", value: "mile" },
              ]}
              onSelect={setValue}
              value={unit}
              onSelectArg="unit"
            /> */}
          </div>
        </section>
      </section>
    </section>
  );
}
