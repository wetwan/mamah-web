/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

export function PaginationDemo({
  currentPage,
  totalPages,
  queryParams = {},
}: {
  currentPage: number;
  totalPages: number;
  queryParams?: Record<string, string | number>;
}) {
  // Keep existing filters in URL
  const makeUrl = (page: number) => {
    const params = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(queryParams).filter(([key]) => key !== "page")
      ),
      page: page.toString(),
    });
    return `/shop?${params.toString()}`;
  };

  const pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 1)
  );

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? makeUrl(currentPage - 1) : "#"}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={makeUrl(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pagesToShow.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={makeUrl(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={makeUrl(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? makeUrl(currentPage + 1) : "#"}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
