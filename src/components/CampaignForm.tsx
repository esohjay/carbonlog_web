import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Btn from "./Button";
import { useCampaignActions } from "../context/actions/campaign";
import { useCampaignContext } from "../context/providers/campaign";
import { CREATE_CAMPAIGN_RESET } from "../context/constants/campaign";

type Inputs = {
  title: string;
  description: string;
};

export default function CampaignForm({ closeForm }: { closeForm: () => void }) {
  const { createCampaign } = useCampaignActions();
  const { state, dispatch } = useCampaignContext();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createCampaign(data);
  };
  useEffect(() => {
    if (state.campaignAdded) {
      // getCampaigns();
      const timeoutId = setTimeout(() => {
        closeForm();
        dispatch({ type: CREATE_CAMPAIGN_RESET });
        reset();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [state.campaignAdded]);
  return (
    <section className={``}>
      <p className={`font-semibold text-base mb-2 text-mainColor`}>
        Start a campaign
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mb-5">
          <label
            htmlFor="title"
            className="block mb-1 font-semibold text-sm text-mainColor"
          >
            Title
          </label>
          <div className="flex items-center  p-2 bg-white rounded-md border">
            <input
              {...register("title", { required: true })}
              className="bg-transparent text-sm block w-full border-none outline-none px-2"
              placeholder="Enter campaign title"
            />
          </div>
          {errors.title && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>
        <div className="w-full mb-5">
          <label
            htmlFor="description"
            className="block mb-1 font-semibold text-sm text-mainColor"
          >
            Description
          </label>
          <div className="flex items-center  p-2 bg-white rounded-md border">
            <textarea
              {...register("description", { required: true })}
              className="bg-transparent text-sm block w-full border-none outline-none px-2"
              placeholder="Enter campaign description"
            />
          </div>
          {errors.description && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <Btn
          text={"Create campaign"}
          padding={`px-10 py-4`}
          isLoading={state.addingCampaign}
          // onPress={handleSubmit(onSubmit)}
        />
      </form>
      {state.campaignAdded && (
        <p className={`mt-1 text-sm text-green-500`}>Campaign added!</p>
      )}
    </section>
  );
}
