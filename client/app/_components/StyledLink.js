"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function StyledLink({ item }) {
  const pathname = usePathname();

  if (!item)
    return (
      <p className="flex items-center justify-center rounded-md bg-gray-800 p-2 text-[9px] text-gray-300">
        a prop is missing{" "}
        <code className="rounded-md bg-gray-900 p-1 font-mono text-green-500">
          {" "}
          {`{href: "value", name: "value"}`}{" "}
        </code>{" "}
      </p>
    );
  return (
    <Link
      href={item?.href}
      className={`${
        pathname === item?.href ? "before:scale-x-100" : ""
      } relative text-nowrap text-base font-normal transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-black before:transition-all before:duration-300 before:ease-in-out hover:before:origin-right hover:before:scale-x-100`}
    >
      {item?.name}
    </Link>
  );
}

export default StyledLink;
