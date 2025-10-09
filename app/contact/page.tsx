import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>contact</p>
      </div>
      <div className="md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 mt-20 flex flex-col lg:flex-row  border gap-10 py-5">
        <div className="w-full lg:w-1/2 ">
          <h2 className="my-3 capitalize font-medium text-2xl">Get In Touch</h2>

          <div className="border px-3 py-5 md:px-6">
            <div className="flex flex-col md:flex-row capitalize gap-4">
              <div className="w-full mb-4">
                <label htmlFor="firstname">first name</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                  required
                  aria-label="firstname"
                  placeholder="enter your firstname"
                />
              </div>
              <div className="w-full mb-4">
                <label htmlFor="lastname">last name</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                  required
                  aria-label="lastname"
                  placeholder="enter your lastname"
                />
              </div>
            </div>
            <div className="flex flex-col capitalize gap-4">
              <div className="w-full mb-4">
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                  required
                  aria-label="email"
                  placeholder="enter your email"
                />
              </div>
              <div className="w-full mb-4">
                <label htmlFor="subject">subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                  aria-label="subject"
                  placeholder="enter your subject"
                />
              </div>
              <div className="w-full mb-4">
                <label htmlFor="subject">message</label>
                <textarea
                  name="message"
                  id="message"
                  className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded min-h-16 h-44 max-h-72"
                  aria-label="subject"
                  placeholder="enter your message please"
                />
              </div>
            </div>
            <button
              name="button"
              id="button"
              className="uppercase border w-full px-3 py-4 mt-3 outline-none border-[#7971ea] bg-[#7971ea] text-white transition-all duration-300 ease-in rounded"
              aria-label="firstname"
            >
              {" "}
              send message
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 ">
          <div className="border px-3 py-5 mt-14 md:px-6">
            <div className="flex flex-col  capitalize gap-4">
              <p className="text-[#7971ea]">New York</p>
              <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
