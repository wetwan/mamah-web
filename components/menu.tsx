"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const MenuLink = () => {
  const pathname = usePathname();

  const menu = [
    { name: "home", link: "/" },
    { name: "shop", link: "/shop" },
    { name: "about", link: "/about" },
    { name: "contact", link: "/contact" },
  ];
  return (
    <div className="flex  gap-10 mt-3 uppercase  font-normal ">
      {menu.map((m) => (
        <nav key={m.name}>
          <Link
            href={m.link}
            className={`link ${pathname === m.link ? "text-blue-900" : "text-gray-500"}`}
          >
            {m.name}
          </Link>
        </nav>
      ))}
    </div>
  );
};

export default MenuLink;
