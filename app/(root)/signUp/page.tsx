/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const dynamic = "force-dynamic";

import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Eye,
  EyeClosed,
  Lock,
  MapIcon,
  Phone,
  User,
  MapPin,
  Flag,
  Mail,
  House,
} from "lucide-react";
import { useAuth } from "@/context/userStore";

import { signUpSchema, singUpData } from "@/src/api/auth/schema";
import { signUpUser } from "@/src/api/auth/route";

const SignUp = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  const form = useForm<singUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const { setUser, setToken } = useAuth();

  const isLoggedIn = useAuth((s) => !!s.token);

  const [firstPart, setFirstPart] = useState(true);

  const mutation = useMutation({
    mutationFn: signUpUser,
    onError: (error: any) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log(error);
        setServerError(error.response?.data?.message || "sign up failed");
      } else {
        setServerError("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      if (data.accessToken && data.user) {
        setUser(data.user);
        setToken(data.accessToken);
      }

      router.push("/");
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const onSubmit = (data: singUpData) => {
    setServerError("");
    mutation.mutate(data);
  };

  const nextStep = async () => {
    const firstPartFields: Array<keyof singUpData> = [
      "firstName",
      "lastName",
      "email",
      "password",
      "phone",
    ];

    const isValid = await form.trigger(firstPartFields);

    if (isValid) {
      setFirstPart(false);
    }
  };

  const previousStep = () => {
    setFirstPart(true); // Move back to the first part
  };

  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        <span>/</span> <p>sign up</p>
      </div>
      <div
        className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mt-20
       "
      >
        <div className=" w-full h-full flex items-center justify-center flex-col">
          <div className="">
            {/* <form
            className="border shadow p-5 relative flex flex-col items-center justify-center md:px-16 pb-0"
            // onSubmit={form.handleSubmit(onSubmit)}
            // onSubmit={firstPart ? nextStep : form.handleSubmit(onSubmit)}
          >
            <h1 className="mt-6 font-bold uppercase text-4xl tracking-wider justify-self-start w-full">
              sign up
            </h1>
            <h1 className="my-2 mb-6 text-gray-600 text-xs tracking-wider justify-self-start  w-full">
              Please enter your persoanl information to continue
            </h1>

            <div className="mb-3">
              <div className="bg-gray-300 flex  gap-3 items-center pl-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                <User size={20} color="gray" />
                <input
                  placeholder="first name"
                  className="placeholder:capitalize outline-none py-3 w-full px-2"
                  type="text"
                  {...form.register("firstName")}
                />
              </div>
              {form.formState.errors.firstName && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <div className="bg-gray-300 flex  gap-3 items-center pl-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                <User size={20} color="gray" />
                <input
                  placeholder="last name"
                  className="placeholder:capitalize outline-none py-3 w-full px-2"
                  type="text"
                  {...form.register("lastName")}
                />
              </div>
              {form.formState.errors.lastName && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <div className="bg-gray-300 flex  gap-3 items-center pl-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                <Mail size={20} color="gray" />
                <input
                  placeholder="email"
                  className="placeholder:capitalize outline-none py-3 w-full px-2"
                  type="email"
                  {...form.register("email")}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <div className="bg-gray-300 flex  gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                <Lock size={20} color="gray" />
                <input
                  placeholder="password"
                  className="placeholder:capitalize outline-none py-3 w-full px-2"
                  {...form.register("password")}
                  type={passwordShow ? "text" : "password"}
                />
                <p onClick={() => setPasswordShow((prev) => !prev)}>
                  {passwordShow ? (
                    <EyeClosed size={20} color="gray" />
                  ) : (
                    <Eye size={20} color="gray" />
                  )}
                </p>
              </div>
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <div className="bg-gray-300 flex  gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                <Phone size={20} color="gray" />
                <input
                  placeholder="phone"
                  className="placeholder:capitalize outline-none py-3 w-full px-2"
                  {...form.register("phone")}
                  type="text"
                />
              </div>
              {form.formState.errors.phone && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
            {/* <div className="mb-5">
              <div className="bg-gray-300 flex  gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                <MapIcon size={20} color="gray" />
                <input
                  placeholder="address"
                  className="placeholder:capitalize outline-none py-3 w-full px-2"
                  {...form.register("address")}
                  type="text"
                />
              </div>
              {form.formState.errors.address && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div> */}

            {/*           {serverError && (
              <p className="text-red-500 text-sm self-start mb-3">
                {serverError}
              </p>
            )}

            <button
              className="bg-[#7971ea] text-white hover:bg-white  hover:text-[#7971ea] border hover:border-[#7971ea] flex  gap-3  px-3 md:w-[400px] w-[300px] mb-6 py-4 text-center capitalize font-bold items-center justify-center text-lg"
              type="submit"
              disabled={firstPart}
              // disabled={mutation.isPending}
            >
              {/* {mutation.isPending ? "signing up..." : "sign up"} */}

            {/* 
              continue
            </button>
            <p className=" flex  gap-3  px-3 md:w-[400px] w-[300px] mt-20 py-5 text-center  font-light items-center justify-center  \\">
              Already a member{" "}
              <Link href={"/login"} className="text-[#7971ea] capitalize">
                {" "}
                Sign in!
              </Link>
            </p>
          </form> */}
          </div>
          <form
            className="border shadow p-5 relative flex flex-col items-center justify-center md:px-16 pb-0"
            // Only submit the form on the final step
            onSubmit={firstPart ? nextStep : form.handleSubmit(onSubmit)}
          >
            <div className="flex w-full items-center gap-4">
              {!firstPart && (
                <button
                  type="button"
                  onClick={previousStep}
                  className="bg-gray-400 text-white hover:bg-gray-500 flex gap-3 p-2 rounded-full text-center  font-bold items-center justify-center text-lg"
                >
                  <ChevronLeft />
                </button>
              )}
              <h1 className="font-bold uppercase text-4xl tracking-wider justify-self-start w-full">
                sign up
              </h1>
            </div>

            <h1 className="my-2 mb-6 text-gray-600 text-xs tracking-wider justify-self-start w-full">
              {firstPart
                ? "Please enter your personal information to continue"
                : "Please enter your address details to finish"}
            </h1>

            {/* --- PART 1: PERSONAL DETAILS (Conditional Rendering) --- */}
            {firstPart && (
              <>
                <div className="mb-3">
                  <div className="bg-gray-300 flex gap-3 items-center pl-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                    <User size={20} color="gray" />
                    <input
                      placeholder="first name"
                      className="placeholder:capitalize outline-none py-3 w-full px-2"
                      type="text"
                      {...form.register("firstName")}
                    />
                  </div>
                  {form.formState.errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <div className="bg-gray-300 flex  gap-3 items-center pl-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                    <User size={20} color="gray" />
                    <input
                      placeholder="last name"
                      className="placeholder:capitalize outline-none py-3 w-full px-2"
                      type="text"
                      {...form.register("lastName")}
                    />
                  </div>
                  {form.formState.errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <div className="bg-gray-300 flex  gap-3 items-center pl-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                    <Mail size={20} color="gray" />
                    <input
                      placeholder="email"
                      className="placeholder:capitalize outline-none py-3 w-full px-2"
                      type="email"
                      {...form.register("email")}
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <div className="bg-gray-300 flex  gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                    <Lock size={20} color="gray" />
                    <input
                      placeholder="password"
                      className="placeholder:capitalize outline-none py-3 w-full px-2"
                      {...form.register("password")}
                      type={passwordShow ? "text" : "password"}
                    />
                    <p onClick={() => setPasswordShow((prev) => !prev)}>
                      {passwordShow ? (
                        <EyeClosed size={20} color="gray" />
                      ) : (
                        <Eye size={20} color="gray" />
                      )}
                    </p>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <div className="bg-gray-300 flex  gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                    <Phone size={20} color="gray" />
                    <input
                      placeholder="phone"
                      className="placeholder:capitalize outline-none py-3 w-full px-2"
                      {...form.register("phone")}
                      type="text"
                    />
                  </div>
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* --- PART 2: ADDRESS DETAILS (Conditional Rendering) --- */}
            {!firstPart && (
              <>
                <div className="mb-5">
                  <div className="bg-gray-300 flex gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                    <House size={20} color="gray" />
                    <input
                      placeholder="address"
                      className="placeholder:capitalize outline-none py-3 w-full px-2"
                      {...form.register("address")}
                      type="text"
                    />
                  </div>
                  {form.formState.errors.address && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <div className="bg-gray-300 flex gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                    <House size={20} color="gray" />
                    <input
                      placeholder="address2"
                      className="placeholder:capitalize outline-none py-3 w-full px-2"
                      {...form.register("address2")}
                      type="text"
                    />
                  </div>
                  {form.formState.errors.address2 && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.address2.message}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <div className="bg-gray-300 flex gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                    <MapIcon size={20} color="gray" />
                    <input
                      placeholder="state"
                      className="placeholder:capitalize outline-none py-3 w-full px-2"
                      {...form.register("state")}
                      type="text"
                    />
                  </div>
                  {form.formState.errors.state && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.state.message}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <div className="bg-gray-300 flex gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                    <MapPin size={20} color="gray" />
                    <input
                      placeholder="poster"
                      className="placeholder:capitalize outline-none py-3 w-full px-2"
                      {...form.register("poster")}
                      type="text"
                    />
                  </div>
                  {form.formState.errors.poster && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.poster.message}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <div className="bg-gray-300 flex gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                    <Flag size={20} color="gray" />
                    <input
                      placeholder="country"
                      className="placeholder:capitalize outline-none py-3 w-full px-2"
                      {...form.register("country")}
                      type="text"
                    />
                  </div>
                  {form.formState.errors.country && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.country.message}
                    </p>
                  )}
                </div>

            
              </>
            )}

            {serverError && (
              <p className="text-red-500 text-sm self-start mb-3">
                {serverError}
              </p>
            )}

            {/* --- ACTION BUTTON --- */}
            <button
              className="bg-[#7971ea] text-white hover:bg-white hover:text-[#7971ea] border hover:border-[#7971ea] flex gap-3 px-3 md:w-[400px] w-[300px] mb-6 py-4 text-center capitalize font-bold items-center justify-center text-lg"
              type={firstPart ? "button" : "submit"}
              onClick={firstPart ? nextStep : undefined}
            >
              {firstPart ? "Continue" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
