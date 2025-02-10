export const metadata = {
  title: "Explore Exclusive",
};

async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q;
  console.log(`Query on search page ${query}`);
  return (
    <div className="search">
      <h1>SEARCH PAGE</h1>
    </div>
  );
}

export default Page;
