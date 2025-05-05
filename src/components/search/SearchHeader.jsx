"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

export default function SearchHeader({ initialQuery, resultsCount }) {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs size="sm" className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Search</BreadcrumbItem>
        <BreadcrumbItem>{initialQuery}</BreadcrumbItem>
      </Breadcrumbs>

      {/* Search header */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold">
          Search Results for &ldquo;{initialQuery}&rdquo;
        </h1>
        <p className="text-default-600">Found {resultsCount} items</p>
      </div>
    </>
  );
}
