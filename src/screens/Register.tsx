import { useState, useEffect } from "react";
import LoginImg from "../assets/login.png";
import Image from "../components/Image";
import Logo from "../assets/logo.png";
import Btn from "../components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useAuthActions } from "../context/actions/auth";
import { useAuthContext } from "../context/providers/auth";
import { useNavigate } from "react-router-dom";

type Inputs = {
  password: string;
  confirmPassword: string;
  email: string;
  fullName: string;
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useAuthContext();
  const { createProfile } = useAuthActions();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => createProfile(data);

  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      // console.log(state.user.uid);
      navigate(`/${state.user?.uid}/home`);
    }
  }, [state.isAuthenticated]);
  return (
    <main className="bg-white p-5 min-h-screen grid lg:grid-cols-2 gap-5">
      <section className="flex flex-col items-center gap-5">
        <Link to={"/"}>
          <Image
            path={Logo}
            width="w-[200px] lg:w-[300px]"
            height="h-[80px] lg:h-[120px]"
          />
        </Link>
        <Image
          path={LoginImg}
          width="w-[280px] lg:w-[500px]"
          height="h-[256px] lg:h-[450px]"
        />
        <h1 className="font-bold text-mainColor text-2xl lg:text-4xl">
          Welcome!
        </h1>
      </section>
      <section className="flex items-center flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-[600px] p-5 lg:py-7 lg:px-12 w-full max-w-[450px] bg-white rounded-lg shadow-md"
        >
          <h3 className="text-mainColor font-semibold text-xl lg:text-2xl mb-1">
            Create your account
          </h3>
          <p className="text-dark font-medium text-sm mb-8">
            Begin your journey to net zero carbon emission.
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
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
                className="bg-transparent text-sm block w-full border-none outline-none px-2"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
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
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                className="bg-transparent text-sm block w-[80%]  border-none outline-none px-2"
              />
              {!showPassword ? (
                <span
                  onClick={() => setShowPassword(true)}
                  className="absolute top-1/3 right-2"
                >
                  <FaEye className="text-mainColor" />
                </span>
              ) : (
                <span
                  onClick={() => setShowPassword(false)}
                  className="absolute top-1/3 right-2"
                >
                  <FaEyeSlash className="text-mainColor" />
                </span>
              )}
            </div>

            {errors.password && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="w-full mb-7">
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-sm text-mainColor"
            >
              Confirm password
            </label>
            <div className="flex items-center  p-2 bg-white rounded-md border relative">
              <MdLock className="text-mainColor text-2xl" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", { required: true })}
                className="bg-transparent text-sm block w-[80%] border-none outline-none px-2"
              />
              {!showConfirmPassword ? (
                <span
                  onClick={() => setShowConfirmPassword(true)}
                  className="absolute top-1/3 right-2"
                >
                  <FaEye className="text-mainColor" />
                </span>
              ) : (
                <span
                  onClick={() => setShowConfirmPassword(false)}
                  className="absolute top-1/3 right-2"
                >
                  <FaEyeSlash className="text-mainColor" />
                </span>
              )}
            </div>

            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
          <Btn text="Sign Up" isLoading={state.loading} />
          <Link
            to={"/login"}
            className="font-medium block text-sm text-mainColor py-3 underline text-center"
          >
            Already have an account? Login
          </Link>
        </form>
      </section>
    </main>
  );
}
