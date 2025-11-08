/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "./ui/button";
// import { ShopdataProp } from "@/constant";
// import { useCart } from "@/context/cartStore";
// import { useRouter } from "next/navigation";

// const ProductDetails = ({ item }: { item: ShopdataProp }) => {
//   const [selectedcolor, setSelectedcolor] = useState<any>(null);
//   const [selectedSize, setSelectedSize] = useState(0);
//   const [addQuanitity, setAddQuanitity] = useState(1);

//   const addProduct = useCart((state) => state.addProduct);

//   const router = useRouter();

//   useEffect(() => {
//     if (item?.colors?.length > 0) {
//       setSelectedcolor(item.colors[0]);
//     }
//   }, [item]);

//     if (!item) {
//     return (
//       <div className="h-[500px] w-full flex items-center justify-center">
//         <p>Loading product...</p>
//       </div>
//     );
//   }

//   if (!item.colors || item.colors.length === 0) {
//     return (
//       <div className="h-[500px] w-full flex items-center justify-center">
//         <p>No colors available for this product</p>
//       </div>
//     );
//   }

//   const add = () => {
//    if (!selectedcolor || addQuanitity === 0) return;

//     try {
//       addProduct(
//         item,
//         selectedcolor.name,
//         item.sizes[selectedSize],
//         addQuanitity
//       );
//       router.push("/cart");
//       setSelectedSize(0);
//       setAddQuanitity(1);
//       setSelectedcolor(item.colors[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!selectedcolor) {
//     return (
//       <div className="h-[500px] w-full bg-gray-100 flex items-center justify-center">
//         <p>No image available</p>
//       </div>
//     );
//   }

//   return (
//     item && (
//       <div className="flex flex-col gap-5">
//         <h1 className="font-bold capitalize text-2xl lg:text-3xl ">
//           {item.name}
//         </h1>
//         <hr />
//         <p className="text-gray-500 w-4/6 whitespace-pre-wrap break-all  h-auto ">
//           {item.description}
//         </p>
//         <hr />

//         {/* price  */}

//         <div className="flex items-center gap-3">
//           {item.price !== item.finalPrice && (
//             <p className="text-gray-500 line-through text-md">
//               ₦{item.price.toFixed(2)}
//             </p>
//           )}
//           <p className="text-2xl font-semibold text-blue-600 p-1 cursor-pointer">
//             ₦{item.finalPrice.toFixed(2)}
//           </p>
//         </div>

//         {/* colors  */}

//         <div>
//           <h5 className="font-semibold uppercase text-gray-500">
//             Choose a color
//           </h5>

//           <div className="flex items-center mt-5 gap-5">
//             {item.colors.map((color, i) => (
//               <div
//                 key={color._id}
//                 onClick={() => setSelectedcolor(item.colors[i])}
//                 className={`relative flex items-center justify-center ${
//                   selectedcolor._id === color._id
//                     ? "border h-7 w-7 rounded-full ring-1 ring-blue-600"
//                     : ""
//                 }`}
//               >
//                 <button
//                   disabled={!color.available}
//                   style={{ backgroundColor: color.name }}
//                   className={`relative w-4 h-4 border rounded-full flex items-center justify-center
//             ${
//               !color.available
//                 ? "cursor-not-allowed opacity-50"
//                 : "cursor-pointer"
//             }
//           `}
//                 >
//                   {!color.available && (
//                     <span className="absolute w-[2px] h-7 bg-red-500 rotate-45"></span>
//                   )}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* size  */}
//         <div className="mt-4 w-full">
//           <h5 className="font-semibold uppercase text-gray-500">
//             choose a size
//           </h5>

//           <div className="flex items-center mt-5 gap-5 capitalize border-dashed">
//             {item.sizes.map((size, i) => (
//               <Button
//                 className={`uppercase hover:bg-transparent cursor-pointer ${
//                   selectedSize === i
//                     ? "bg-blue-600 text-white hover:bg-blue-600 border-blue-600"
//                     : "bg-transparent text-black  border"
//                 }  `}
//                 key={i}
//                 onClick={() => setSelectedSize(i)}
//               >
//                 {size}
//               </Button>
//             ))}
//           </div>
//         </div>

//         {/* count  */}
//         <div className="mt-4">
//           <h5 className="font-semibold uppercase text-gray-500">
//             choose a Quantity
//           </h5>

//           <div className="flex lg:items-center mt-5 max-lg:gap-7 flex-col lg:flex-row capitalize w-full justify-between">
//             <div className="flex items-center gap-5">
//               <div className="flex items-center border w-max px-4 rounded-full  gap-10 justify-between py-1 bg-gray-200 text-lg ">
//                 <button
//                   className={`text-2xl font-semibold p-1 transition-colors ${
//                     addQuanitity === 0
//                       ? "text-gray-400 cursor-not-allowed"
//                       : "text-blue-600 hover:text-[#7971ea]"
//                   }`}
//                   disabled={addQuanitity === 0}
//                   onClick={() => setAddQuanitity((prev) => prev - 1)}
//                 >
//                   -
//                 </button>
//                 <span>{addQuanitity}</span>
//                 <button
//                   className={`text-2xl font-semibold p-1 transition-colors ${
//                     addQuanitity === item.stock
//                       ? "text-gray-400 cursor-not-allowed"
//                       : "text-blue-600 hover:text-[#7971ea]"
//                   }`}
//                   disabled={addQuanitity === item.stock}
//                   onClick={() => setAddQuanitity((prev) => prev + 1)}
//                 >
//                   +
//                 </button>
//               </div>
//               <div className="">
//                 {item.stock < 10 && (
//                   <p className="text-gray-400 text-sm leading-tight">
//                     only{" "}
//                     <span className="text-blue-600 ">{item.stock} items </span>
//                     left in stock <br /> dont miss out
//                   </p>
//                 )}
//               </div>
//             </div>

//             <Button
//               onClick={add}
//               variant="outline"
//               className="uppercase hover:bg-transparent hover:text-none bg-transparent shadow-none border-blue-500 text-blue-500 rounded-full px-7 py-5 max-lg:w-fit"
//             >
//               add to cart
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default ProductDetails;

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ShopdataProp } from "@/constant";
import { useCart } from "@/context/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProductDetails = ({ item }: { item: ShopdataProp }) => {
  const [selectedcolor, setSelectedcolor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [addQuanitity, setAddQuanitity] = useState<number>(1);

  const addProduct = useCart((state) => state.addProduct);
  const router = useRouter();

  useEffect(() => {
    if (item?.colors?.length > 0) {
      setSelectedcolor(item.colors[0]);
    }
  }, [item]);

  if (!item) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  const add = () => {
    if (addQuanitity === 0 || !selectedcolor) return;

    addProduct(item, addQuanitity, selectedcolor, selectedSize);

    router.push("/cart");
    toast.success("Product added to cart!");
    setSelectedSize(0);
    setAddQuanitity(1);
    if (item.colors?.length > 0) setSelectedcolor(item.colors[0]);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold capitalize text-2xl lg:text-3xl ">
        {item.name}
      </h1>
      <hr />
      <p className="text-gray-500 w-4/6 whitespace-pre-wrap break-all h-auto">
        {item.description}
      </p>
      <hr />

      {/* PRICE */}
      <div className="flex items-center gap-3">
        {item.price !== item.finalPrice && (
          <p className="text-gray-500 line-through text-md">
            ₦{item?.price?.toFixed(2)}
          </p>
        )}
        <p className="text-2xl font-semibold text-blue-600 p-1 cursor-pointer">
          ₦{item?.finalPrice?.toFixed(2)}
        </p>
      </div>

      {/* COLORS */}
      {item.colors?.length > 0 ? (
        <div>
          <h5 className="font-semibold uppercase text-gray-500">
            Choose a color
          </h5>
          <div className="flex items-center mt-5 gap-5">
            {item.colors.map((color, i) => (
              <div
                key={color._id}
                onClick={() => setSelectedcolor(item.colors[i])}
                className={`relative flex items-center justify-center ${
                  selectedcolor?._id === color._id
                    ? "border h-7 w-7 rounded-full ring-1 ring-blue-600"
                    : ""
                }`}
              >
                <button
                  disabled={!color.available}
                  style={{ backgroundColor: color.name }}
                  className={`relative w-4 h-4 border rounded-full flex items-center justify-center ${
                    !color.available
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  {!color.available && (
                    <span className="absolute w-[2px] h-7 bg-red-500 rotate-45"></span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">No colors available</p>
      )}

      {/* SIZES */}
      {item.sizes?.length > 0 ? (
        <div className="mt-4 w-full">
          <h5 className="font-semibold uppercase text-gray-500">
            Choose a size
          </h5>
          <div className="flex items-center mt-5 gap-5 capitalize border-dashed">
            {item.sizes.map((size, i) => (
              <Button
                className={`uppercase hover:bg-transparent cursor-pointer ${
                  selectedSize === i
                    ? "bg-blue-600 text-white hover:bg-blue-600 border-blue-600"
                    : "bg-transparent text-black border"
                }`}
                key={i}
                onClick={() => setSelectedSize(i)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic mt-4">No sizes available</p>
      )}

      {/* QUANTITY */}
      <div className="mt-4">
        <h5 className="font-semibold uppercase text-gray-500">
          Choose a Quantity
        </h5>
        <div className="flex lg:items-center mt-5 max-lg:gap-7 flex-col lg:flex-row capitalize w-full justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center border w-max px-4 rounded-full gap-10 justify-between py-1 bg-gray-200 text-lg">
              <button
                className={`text-2xl font-semibold p-1 transition-colors ${
                  addQuanitity === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-[#7971ea]"
                }`}
                disabled={addQuanitity === 0}
                onClick={() => setAddQuanitity((prev) => prev - 1)}
              >
                -
              </button>
              <span>{addQuanitity}</span>
              <button
                className={`text-2xl font-semibold p-1 transition-colors ${
                  addQuanitity === item.stock
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-[#7971ea]"
                }`}
                disabled={addQuanitity === item.stock}
                onClick={() => setAddQuanitity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <div>
              {item.stock < 10 && (
                <p className="text-gray-400 text-sm leading-tight">
                  only <span className="text-blue-600">{item.stock} items</span>{" "}
                  left in stock — don’t miss out
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={add}
            variant="outline"
            className="uppercase bg-transparent border-blue-500 text-blue-500 rounded-full px-7 py-5 max-lg:w-fit"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
