import Link from "next/link";
import React from "react";
import image from "@/public/mamah.png";
import Image from "next/image";
import H2 from "@/components/h2";

const About = () => {
  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>sucees</p>
      </div>
      <div className="md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 mt-20 flex flex-col lg:flex-row lg:h-[calc(100vh-500px)] border gap-10 py-5">
        <div className="w-full lg:w-1/2  relative">
          <Image src={image} alt="about" sizes="" fill className=""/>
        </div>
        <div className="w-full lg:w-1/2 border">
        <H2 text="How We Started" className='flex items-start' />
        </div>
      </div>
    </div>
  );
};

export default About;
