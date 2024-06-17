import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function Search() {
  return (
    <div className="has-[:focus]:outline has-[:focus]:outline-1 has-[:focus]:outline-offset-2 has-[:focus]:outline-primary flex-1 flex items-center gap-4 text-sm bg-secondary py-2 pl-5 pr-3 rounded-smd shadow-sm focus-within:outline-black">
      <input
        type="text"
        id="search"
        placeholder="What are you looking for?"
        className="placeholder:text-placeholder min-w-48 text-xs flex-grow bg-transparent border-none text-black focus:outline-none "
      />
      <label htmlFor="search">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </label>
    </div>
  );
}

export default Search;
