"use client";

import { useAuth } from "@/context/userStore";
import Link from "next/link";
import React from "react";

const Returing = () => {
  const isLoggedIn = useAuth((s) => !!s.token);
  return (
    <div>
      {!isLoggedIn && (
        <div className="mt-10 border py-7 px-3">
          <p className="font-light">
            Returning customer?{" "}
            <Link className="text-[#7971ea]" href={"/"}>
              Click here{" "}
            </Link>{" "}
            to login
          </p>
        </div>
      )}
    </div>
  );
};

export default Returing;
