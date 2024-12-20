import { useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import Btn from "./Button";
import { useTrackActions } from "../context/actions/track";
import { useTrackContext } from "../context/providers/track";
import { RESET_ACTIVITY } from "../context/constants/track";
import { AiFillPoundCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";

type Inputs = {
  activity: string;
  amount: string;
};

type Option = {
  label: string;
  value: string;
};
type PropType = {
  options: Option[];
  category: string;
  heading: string;
};
export default function TrackForm({ options, category, heading }: PropType) {
  const { addActivity } = useTrackActions();
  const { state, dispatch } = useTrackContext();

  useEffect(() => {
    if (state.activityAdded) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: RESET_ACTIVITY });
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [state.activityAdded, dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (typeof parseFloat(data.amount) === "number") {
      addActivity({ ...data, category });
      reset();
    } else {
      return;
    }
  };
  return (
    <section className={`flex flex-col gap-2 p-5`}>
      <p className={`font-semibold text-base text-dark mb-2`}>{heading}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        //   className="h-[500px] p-5 lg:py-7 lg:px-12 w-full max-w-[450px] bg-white rounded-lg shadow-md"
      >
        <div className="w-full mb-5">
          <label
            htmlFor="email"
            className="block mb-1 font-semibold text-sm text-mainColor"
          >
            Activity
          </label>
          <div className="flex items-center  p-2 bg-white rounded-md border">
            <select
              id=""
              {...register("activity", { required: true })}
              className="bg-transparent text-sm block text-mainColor w-full border-none outline-none px-2"
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {errors.activity && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <section>
          <div className="w-full mb-5">
            <label
              htmlFor="amount"
              className="block mb-1 font-semibold text-sm text-mainColor"
            >
              Amount
            </label>
            <div className="flex items-center  p-2 bg-white rounded-md border">
              <AiFillPoundCircle className="text-mainColor text-2xl" />
              <input
                {...register("amount", { required: true })}
                type="number"
                autoFocus
                className="bg-transparent text-sm block w-full border-none outline-none px-2"
              />
            </div>
            {errors.amount && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>

          {state.activityAdded && (
            <p className={`mt-1 text-sm text-green-500`}>Activity added!</p>
          )}
        </section>
        <section className={`w-full flex flex-row justify-end py-4`}>
          <div className={` max-w-2/3`}>
            <Btn
              text={"Add acttivity"}
              Icon={IoIosAddCircleOutline}
              isLoading={state.addingActivity}
            />
          </div>
        </section>
      </form>
    </section>
  );
}
