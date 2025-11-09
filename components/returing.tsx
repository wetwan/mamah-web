"use client";

import React from "react";

const Returing = () => {
  return (
    <div>
      <div className="mt-10 border py-7 px-3">
        <p className="font-light">
          Returning customer?{" "}
          <a className="text-[#7971ea]" href={"/login"}>
            Click here{" "}
          </a>{" "}
          to login
        </p>
      </div>
    </div>
  );
};

export default Returing;
