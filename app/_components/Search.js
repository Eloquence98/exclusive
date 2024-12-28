"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

function Search() {
  const queryRef = useRef(null);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  console.log("Search query", search);

  function handleSearchSubmit(event) {
    event.preventDefault();
    const query = queryRef.current.value;
    console.log(query);
    // router.push(`/search?q=${encodeURIComponent(query)}`, {
    router.push(`/search?q=${query.replace(/ /g, "-")}`, {
      scroll: false,
    });
  }
  return (
    <form noValidate onSubmit={handleSearchSubmit}>
      <div className="flex flex-1 items-center gap-4 rounded-smd bg-secondary py-2 pl-5 pr-3 text-sm shadow-sm focus-within:outline-black has-[:focus]:outline has-[:focus]:outline-1 has-[:focus]:outline-offset-2 has-[:focus]:outline-primary">
        <input
          ref={queryRef}
          defaultValue={search}
          type="text"
          id="search"
          placeholder="What are you looking for?"
          className="min-w-48 flex-grow border-none bg-transparent text-xs text-black placeholder:text-placeholder focus:outline-none"
        />
        <label htmlFor="search">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </label>
      </div>
    </form>
  );
}

export default Search;
