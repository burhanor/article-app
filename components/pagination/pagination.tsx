"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleDto } from "@/models/Article";
import Link from "next/link";
import React from "react";

export interface PaginationContainer<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
}

interface PaginationProps {
  paginationData: PaginationContainer<ArticleDto>;
  url?: string;
  paginationParam?: string;
}

function PaginationComponent({
  paginationData,
  url,
  paginationParam,
}: PaginationProps) {
  const { pageNumber, totalCount, totalPages, hasPreviousPage, hasNextPage } =
    paginationData;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis logic
      if (pageNumber <= 3) {
        // Show first pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (pageNumber >= totalPages - 2) {
        // Show last pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push("...");
        for (let i = pageNumber - 1; i <= pageNumber + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const targetUrl = url ?? "";
  const paginationUrl = paginationParam ?? "";

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Total count display */}
      <div className="text-sm text-muted-foreground">
        Toplam{" "}
        <span className="font-semibold text-foreground">{totalCount}</span>{" "}
        makale bulundu
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <Link
          className={!hasPreviousPage ? "pointer-events-none" : ""}
          href={
            pageNumber - 1 <= 1
              ? `/${targetUrl}`
              : `/${targetUrl}${paginationUrl}${pageNumber - 1}`
          }
        >
          <Button
            variant="outline"
            size="sm"
            disabled={!hasPreviousPage}
            className="flex items-center space-x-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Önceki</span>
          </Button>
        </Link>
        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-muted-foreground">...</span>
              ) : (
                <Link
                  href={
                    page === 1
                      ? `/${targetUrl}`
                      : `/${targetUrl}${paginationUrl}${page}`
                  }
                >
                  <Button
                    variant={page === pageNumber ? "default" : "outline"}
                    size="sm"
                    className={`min-w-[40px] ${
                      page === pageNumber
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-muted"
                    }`}
                  >
                    {page}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Next button */}
        <Link
          className={!hasNextPage ? "pointer-events-none" : ""}
          href={`/${targetUrl}${paginationUrl}${pageNumber + 1}`}
        >
          <Button
            variant="outline"
            size="sm"
            disabled={!hasNextPage}
            className="flex items-center space-x-1"
          >
            <span>Sonraki</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PaginationComponent;
