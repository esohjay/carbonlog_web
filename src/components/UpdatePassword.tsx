import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdLock } from "react-icons/md";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useAuthActions } from "../context/actions/auth";
import { useAuthContext } from "../context/providers/auth";
import { UPDATE_PROFILE_RESET } from "../context/constants/auth";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { SIGN_IN_FAIL } from "../context/constants/auth";
import Btn from "./Button";

type Inputs = {
  password: string;
  confirmPassword: string;
  old_password: string;
};

export default function UpdatePassword() {
  const { updatePassword } = useAuthActions();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const user = auth.currentUser;
  const { state, dispatch } = useAuthContext();
  const { updated, updating, profile, error } = state;
  const {
    handleSubmit,
    register,
    setError,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      password: "",
      confirmPassword: "",
      old_password: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("root", { type: "required", message: "Password do not match" });
      return;
    }
    if (data.password && data.password.length < 6) {
      setError("root", {
        type: "minLength",
        message: "Minimum of 6 characters is required",
      });
      return;
    }
    if (profile && user) {
      //re-authenticate with old password and update
      const credential = EmailAuthProvider.credential(
        profile.email,
        data.old_password
      );
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword({ password: data.password });
        })
        .catch((error) => {
          console.log(error);
          // An error ocurred
          setError("root", { message: "Old password is incorrect" });
          return;
          // ...
        });
    }
  };
  useEffect(() => {
    if (updated) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: UPDATE_PROFILE_RESET });
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [updated]);
  useEffect(() => {
    if (updated && profile && user) {
      const credential = EmailAuthProvider.credential(
        profile.email,
        getValues("password")
      );
      reauthenticateWithCredential(user, credential)
        .then(() => {
          console.log("re-auth");
        })
        .catch((error) => {
          // An error ocurred
          dispatch({ type: SIGN_IN_FAIL, payload: error });
          // ...
        });
    }
  }, [updated]);
  return (
    <section className={`py-3`}>
      <p className={`font-semibold text-base mb-2 text-mainColor`}>
        Change password
      </p>
      <div className="w-full mb-7">
        <label
          htmlFor="password"
          className="block mb-1 font-semibold text-sm text-mainColor"
        >
          Old password
        </label>
        <div className="flex items-center  p-2 bg-white rounded-md border relative">
          <MdLock className="text-mainColor text-2xl" />
          <input
            type={isOldPasswordVisible ? "text" : "password"}
            {...register("old_password", { required: true })}
            className="bg-transparent text-sm block w-[80%]  border-none outline-none px-2"
          />
          {!isOldPasswordVisible ? (
            <span
              onClick={() => setIsOldPasswordVisible(true)}
              className="absolute top-1/3 right-2"
            >
              <FaEye className="text-mainColor" />
            </span>
          ) : (
            <span
              onClick={() => setIsOldPasswordVisible(false)}
              className="absolute top-1/3 right-2"
            >
              <FaEyeSlash className="text-mainColor" />
            </span>
          )}
        </div>

        {errors.old_password && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>
      <div className="w-full mb-7">
        <label
          htmlFor="password"
          className="block mb-1 font-semibold text-sm text-mainColor"
        >
          New password
        </label>
        <div className="flex items-center  p-2 bg-white rounded-md border relative">
          <MdLock className="text-mainColor text-2xl" />
          <input
            type={isPasswordVisible ? "text" : "password"}
            readOnly={updated}
            {...register("password", { required: true })}
            className="bg-transparent text-sm block w-[80%]  border-none outline-none px-2"
          />
          {!isPasswordVisible ? (
            <span
              onClick={() => setIsPasswordVisible(true)}
              className="absolute top-1/3 right-2"
            >
              <FaEye className="text-mainColor" />
            </span>
          ) : (
            <span
              onClick={() => setIsPasswordVisible(false)}
              className="absolute top-1/3 right-2"
            >
              <FaEyeSlash className="text-mainColor" />
            </span>
          )}
        </div>

        {errors.password && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>
      <div className="w-full mb-7">
        <label
          htmlFor="confirm_password"
          className="block mb-1 font-semibold text-sm text-mainColor"
        >
          Confirm password
        </label>
        <div className="flex items-center  p-2 bg-white rounded-md border relative">
          <MdLock className="text-mainColor text-2xl" />
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            //   readOnly={updated}
            {...register("confirmPassword", { required: true })}
            className="bg-transparent text-sm block w-[80%]  border-none outline-none px-2"
          />
          {!isConfirmPasswordVisible ? (
            <span
              onClick={() => setIsConfirmPasswordVisible(true)}
              className="absolute top-1/3 right-2"
            >
              <FaEye className="text-mainColor" />
            </span>
          ) : (
            <span
              onClick={() => setIsConfirmPasswordVisible(false)}
              className="absolute top-1/3 right-2"
            >
              <FaEyeSlash className="text-mainColor" />
            </span>
          )}
        </div>

        {errors.confirmPassword && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>

      {errors.root && (
        <p className={`my-2 text-sm text-red-500`}>{errors.root.message}</p>
      )}
      {updated && !updating && (
        <p className={`my-2 text-sm text-green-500`}>Password updated!</p>
      )}
      {error && (
        <p className={`my-2 text-sm text-green-500`}>{error.message}</p>
      )}
      <Btn
        text={"Save"}
        padding={`px-10 py-4`}
        isLoading={updating}
        disable={updating}
        onClick={handleSubmit(onSubmit)}
      />
    </section>
  );
}
