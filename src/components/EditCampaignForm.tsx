import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Btn from "./Button";
import { useCampaignActions } from "../context/actions/campaign";
import { useCampaignContext } from "../context/providers/campaign";
import { UPDATE_CAMPAIGN_RESET } from "../context/constants/campaign";

type Inputs = {
  title: string;
  description: string;
};

export default function CampaignForm({ closeForm }: { closeForm: () => void }) {
  const { updateCampaign } = useCampaignActions();
  const { state, dispatch } = useCampaignContext();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: state?.campaign?.title || "",
      description: state?.campaign?.description || "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (state?.campaign?.id) {
      updateCampaign({ ...data, id: state?.campaign?.id });
    }
  };
  useEffect(() => {
    if (state.updated) {
      // getCampaigns();
      const timeoutId = setTimeout(() => {
        closeForm();
        dispatch({ type: UPDATE_CAMPAIGN_RESET });
        reset();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [state.updated]);
  return (
    <section className={`p-5 bg-white`}>
      <p className={`font-semibold text-base mb-2 text-mainColor`}>
        Edit campaign
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
              autoFocus
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
          text={"Update campaign"}
          padding={`px-10 py-4`}
          isLoading={state.updating}
          // onPress={handleSubmit(onSubmit)}
        />
      </form>
      {state.updated && (
        <p className={`mt-1 text-sm text-green-500`}>Campaign updated!</p>
      )}
    </section>
  );
}
