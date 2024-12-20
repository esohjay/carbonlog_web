import { useForm, SubmitHandler } from "react-hook-form";
import { Action } from "../types/action";
import { useActionActions } from "../context/actions/action";
import Btn from "../components/Button";
import { useActionContext } from "../context/providers/action";

export default function AddAction() {
  const { addAction } = useActionActions();
  const { state } = useActionContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Action>();
  const onSubmit: SubmitHandler<Action> = (data) => addAction(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
      <div className="w-full mb-5">
        <label
          htmlFor="title"
          className="block mb-1 font-semibold text-sm text-mainColor"
        >
          Title
        </label>
        <div className="flex items-center  p-2 bg-white rounded-md border">
          <input
            id="title"
            {...register("title", { required: true })}
            className="bg-transparent text-sm block w-full border-none outline-none px-2"
          />
        </div>
        {errors.title && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>
      <div className="w-full mb-5">
        <label
          htmlFor="category"
          className="block mb-1 font-semibold text-sm text-mainColor"
        >
          Category
        </label>
        <div className="flex items-center bg-white rounded-md ">
          <select
            id="category"
            {...register("category", { required: true })}
            className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
          >
            <option value={""}>Select category</option>
            <option value={"shopping"}>Shopping</option>
            <option value={"energy"}>Energy</option>
            <option value={"food"}>Food</option>
            <option value={"travel"}>Travel</option>
          </select>
        </div>
        {errors.category && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>
      <div className="w-full mb-5">
        <label
          htmlFor="sdg"
          className="block mb-1 font-semibold text-sm text-mainColor"
        >
          SDG
        </label>
        <div className="flex flex-wrap gap-3">
          {[...Array(17)].map((_, i) => (
            <div
              key={i}
              className="flex flex-row-reverse items-center gap-x-1 p-1 border rounded-md"
            >
              <label
                htmlFor={`sdg${i + 1}`}
                className="block font-semibold text-xs text-mainColor"
              >
                SDG {i + 1}
              </label>
              <input
                id={`sdg${i + 1}`}
                type="checkbox"
                value={i + 1}
                {...register("sdg", { required: true })}
                className="bg-transparent text-sm block border-none outline-none px-2"
              />
            </div>
          ))}
        </div>

        {/* <select
            id="sdg"
            multiple
            {...register("sdg", { required: true })}
            className="bg-transparent text-sm block text-mainColor w-full border outline-none p-2 rounded-md "
          >
            <option value={""}>Select sdg</option>
            <option value={"1"}>SDG 1</option>
            <option value={"2"}>SDG 2</option>
            <option value={"3"}>SDG 3</option>
            <option value={"4"}>SDG 4</option>
            <option value={"5"}>SDG 5</option>
            <option value={"6"}>SDG 6</option>
            <option value={"7"}>SDG 7</option>
            <option value={"8"}>SDG 8</option>
            <option value={"9"}>SDG 9</option>
            <option value={"10"}>SDG 10</option>
            <option value={"11"}>SDG 11</option>
            <option value={"12"}>SDG 12</option>
            <option value={"13"}>SDG 13</option>
            <option value={"14"}>SDG 14</option>
            <option value={"15"}>SDG 15</option>
            <option value={"16"}>SDG 16</option>
            <option value={"17"}>SDG 17</option>
          </select> */}
        {errors.sdg && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>
      <div className="w-full mb-5">
        <label
          htmlFor="point"
          className="block mb-1 font-semibold text-sm text-mainColor"
        >
          Point
        </label>
        <div className="flex items-center  p-2 bg-white rounded-md border">
          <input
            type="number"
            id="point"
            {...register("point", { required: true })}
            className="bg-transparent text-sm block w-full border-none outline-none px-2"
          />
        </div>
        {errors.point && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>
      <div className="w-full mb-5">
        <label
          htmlFor="emission"
          className="block mb-1 font-semibold text-sm text-mainColor"
        >
          Emission
        </label>
        <div className="flex items-center  p-2 bg-white rounded-md border">
          <input
            id="emission"
            type="number"
            {...register("emission", { required: true })}
            className="bg-transparent text-sm block w-full border-none outline-none px-2"
          />
        </div>
        {errors.emission && (
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
            id="description"
            {...register("description", { required: true })}
            className="bg-transparent text-sm block w-full border-none outline-none px-2"
          />
        </div>
        {errors.description && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>
      <Btn text="Submit" isLoading={state.addingAction} />
    </form>
  );
}
