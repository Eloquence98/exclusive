import Link from "next/link";
import React from "react";
import { cloneElement } from "react";

function CategoryCard({ category: { name, pathname, query, icon } }) {
  return (
    <Link
      href={{
        pathname,
        query: { category: query },
      }}
      className="transition-default flex flex-col items-center justify-center rounded border border-border bg-white py-4 text-black hover:border-primary hover:bg-primary hover:text-white"
    >
      {cloneElement(icon, { className: "mb-4 size-12" })}
      <p>{name}</p>
    </Link>
  );
}

export default CategoryCard;
