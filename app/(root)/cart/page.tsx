/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
export const dynamic = "force-dynamic"; 

import Link from "next/link";
import React, { useMemo, useEffect } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
// Assuming CartItem, useCart, and the full path are correct
// import { CartItem, useCart } from "@/context/cartStore";
import { X } from "lucide-react";

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CartItem, useCart } from "@/context/cartStore";

// --- START: COLUMNS DEFINITION ---

// Define the columns array, incorporating the product image and a remove button
export const columns: ColumnDef<CartItem>[] = [
  {
    id: "sn",
    header: "S/N",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },

  {
    accessorKey: "product.images",
    header: () => (
      <Button variant="ghost" className="p-0 flex items-center gap-1 ">
        Image
      </Button>
    ),
    // Use the Next.js Image component for proper image display
    cell: ({ row }) => (
      <Image
        src={row.original.product.images[0]}
        alt={row.original.product.name}
        width={50}
        height={50}
        className="w-14 h-14 object-cover rounded-md"
      />
    ),
  },
  {
    accessorKey: "product.name",
    header: () => (
      <Button variant="ghost" className="p-0 flex items-center gap-1 ">
        Title
      </Button>
    ),
    cell: ({ row }) => (
      <span className="table-cell capitalize">{row.original.product.name}</span>
    ),
  },
  {
    // Changed "product." accessorKey to product.finalPrice for displaying the unit price
    accessorKey: "product.finalPrice",
    header: () => (
      <Button variant="ghost" className="p-0 flex items-center gap-1 ">
        Price
      </Button>
    ),
    cell: ({ row }) => (
      <span className="table-cell">
        ₦{row.original.product.finalPrice.toFixed(2)}
      </span>
    ),
  },
  {
    // Changed column header and accessor key to reflect "Quantity"
    accessorKey: "quantity",
    header: () => (
      <Button variant="ghost" className="p-0 flex items-center gap-1 ">
        Quantity
      </Button>
    ),
    cell: ({ row }) => (
      <span className="table-cell">{row.original.quantity}</span>
    ),
  },
  {
    accessorKey: "selectedColor.name", // Use the direct accessor key
    header: () => (
      <Button variant="ghost" className="p-0 flex items-center gap-1 ">
        Color
      </Button>
    ),
    cell: ({ row }) => (
      <span className="table-cell capitalize">
        {row.original.selectedColor?.name || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "selectedSize", // Use the direct accessor key
    header: () => (
      <Button variant="ghost" className="p-0 flex items-center gap-1 ">
        Size
      </Button>
    ),
    cell: ({ row }) => (
      <span className="table-cell uppercase">
        {row.original.selectedSize || "N/A"}
      </span>
    ),
  },
  {
    id: "total",
    header: () => (
      <Button variant="ghost" className="p-0 flex items-center gap-1 ">
        Total
      </Button>
    ),
    cell: ({ row }) => (
      <span className="table-cell font-semibold">
        ₦{(row.original.quantity * row.original.product.finalPrice).toFixed(2)}
      </span>
    ),
  },
  {
    id: "remove",
    header: "Remove",
    cell: ({ row, table }) => {
      const removeItem = (
        table.options.meta as { removeItem: (id: string | number) => void }
      ).removeItem;

      return (
        <button
          onClick={() => removeItem(row.original.id)} // Assuming CartItem has an 'id'
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          <X className="w-5 h-5" />
        </button>
      );
    },
  },
];

const CartPage = () => {
  const { removeProduct: removeItem, item: cartProducts } = useCart();
  const router = useRouter();

  // Redirect if cart is empty. Using useEffect for client-side redirection.
  // useEffect(() => {
  //   if (cartProducts.length === 0) {
  //     router.replace("/shop");
  //   }
  // }, [cartProducts, router]);

  const subtotal = useMemo(() => {
    return cartProducts.reduce(
      (acc, item) => acc + item.product.finalPrice * item.quantity,
      0
    );
  }, [cartProducts]);

  const delivery = 10;
  const total = subtotal + delivery;

  const table = useReactTable({
    data: cartProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Pass the removeItem function via the `meta` option
    meta: {
      removeItem,
    },
  });

  // Since we redirect for an empty cart, no need to render the rest of the page if cartProducts is empty.
  if (cartProducts.length === 0) {
    return null; // Or a loading spinner while redirecting
  }

  return (
    <div className="min-h-screen">
      <div className="w-full py-6 bg-[#f8f9fa] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center gap-2 capitalize font-medium">
        <Link href="/" className="text-[#7971ea]  ">
          Home
        </Link>
        <span>/</span>
        <p>Cart</p>
      </div>

      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <section className="mt-20">
          <Table
            style={{
              borderBlock: 1,
            }}
          >
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="py-4">
                  {hg.headers.map((header) => (
                    <TableHead key={header.id} className="py-4 px-3">
                      {header.isPlaceholder
                        ? null
                        : typeof header.column.columnDef.header === "function"
                        ? header.column.columnDef.header({
                            table,
                            column: header.column,
                            header,
                          })
                        : header.column.columnDef.header}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="py-2">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  // Added key prop to TableRow
                  <TableRow key={row.id} className="py-2">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2 px-3">
                        {typeof cell.column.columnDef.cell === "function"
                          ? cell.column.columnDef.cell(cell.getContext())
                          : cell.getValue()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-6"
                  >
                    No items in your cart.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Bottom Section: Promo Code and Totals */}
          <div className="mt-10 flex flex-col md:flex-row justify-between gap-10 w-full">
            {/* Promo Code */}
            <div className="flex-1">
              <p className="text-[#555] mb-2">
                If you have a promo code, enter it here
              </p>
              <div className="flex bg-[#ebebeb] rounded overflow-hidden">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 bg-transparent outline-none pl-3 py-2 placeholder:text-gray-500"
                />
                <button className="bg-[#7971ea] text-white px-5 py-2 hover:bg-[#7971ea]">
                  Apply
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="flex-1 bg-white border rounded-lg shadow-md p-5">
              <h2 className="capitalize text-xl font-semibold mb-4">
                Cart Totals
              </h2>
              <div className="flex justify-between py-2 border-b">
                <p>Subtotal</p>
                <p>₦{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between py-2 border-b">
                <p>Delivery</p>
                <p>₦{delivery.toFixed(2)}</p>
              </div>
              <div className="flex justify-between py-2 font-semibold text-lg">
                <p>Total</p>
                <p>₦{total.toFixed(2)}</p>
              </div>
              <button
                className="w-full bg-[#7971ea] text-white py-3 mt-4 rounded hover:bg-[#7971ea] uppercase tracking-wide"
                onClick={() => {
                  router.push("/checkout");
                }}
                disabled={cartProducts.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;
