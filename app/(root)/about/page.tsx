import Link from "next/link";

const About = () => {
  return (
    <div className="">
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>contact</p>
      </div>
      <div className="md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 mt-20 flex flex-col lg:flex-row  border gap-10 py-5"></div>
    </div>
  );
};

export default About;
