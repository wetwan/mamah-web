import React from "react";
import image1 from "@/public/image1.png";
import image2 from "@/public/image2.png";
import image3 from "@/public/image3.png";

const Hero = () => {
  const banner = [
    {
      image: image1,
      text: "",
      link: "/shop",
    },
    {
      image: image2,
      text: "",
      link: "/shop",
    },
    {
      image: image3,
      text: "",
      link: "/shop",
    },
  ];

  return (
    <div className=" h-[calc(100vh - 224px)] md:h-[calc(100vh-176px)] relative bg-amber-600"></div>
  );
};

export default Hero;
