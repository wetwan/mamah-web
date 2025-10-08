"use client";
import { Heart, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import Cart from "./cart";
import ProfileDropdown from "./profiledropdown";
import { Button } from "./ui/button";

const MenuIcons = () => {
  const [openCart, setOpenCart] = useState(false);
  // const [openProfile, setOpenProfile] = useState(false);
  return (
    <>
      <ul className="flex items-center gap-3 md:w-1/3 justify-end">
        <li className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1 ">
          <ProfileDropdown />
        </li>
        <li className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1 ">
          <Button
            variant="ghost"
            className="relative flex items-center  justify-center hover:bg-transparent "
          >
            <Heart
              size={54}
              strokeWidth={2.4}
              className="text-3xl scale-[1.6]"
            />
          </Button>
        </li>
        <li
          className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1  relative group"
          onClick={() => setOpenCart(!openCart)}
        >
          <Button
            variant="ghost"
            className="relative flex items-center justify-center hover:bg-transparent "
          >
            {/* Bigger icon */}
            <ShoppingCart
              size={54}
              strokeWidth={2.4}
              className="text-3xl scale-[1.6]"
            />
          </Button>

          <div className="absolute -top-4 -right-1 bg-green-500 w-6 h-6 text-center flex items-center justify-center rounded-full group-hover:-translate-x-3 transition-all   ">
            2
          </div>
        </li>
      </ul>

      {openCart && <Cart setOpenCart={setOpenCart} />}
      {/* {openProfile && <ProfileDropdown />} */}
    </>
  );
};

export default MenuIcons;
