
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Sucess = () => {
  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>sucees</p>
      </div>
      <div className="md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 flex flex-col items-center justify-center border h-[calc(100vh-230px)]">
        <CheckCircle2Icon color="green" className="text-5xl" size={120} />

        <h1 className="my-4 font-bold leading-relaxed tracking-widest text-black text-6xl">
          {" "}
          Thank you!
        </h1>
        <p className="mb-5 font-light  text-gray-500">
          {" "}
          You order was successfuly completed.
        </p>

        <Link
          href={"/"}
          className="w-fit px-7 py-4 uppercase border  bg-[#7971ea]"
        >
          back to shop
        </Link>
      </div>
    </div>
  );
};

export default Sucess;
