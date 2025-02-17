// "use client";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useRef } from "react";

// function Search() {
//   const queryRef = useRef(null);

//   const router = useRouter();
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const search = searchParams.get("q");
//   console.log("Search query", search);

//   function handleSearchSubmit(event) {
//     event.preventDefault();
//     const query = queryRef.current.value;
//     console.log(query);
//     // router.push(`/search?q=${encodeURIComponent(query)}`, {
//     router.push(`/search?q=${query.replace(/ /g, "-")}`, {
//       scroll: false,
//     });
//   }
//   return (
//     <form noValidate onSubmit={handleSearchSubmit}>
//       <div className="flex flex-1 items-center gap-4 rounded-smd bg-secondary py-2 pl-5 pr-3 text-sm shadow-sm focus-within:outline-black has-[:focus]:outline has-[:focus]:outline-1 has-[:focus]:outline-offset-2 has-[:focus]:outline-primary">
//         <input
//           ref={queryRef}
//           defaultValue={search}
//           type="text"
//           id="search"
//           placeholder="What are you looking for?"
//           className="min-w-48 flex-grow border-none bg-transparent text-xs text-black placeholder:text-placeholder focus:outline-none"
//         />
//         <label htmlFor="search">
//           <MagnifyingGlassIcon className="h-5 w-5" />
//         </label>
//       </div>
//     </form>
//   );
// }

// export default Search;
"use client";
import { Input } from "@heroui/react";

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function Search() {
  return (
    <Input
      classNames={{
        base: "max-w-full sm:max-w-[15rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="search..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
    />
  );
}
