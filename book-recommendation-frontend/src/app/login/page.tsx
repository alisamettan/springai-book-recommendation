"use client";

import { Inputs, UserContext } from "@/context/usercontext";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const { submitHandler } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col">
            <label className="text-xl text-gray-700">Email</label>
            <input
              className={`h-12 rounded-md px-4 mt-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              {...register("email", {
                required: "Email field is required!",
                pattern: {
                  value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
                  message: "Please enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-700 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-xl text-gray-700">Password</label>
            <input
              className={`h-12 rounded-md px-4 mt-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              type="password"
              {...register("password", {
                required: "Password field is required!",
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-700 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="pt-3 text-center">
            <button
              type="submit"
              color="primary"
              className="px-10 py-3 bg-blue-500 rounded-lg text-white disabled:opacity-50"
              disabled={!isValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
