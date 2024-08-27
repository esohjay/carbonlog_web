import { useEffect, useState } from "react";
import Btn from "./Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import { FaUser, FaEyeSlash, FaEye } from "react-icons/fa";
import { useAuthContext } from "../context/providers/auth";
import { useAuthActions } from "../context/actions/auth";
import { UPDATE_PROFILE_RESET } from "../context/constants/auth";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { SIGN_IN_FAIL } from "../context/constants/auth";

type Inputs = {
  password: string;
  email: string;
  fullName: string;
};

export default function UpdateName() {
  const { updateProfile } = useAuthActions();
  const user = auth.currentUser;
  const { state, dispatch } = useAuthContext();
  const { updated, updating, profile, error } = state;
  const [showPassord, setShowPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [reAuth, setReauth] = useState(false);
  const {
    handleSubmit,
    register,
    setError,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      fullName: profile?.fullName,
      email: profile?.email,
      password: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (profile?.email !== data.email && data.password === "") {
      setError("password", { type: "required" });
      setShowPassword(true);
      return;
    } else if (profile?.email !== data.email && data.password !== "") {
      //re-authenticate with old password and update
      if (user && profile) {
        const credential = EmailAuthProvider.credential(
          profile.email,
          data.password
        );
        reauthenticateWithCredential(user, credential)
          .then(() => {
            updateProfile(data);
            setReauth(true);
          })
          .catch((error) => {
            // An error ocurred
            dispatch({ type: SIGN_IN_FAIL, payload: error });
            return;
            // ...
          });
      }
    } else {
      updateProfile(data);
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
    if (updated && reAuth) {
      const credential = EmailAuthProvider.credential(
        getValues("email"),
        getValues("password")
      );
      if (user) {
        reauthenticateWithCredential(user, credential)
          .then(() => {
            setReauth(false);
          })
          .catch((error) => {
            // An error ocurred
            dispatch({ type: SIGN_IN_FAIL, payload: error });
            // ...
          });
      }
    }
  }, [updated]);
  return (
    <section className={``}>
      <p className={`font-semibold text-base mb-2 text-mainColor`}>
        Update profile
      </p>
      <div className="w-full mb-5">
        <label
          htmlFor="email"
          className="block mb-1 font-semibold text-sm text-mainColor"
        >
          Fullname
        </label>
        <div className="flex items-center  p-2 bg-white rounded-md border">
          <FaUser className="text-mainColor text-xl" />
          <input
            {...register("fullName", { required: true })}
            className="bg-transparent block w-full text-sm border-none outline-none px-2"
          />
        </div>
        {errors.fullName && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>
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
            readOnly={updated}
            className="bg-transparent text-sm block w-full border-none outline-none px-2"
          />
        </div>
        {errors.email && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>
      {showPassord && (
        <div className="w-full mb-7">
          <label
            htmlFor="password"
            className="block mb-1 font-semibold text-sm text-mainColor"
          >
            Password
          </label>
          <div className="flex items-center  p-2 bg-white rounded-md border relative">
            <MdLock className="text-mainColor text-2xl" />
            <input
              type={isPasswordVisible ? "text" : "password"}
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
      )}
      {updated && !updating && (
        <p className={`my-2 text-sm text-green-500`}>Profile updated!</p>
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
