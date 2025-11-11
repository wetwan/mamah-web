/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
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
import { getOrders } from "@/src/api/product/route";
import { useAuth } from "@/context/userStore";

import { orderProps } from "@/src/types/tpes";

// 💡 Utility function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusClasses = (status: orderProps["status"]) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-700 font-semibold";
    case "pending":
    case "processing":
      return "bg-yellow-100 text-yellow-700 font-semibold";
    case "cancelled":
      return "bg-red-100 text-red-700 font-semibold";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const columns: ColumnDef<orderProps>[] = [
  {
    id: "sn",
    header: "S/N",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "_id",
    header: "Order Id",
    // 💡 Shorten the ID for better display
    cell: ({ row }) => (
      <span className="text-xs font-mono">
        {row.original._id.substring(0, 8)}...
      </span>
    ),
  },
  {
    accessorKey: "createdAt", // New column for sorting
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 flex items-center gap-1 "
      >
        Date <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="table-cell">{formatDate(row.original.createdAt)}</span>
    ),
  },
  {
    accessorKey: "shippingAddress.fullName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 flex items-center gap-1 "
      >
        Customer <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="table-cell">
        {row.original.shippingAddress.fullName}
      </span>
    ),
  },
  {
    accessorKey: "shippingAddress.email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 md:flex items-center gap-1 hidden "
      >
        Email <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="hidden md:table-cell text-xs">
        {row.original.shippingAddress.email}
      </span>
    ),
  },
  {
    accessorKey: "paymentMethod", // New column
    header: "Payment",
    cell: ({ row }) => (
      <span className="capitalize text-xs font-medium">
        {row.original.paymentMethod.replace("_", " ")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`capitalize text-xs px-2 py-1 rounded-full w-fit ${getStatusClasses(
          row.original.status
        )}`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => row.original.items.length,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 flex items-center gap-1 "
      >
        Total <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-bold text-sm">
        ₦{row.original.totalPrice.toFixed(2)}
      </span>
    ),
  },
];

const Orders = () => {
  const limit = 50;

  const { token } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(token!),
    enabled: !!token,
  });

  const orders = data?.orders ?? [];
  const totalPages = data?.totalPages ?? 1;

  const [page, setPage] = useState(1);


  const table = useReactTable({
    data: orders,
    columns,
    manualPagination: true, 
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: page - 1, // react-table is 0-based
        pageSize: limit,
      },
    },
    onPaginationChange: (updater) => {
      const nextPageIndex =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize: limit }).pageIndex
          : updater.pageIndex;

      setPage(nextPageIndex + 1);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!token) return null;

  return (
    <div>
      <div className="w-full py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:px-32 2xl:px-64 capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>Orders</p>
      </div>

      <div className="md:px-8 lg:px-16 xl:px-32 2xl:px-64 px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Order History</h2>

        <div className="rounded-md border overflow-x-auto">
          {isLoading && (
            <div className="p-6 text-center flex-1">Loading...</div>
          )}
          {isError && (
            <div className="p-6 text-center text-red-500">
              Error loading orders.
            </div>
          )}

          {!isLoading && !isError && orders && (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className="bg-gray-50 hover:bg-gray-50">
                    {hg.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="py-4 px-3 whitespace-nowrap text-xs font-semibold uppercase text-gray-700"
                      >
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

              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="cursor-pointer hover:bg-gray-50 transition-colors capitalize"
                      onClick={() => {
                        window.location.href = `/order/${row.original._id}`;
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="py-4 px-3 text-sm capitalize"
                        >
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
                      className="text-center py-10 text-lg text-gray-500 capitalize"
                    >
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {/* --- Pagination --- */}
        <div className="flex justify-end items-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Orders;
