/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LoginData, loginSchema } from "@/app/api/schema";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/app/api/route";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

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
      console.log("✅ Logged in:", data);
      // Example: redirect or save token
      router.back();
    },
  });

  const onSubmit = (data: LoginData) => {
    setServerError("");
    mutation.mutate(data);
  };

  return <div>Login</div>;
};

export default Login;
