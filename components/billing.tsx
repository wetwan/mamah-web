"use client";

import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";

const Billing = () => {
  const [newUser, setNewUser] = useState(false);
  return (
    <div className="w-full">
      <h2 className="my-3 capitalize font-medium text-2xl"> Billing details</h2>
      <div className="border px-3 py-5 md:px-6">
        <div className="capitalize flex flex-col gap-4 font-light text-black">
          <div className="w-full mb-4">
            <label htmlFor="">country</label>
            <input
              type="text"
              name="country"
              id="country"
              className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
              required
              aria-label="country"
              placeholder="enter your country"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
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
          <div className="flex flex-col gap-4">
            <div className="w-full mb-4">
              <label htmlFor="address">address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                required
                aria-label="address"
                placeholder="street address"
              />

              <input
                type="text"
                name="address2"
                id="address2"
                className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                required
                aria-label="address2"
                placeholder="enter your apartment, suite, unit etc. (optional)"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full mb-4">
              <label htmlFor="state">state</label>
              <input
                type="text"
                name="state"
                id="state"
                className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                required
                aria-label="state"
                placeholder="enter your state"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="poster/zip">poster / zip</label>
              <input
                type="text"
                name="poster/zip"
                id="poster/zip"
                className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                required
                aria-label="poster/zip"
                placeholder="enter your poster / zip"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full mb-4">
              <label htmlFor="email">email address</label>
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
              <label htmlFor="phone">phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                required
                aria-label="phone"
                placeholder="enter your phone"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center gap-3">
            <Checkbox onClick={() => setNewUser(!newUser)} />{" "}
            <p className="font-light">Create an account?</p>
          </div>
          {newUser && (
            <div className="">
              <p className="leading-relaxed text-sm my-3 text-gray-500">
                Create an account by entering the information below. If you are
                a returning customer please login at the top of the page.
              </p>
              <div className="w-full mb-4 capitalize">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                  required
                  aria-label="password"
                  placeholder="enter your password"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
