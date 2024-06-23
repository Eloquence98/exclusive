import React from "react";
import { cloneElement } from "react";

function CategoryCard({ category: { name, icon } }) {
  return (
    <div className="transition-default flex flex-col items-center justify-center rounded border border-border bg-white py-4 text-black hover:border-primary hover:bg-primary hover:text-white">
      {cloneElement(icon, { className: "mb-4 h-12 w-12" })}
      <p>{name}</p>
    </div>
  );
}

export default CategoryCard;
