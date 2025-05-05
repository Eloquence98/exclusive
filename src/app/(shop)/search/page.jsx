import SearchResults from "@/components/search/SearchResults";

export const metadata = {
  title: "Search Results | Exclusive",
  description: "Browse our exclusive collection of clothing and accessories",
};

export default function SearchPage({ searchParams }) {
  const query = searchParams?.q || "";

  return <SearchResults initialQuery={query} />;
}
