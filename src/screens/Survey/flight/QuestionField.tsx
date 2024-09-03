type PropType = {
  label: string;
  field: string;
  setValue: (arg1: string, arg2: string) => void;
  value: string;
};
export default function QuestionField({
  label,
  field,
  setValue,
  value,
}: PropType) {
  return (
    <section className={`flex flex-row items-center gap-x-2`}>
      <p className={`w-1/2 text-base font-semibold text-dark`}>{label}</p>
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
    </section>
  );
}
