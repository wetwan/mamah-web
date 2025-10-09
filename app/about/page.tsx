import Link from "next/link";
import React from "react";
import image from "@/public/mamah.png";
import Image from "next/image";
import H2 from "@/components/h2";
import { CircleQuestionMark, RotateCw, TruckIcon } from "lucide-react";

const About = () => {
  const policy = [
    {
      id: 1,
      title: "Free Shipping",
      context:
        "Free Shipping Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.",
      icon: <TruckIcon size={40} />,
    },
    {
      id: 3,
      title: "Free Returns",
      context:
        "Free Shipping Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.",
      icon: <RotateCw size={40} />,
    },
    {
      id: 2,
      title: "Customer Support",
      context:
        "Free Shipping Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.",
      icon: <CircleQuestionMark size={40} />,
    },
  ];
  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>sucees</p>
      </div>
      <div className="md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 mt-20 flex flex-col lg:flex-row lg:h-[calc(100vh-300px)] border gap-10 py-5">
        <div className="w-full md:w-1/2 mx-auto  max-lg:h-[400px] lg:w-1/2  relative">
          <Image src={image} alt="about" sizes="" fill className="" />
        </div>
        <div className="w-full lg:w-1/2 ">
          <H2 text="How We Started" className="flex items-start m-3" />

          <div className="p-4 px-7 flex flex-col gap-4 font-light text-gray-600">
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
              repellat, dicta at laboriosam, nemo exercitationem itaque eveniet
              architecto cumque, deleniti commodi molestias repellendus quos
              sequi hic fugiat asperiores illum. Atque, in, fuga excepturi
              corrupti error corporis aliquam unde nostrum quas.
            </p>
            <p className="">
              Accusantium dolor ratione maiores est deleniti nihil? Dignissimos
              est, sunt nulla illum autem in, quibusdam cumque recusandae,
              laudantium minima repellendus.
            </p>
          </div>
        </div>
      </div>
      <div className="md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 mt-20 flex flex-col lg:flex-row  border gap-6 items-center justify-between py-5">
        {policy.map((policy) => (
          <div key={policy.id} className="flex gap-5 flex-row">
            <p className="text-[#7971ea]">{policy.icon}</p>
            <div className="">
              <h4 className="font-bold text-2xl mb-4">{policy.title}</h4>
              <h4>{policy.context}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
