"use client";

import Link from "next/link";
import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>profile</p>
      </div>
    </div>
  );
};

export default Profile;
