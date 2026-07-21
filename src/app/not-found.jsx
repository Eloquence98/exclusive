import Link from "next/link";

function NotFound() {
  return (
    <main className="mt-20 flex flex-col items-center justify-center space-y-6 px-4 text-center lg:mt-0 lg:h-[calc(100dvh-7.25rem)]">
      <h1 className="text-balance text-4xl font-semibold">
        This page could not be found :(
      </h1>
      <p>
        You may go back{" "}
        <Link href="/" className="text-primary hover:underline">
          home
        </Link>
        .
      </p>
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
