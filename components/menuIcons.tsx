import { Heart, ShoppingBasket, User } from "lucide-react";
import React from "react";

const MenuIcons = () => {
  return (
    <ul className="flex items-center gap-3 md:w-1/3 justify-end">
      <li className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1 ">
        <User />
      </li>
      <li className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1 ">
        <Heart />
      </li>
      <li className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1  relative group">
        <ShoppingBasket />
        <div className="absolute -top-4 -right-1 bg-green-500 w-6 h-6 text-center flex items-center justify-center rounded-full group-hover:-translate-x-3 transition-all   ">
          2
        </div>
      </li>
    </ul>
  );
};

export default MenuIcons;
