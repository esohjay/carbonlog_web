import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Btn from "./Button";
import { useAuthActions } from "../context/actions/auth";
import { useAuthContext } from "../context/providers/auth";
import { RESET_PASSWORD_RESET } from "../context/constants/auth";
import { formatError } from "../lib/firebaseError";
import { MdEmail } from "react-icons/md";

type Inputs = {
  email: string;
};

export default function ResetPassword({
  closeForm,
}: {
  closeForm: () => void;
}) {
  const { resetPassword } = useAuthActions();
  const { state, dispatch } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    resetPassword(data.email);
  };
  useEffect(() => {
    if (state?.error && typeof state?.error === "string") {
      const formattedError = formatError(state.error);
      setErrorMsg(formattedError);
    }
  }, [state?.error]);
  useEffect(() => {
    if (state.resetSent) {
      const timeoutId = setTimeout(() => {
        closeForm();
        dispatch({ type: RESET_PASSWORD_RESET });
        reset();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [state.resetSent]);
  return (
    <section className={`bg-white p-5`}>
      <p className={`font-semibold text-base mb-2 text-mainColor`}>
        Reset your password
      </p>
      <div className="w-full mb-5">
        <label
          htmlFor="email"
          className="block mb-1 font-semibold text-sm text-mainColor"
        >
          Email
        </label>
        <div className="flex items-center  p-2 bg-white rounded-md border">
          <MdEmail className="text-mainColor text-2xl" />
          <input
            {...register("email", { required: true })}
            autoFocus
            type="email"
            className="bg-transparent text-sm block w-full border-none outline-none px-2"
          />
        </div>
        {errors.email && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>
      <Btn
        text={"Reset"}
        padding={`px-10 py-4`}
        isLoading={state.loading}
        onClick={handleSubmit(onSubmit)}
      />
      {state.resetSent && (
        <p className={`mt-1 text-sm text-green-500`}>
          Success! If your email address registered with us, you will receive a
          reset link.
        </p>
      )}
      {state?.error && (
        <p className={`mt-1 text-sm text-red-500`}>{errorMsg}</p>
      )}
    </section>
  );
}
