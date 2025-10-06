"use client";

import React, { useState } from "react";
import Logo from "./logo";
import SearchBox from "./search";
import MenuIcons from "./menuIcons";
import { LucideMenu } from "lucide-react";
import Sidebar from "./sidebar";
import MenuLink from "./menu";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-56 md:h-44 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 ">
      <div className="mt-14 sm:hidden border-b ">
        <div className="flex items-center mb-5 justify-center">
          <Logo />
        </div>
        <div className="flex items-center justify-center gap-2 ">
          <SearchBox />
          <MenuIcons />
          <div
            className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 ml-5"
            onClick={() => setOpen(true)}
          >
            <LucideMenu />
          </div>
        </div>
      </div>

      <div className="md:flex hidden flex-col justify-center items-center  mt-6 py-2 ">
        <div className="flex items-center justify-between  w-full">
          <SearchBox />
          <div className="md:w-1/3 flex items-center justify-center">
            <Logo />
          </div>

          <MenuIcons />
        </div>
        <hr className="bg-green-600 w-full my-4" />
        <div className="">
          <MenuLink />
        </div>
      </div>
      {open && <Sidebar setOpen={setOpen} />}
    </header>
  );
};

export default Nav;
