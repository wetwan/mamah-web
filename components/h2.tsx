/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

const H2 = ({ text, className }: { text: string; className: any }) => {
  return (
    <div
      className={`${className} flex flex-col justify-center w-fit px-3 py-2
     `}
    >
      <div className="w-12 h-0.5 rounded-full   bg-blue-800" />
      <h2 className="text-2xl  capitalize font-light mt-2 md:text-4xl md:mt-4 ">
        {text}
      </h2>
    </div>
  );
};

export default H2;
