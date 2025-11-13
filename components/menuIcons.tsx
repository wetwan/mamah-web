"use client";
import { Bell, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import Cart from "./cart";
import ProfileDropdown from "./profiledropdown";
import { Button } from "./ui/button";
import { useCart } from "@/context/cartStore";
import { useAuth } from "@/context/userStore";
import Notifications from "./notification";

const MenuIcons = () => {
  const [openCart, setOpenCart] = useState(false);
  const [notifyPanel, setNotifyPanel] = useState(false);
  const cartItems = useCart((state) => state.item);

  const { token } = useAuth();

  const cartnumber = cartItems.length;
  // const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <ul className="flex items-center gap-3 md:w-1/3 justify-end">
        <li className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1 ">
          <ProfileDropdown />
        </li>

        {!!token && (
          <li className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1 ">
            <Button
              variant="ghost"
              onClick={() => setNotifyPanel(!notifyPanel)}
              className="relative flex items-center  justify-center hover:bg-transparent "
            >
              <Bell
                size={54}
                strokeWidth={2.4}
                className="text-3xl scale-[1.6]"
              />
            </Button>
          </li>
        )}

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

          {cartnumber !== 0 && (
            <div className="absolute -top-4 -right-1 bg-green-500 w-6 h-6 text-center flex items-center justify-center rounded-full group-hover:-translate-x-3 transition-all text- ">
              {cartnumber}
            </div>
          )}
        </li>
      </ul>

      {openCart && <Cart setOpenCart={setOpenCart} />}
      {notifyPanel && <Notifications setOpenCart={setNotifyPanel} />}
      {/* {openProfile && <ProfileDropdown />} */}
    </>
  );
};

export default MenuIcons;
