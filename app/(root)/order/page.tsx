/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
export const dynamic = "force-dynamic"; 

import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

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

export interface orderProps {
  _id: string;
  items: Array<{
    name: string;
    qty: number;
    price: number;
    image: string;
  }>;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paymentMethod: "card" | "cash_on_delivery";
  status: "pending" | "processing" | "delivered" | "cancelled";
  shippingAddress: {
    fullName: string;
    address1: string;
    country: string;
    state?: string;
    email?: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt?: string;
  isDelivered?: boolean;
  isPaid?: boolean;
  paidAt?: string | null;
  deliveredAt?: string | null;
  user: string;
}

// 💡 Utility function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// 💡 Utility function for status styling
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

const orders: orderProps[] = [
  // ... (Your existing orders array goes here, I've omitted it for brevity)
  {
    createdAt: "2025-10-17T16:33:10.596Z",
    deliveredAt: "2025-11-06T08:13:55.496Z",
    isDelivered: true,
    isPaid: false,
    items: [
      {
        name: "Unbranded Plastic Chips",
        qty: 1,
        price: 441,
        image: "https://picsum.photos/seed/SphBUW6d/645/2781?grayscale&blur=9",
      },
      {
        name: "Licensed Metal Chips",
        qty: 1,
        price: 169,
        image: "https://picsum.photos/seed/J2tu3/3658/2777?blur=9",
      },
    ],
    itemsPrice: 610,
    paidAt: null,
    paymentMethod: "card",
    shippingAddress: {
      address1: "10249 E 14th Street",
      country: "United States Minor Outlying Islands",
      email: "Jessyca19@yahoo.com",
      fullName: "Dr. Dana Abbott",
      phone: "801-594-0186",
      state: "Rhode Island",
    },
    shippingPrice: 17,
    status: "pending",
    taxPrice: 31,
    totalPrice: 658,
    updatedAt: "2025-11-06T01:48:14.717Z",
    user: "a574d3f4-6853-44bb-89f2-251f749cac66",
    _id: "9ce098b6-2cff-48ca-92a8-1256656f5216",
  },
  {
    createdAt: "2025-10-03T19:54:47.887Z",
    deliveredAt: null,
    isDelivered: false,
    isPaid: false,
    items: [
      {
        image: "https://picsum.photos/seed/xzkICoAw8o/3594/2939?blur=6",
        name: "Tasty Wooden Mouse",
        price: 241,
        qty: 3,
      },
      {
        image: "https://picsum.photos/seed/zC3Ag9hdfv/3636/2570?grayscale",
        name: "Frozen Bamboo Table",
        price: 472,
        qty: 3,
      },
      {
        image: "https://picsum.photos/seed/5Z1Wc/2978/3506?blur=8",
        name: "Small Rubber Pants",
        price: 416,
        qty: 1,
      },
    ],
    itemsPrice: 2555,
    paidAt: null,
    paymentMethod: "cash_on_delivery",
    shippingAddress: {
      address1: "8020 Tromp Plaza",
      country: "Netherlands",
      email: "Tiffany_Sipes@yahoo.com",
      fullName: "Nelson Nader DVM",
      phone: "939.842.7914 x55374",
      state: "Louisiana",
    },
    shippingPrice: 14,
    status: "cancelled",
    taxPrice: 128,
    totalPrice: 2697,
    updatedAt: "2025-11-06T00:57:44.759Z",
    user: "425dde51-86eb-4f65-92fd-9e703fab13ed",
    _id: "ec203055-2ae7-4942-9b3d-df7d46d5c69e",
  },
  {
    createdAt: "2025-10-03T21:42:52.860Z",
    deliveredAt: null,
    isDelivered: false,
    isPaid: false,
    items: [
      {
        name: "Ergonomic Metal Cheese",
        qty: 1,
        price: 252,
        image: "https://picsum.photos/seed/RO3bGjIy0M/30/2446?grayscale&blur=9",
      },
      {
        name: "Elegant Steel Shoes",
        qty: 3,
        price: 108,
        image: "https://picsum.photos/seed/cvgeThXxh/2826/2424?blur=8",
      },
    ],
    itemsPrice: 576,
    paidAt: null,
    paymentMethod: "cash_on_delivery",
    shippingAddress: {
      address1: "957 Wehner Run",
      country: "Aruba",
      email: "Keshawn_Macejkovic16@yahoo.com",
      fullName: "Pauline Stoltenberg",
      phone: "1-911-735-7115",
      state: "Alabama",
    },
    shippingPrice: 7,
    status: "pending",
    taxPrice: 29,
    totalPrice: 612,
    updatedAt: "2025-11-06T01:58:49.797Z",
    user: "87a33c73-ce8a-4a5d-84b4-9ccda014ebc7",
    _id: "a3931cb8-bf65-4506-a766-3d95b9514ed3",
  },
  {
    createdAt: "2025-10-31T07:15:40.238Z",
    deliveredAt: null,
    isDelivered: false,
    isPaid: false,
    items: [
      {
        name: "Luxurious Gold Pants",
        qty: 3,
        price: 213,
        image: "https://picsum.photos/seed/QazgFeR/3282/2524?blur=3",
      },
    ],
    itemsPrice: 639,
    paidAt: null,
    paymentMethod: "cash_on_delivery",
    shippingAddress: {
      address1: "967 Derby Road",
      country: "Chad",
      email: "Robyn92@gmail.com",
      fullName: "Natalie Nitzsche-Morar",
      phone: "732-759-3656",
      state: "Massachusetts",
    },
    shippingPrice: 18,
    status: "delivered",
    taxPrice: 32,
    totalPrice: 689,
    updatedAt: "2025-11-06T06:31:10.900Z",
    user: "b777e83b-965a-4206-b487-bddcf49d1d88",
    _id: "aad4d34e-6f0a-4d0b-bdfe-829799ce3dc5",
  },
  {
    createdAt: "2025-06-07T14:32:49.597Z",
    deliveredAt: null,
    isDelivered: false,
    isPaid: false,
    items: [
      {
        name: "Small Gold Bacon",
        qty: 1,
        price: 454,
        image: "https://picsum.photos/seed/6eX2s/3669/386?grayscale&blur=8",
      },
    ],
    itemsPrice: 454,
    paidAt: null,
    paymentMethod: "card",
    shippingAddress: {
      address1: "44763 Leonor Path",
      country: "Cyprus",
      email: "Winifred_Bogisich@gmail.com",
      fullName: "Shannon Corwin",
      phone: "(347) 551-9508 x8534",
      state: "Iowa",
    },
    shippingPrice: 14,
    status: "processing",
    taxPrice: 23,
    totalPrice: 491,
    updatedAt: "2025-11-06T08:20:17.283Z",
    user: "64859a4e-31c2-4a6f-8d5f-2321dd3b7f31",
    _id: "a1ab9655-1735-4ebc-ae66-35753b10b0a0",
  },
  {
    createdAt: "2025-04-11T19:07:37.859Z",
    deliveredAt: null,
    isDelivered: false,
    isPaid: true,
    items: [
      {
        name: "Incredible Ceramic Table",
        qty: 2,
        price: 344,
        image: "https://picsum.photos/seed/dTZBc2O1/3071/1644?blur=8",
      },
      {
        name: "Elegant Silk Hat",
        qty: 2,
        price: 305,
        image: "https://picsum.photos/seed/mv6UPue/701/2239?blur=6",
      },
      {
        name: "Sleek Gold Bike",
        qty: 1,
        price: 99,
        image: "https://picsum.photos/seed/1r6iok/2571/3593?grayscale&blur=1",
      },
      {
        name: "Fresh Marble Hat",
        qty: 3,
        price: 265,
        image: "https://picsum.photos/seed/6Rqz8/2862/2924?blur=7",
      },
    ],
    itemsPrice: 2192,
    paidAt: "2025-09-13T01:50:13.951Z",
    paymentMethod: "cash_on_delivery",
    shippingAddress: {
      address1: "53626 County Line Road",
      country: "Bangladesh",
      email: "Jake.Stamm21@yahoo.com",
      fullName: "Tami Strosin",
      phone: "356.638.6745",
      state: "Texas",
    },
    shippingPrice: 9,
    status: "cancelled",
    taxPrice: 110,
    totalPrice: 2311,
    updatedAt: "2025-11-05T22:09:28.489Z",
    user: "6a2881bc-5e7b-4aab-9f13-fa53abbace3e",
    _id: "6de1222a-1482-4e7a-85c9-dd091d49c20a",
  },
];

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

const fetchOrders = async (): Promise<orderProps[]> => {
  // Simulate network delay (optional)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return orders; // Return your static data
};

const Orders = () => {
  const limit = 50;

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<orderProps[]>({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
  });

  // Since you're not using TanStack Query for data fetching,
  // the 'page' state is not controlling server-side pagination.
  // I've kept it but commented on its true purpose in this client-side code.
  // const [page, setPage] = useState(1);

  const router = useRouter(); // Assuming you have imported useRouter

  // State is no longer needed since filtering is not implemented client-side
  // const [globalFilter, setGlobalFilter] = useState("");
  // const [debouncedFilter, setDebouncedFilter] = useState("");
  const [sortOrder, setSortorder] = useState("all");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleSetSortOrder = (newStatus: any) => {
    if (newStatus !== sortOrder) {
      setSortorder(newStatus);
      // setPage(1); // Reset page to 1 when status filter changes - only relevant for server-side
    }
  };

  const table = useReactTable({
    data: orders ?? [],
    columns,
    // Client-side pagination settings for demo purposes
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: limit,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        // Navigate to the details page on row click
                        // router.push(`/order/${row.original._id}`);
                        // If router is not available, use Link or window.location
                        window.location.href = `/order/${row.original._id}`;
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4 px-3 text-sm">
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
                      className="text-center py-10 text-lg text-gray-500"
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

// You need to import useRouter from 'next/navigation' if you use it.
// If not, remove the import and the line `const router = useRouter();`
const useRouter = () => ({
  push: (path: string) => console.log("Navigating to:", path),
});

export default Orders;
