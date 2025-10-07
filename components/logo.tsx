"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="text-neutral-700 flex items-center justify-center border-neutral-500 uppercase text-[20px] my-2 p-4 py-2  border-2 rounded cursor-pointer tracking-wide"
      onClick={() => {
        router.push("/");
        scrollTo(0, 0);
      }}
    >
      uam closets
    </div>
  );
};

export default Logo;
