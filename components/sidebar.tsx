"use client";

import React from "react";
import Logo from "./logo";
import { X } from "lucide-react";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ setOpen }: Props) => {
  const menu = [
    { name: "home", link: "/" },
    { name: "shop", link: "/" },
    { name: "about", link: "/" },
    { name: "contact", link: "/" },
  ];
  return (
    <div className="top-0 absolute right-0 w-3/4 shadow-2xl h-screen bg-white py-20 p-6">
      <div className="flex items-center justify-between ">
        <Logo />
        <div className="" onClick={() => setOpen(false)}>
          <X />
        </div>
      </div>
      <ul className="mt-20 capitalize text-xl ">
        {menu.map((m) => (
          <li
            key={m.name}
            className="mt-2  py-4 cursor-pointer transition-all hover:text-neutral-800"
          >
            {m.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
