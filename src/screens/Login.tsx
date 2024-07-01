// import React from 'react'
import LoginImg from "../assets/login.png";
import Image from "../components/Image";
import Logo from "../assets/logo.png";
import Btn from "../components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";

type Inputs = {
  password: string;
  email: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <main className="bg-white p-5 min-h-screen grid lg:grid-cols-2 gap-5">
      <section className="flex flex-col items-center gap-5">
        <Image
          path={Logo}
          width="w-[200px] lg:w-[300px]"
          height="h-[80px] lg:h-[120px]"
        />
        <Image
          path={LoginImg}
          width="w-[280px] lg:w-[500px]"
          height="h-[256px] lg:h-[450px]"
        />
        <h1 className="font-bold text-mainColor text-2xl lg:text-4xl">
          Welcome back!
        </h1>
      </section>
      <section className="flex items-center flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-[500px] p-5 lg:py-7 lg:px-12 w-full max-w-[450px] bg-white rounded-lg shadow-md"
        >
          <h3 className="text-mainColor font-semibold text-xl lg:text-2xl mb-1">
            Login to your account
          </h3>
          <p className="text-dark font-medium text-sm mb-8">
            Continue your journey to net zero carbon emission.
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
                className="bg-transparent border-none outline-none px-2"
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
            <div className="flex items-center  p-2 bg-white rounded-md border">
              <MdLock className="text-mainColor text-2xl" />
              <input
                type="password"
                {...register("password", { required: true })}
                className="bg-transparent border-none outline-none px-2"
              />
            </div>
            <Link
              to={"/sign-up"}
              className="font-medium block text-xs text-mainColor py-3 underline text-end"
            >
              Forgot password?
            </Link>
            {errors.password && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
          <Btn text="Login" />
          <Link
            to={"/sign-up"}
            className="font-medium block text-sm text-mainColor py-3 underline text-center"
          >
            Don't have an account? Sign Up
          </Link>
        </form>
      </section>
    </main>
  );
}
