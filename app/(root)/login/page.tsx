/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LoginData, loginSchema } from "@/app/api/schema";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { useAuth } from "@/context/userStore";
import { loginUser } from "@/app/api/route";

const Login = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  const setUser = useAuth((s) => s.setUser);
  const settoken = useAuth((s) => s.setToken);
  const isLoggedIn = useAuth((s) => !!s.token);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.message || "Login failed");
      } else {
        setServerError("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      if (data.token && data.user) {
        setUser(data.user);
        settoken(data.token);
      }
      router.push("/");
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
    console.log("isLoggedIn");
  }, [isLoggedIn, router]);

  const onSubmit = (data: LoginData) => {
    setServerError("");
    mutation.mutate(data);
  };

  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        <span>/</span> <p>login</p>
      </div>
      <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 h-[calc(100vh-300px)]">
        <div className=" w-full h-full flex items-center justify-center flex-col">
          <form
            className="border shadow p-5 relative flex flex-col items-center justify-center md:px-16 pb-0"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h1 className="my-10 font-bold uppercase text-4xl tracking-wider">
              login
            </h1>

            <div className="mb-5">
              <div className="bg-gray-300 flex  gap-3 items-center pl-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
                <Mail size={20} color="gray" />
                <input
                  placeholder="email"
                  className="placeholder:capitalize outline-none py-5 w-full"
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
                  className="placeholder:capitalize outline-none py-5 w-full"
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
            {serverError && (
              <p className="text-red-500 text-sm self-start mb-3">
                {serverError}
              </p>
            )}

            <button
              className="bg-[#7971ea] text-white hover:bg-white  hover:text-[#7971ea] border hover:border-[#7971ea] flex  gap-3  px-3 md:w-[400px] w-[300px] mb-6 py-4 text-center capitalize font-bold items-center justify-center text-lg "
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Logging in..." : "Login"}
            </button>
            <p className=" flex  gap-3  px-3 md:w-[400px] w-[300px] mt-20 py-5 text-center  font-light items-center justify-center  \\">
              Not a user yet{" "}
              <Link href={"/signUp"} className="text-[#7971ea]">
                {" "}
                Sign up!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
