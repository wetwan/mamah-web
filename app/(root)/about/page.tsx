/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import H2 from "@/components/h2";
import { CircleQuestionMark, RotateCw, TruckIcon } from "lucide-react";
import image from "@/public/mamah.png";
import { useSearchParams } from "next/navigation";

// Client component
const AboutContent = () => {
  const searchParams = useSearchParams(); // client hook safe here
  const redirect = searchParams.get("redirect") || "/";

  const policy = [
    { id: 1, title: "Free Shipping", context: "...", icon: <TruckIcon size={40} /> },
    { id: 2, title: "Customer Support", context: "...", icon: <CircleQuestionMark size={40} /> },
    { id: 3, title: "Free Returns", context: "...", icon: <RotateCw size={40} /> },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="w-full py-6 bg-[#f8f9fa] md:px-8 lg:px-16 2xl:px-64 capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">home</Link> / <p>about</p>
      </div>

      {/* Main section */}
      <div className="md:px-8 lg:px-16 2xl:px-64 px-4 mt-20 flex flex-col lg:flex-row lg:h-[calc(100vh-300px)] border gap-10 py-5">
        <div className="w-full md:w-1/2 mx-auto max-lg:h-[400px] lg:w-1/2 relative">
          <Image src={image} alt="about" fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="w-full lg:w-1/2">
          <H2 text="How We Started" className="flex items-start m-3" />
          <div className="p-4 px-7 flex flex-col gap-4 font-light text-gray-600">
            <p>...content...</p>
            <p>...content...</p>
          </div>
        </div>
      </div>

      {/* Policy section */}
      <div className="md:px-8 lg:px-16 2xl:px-64 px-4 mt-20 flex flex-col lg:flex-row border gap-6 items-center justify-between py-5">
        {policy.map((p) => (
          <div key={p.id} className="flex gap-5 flex-row">
            <p className="text-[#7971ea]">{p.icon}</p>
            <div>
              <h4 className="font-bold text-2xl mb-4">{p.title}</h4>
              <h4>{p.context}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Page component
export default function AboutPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}
