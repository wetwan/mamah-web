"use client";

import { useAuth } from "@/context/userStore";
import React from "react";

const Returing = () => {
  const { token } = useAuth();

  return (
    <div>
      {!token && (
        <div className="mt-10 border py-7 px-3">
          <p className="font-light">
            Returning customer?{" "}
            <a className="text-[#7971ea]" href={"/login"}>
              Click here{" "}
            </a>{" "}
            to login
          </p>
        </div>
      )}
    </div>
  );
};

export default Returing;
