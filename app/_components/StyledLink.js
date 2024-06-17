"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function StyledLink({ item }) {
  const pathname = usePathname();

  if (!item)
    return (
      <p className="flex justify-center items-center text-[9px] bg-gray-800 text-gray-300 p-2 rounded-md">
        a prop is missing{" "}
        <code className="bg-gray-900 text-green-500 p-1 rounded-md font-mono">
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
      } relative text-base font-normal text-nowrap transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:scale-x-0 before:bg-black before:transition-all before:duration-300 before:ease-in-out before:origin-left hover:before:origin-right hover:before:scale-x-100`}
    >
      {item?.name}
    </Link>
  );
}

export default StyledLink;
