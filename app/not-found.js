import Link from "next/link";
import Button from "./_components/Button";

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
      <Button as="link" href="/">
        Go back home
      </Button>
    </main>
  );
}

export default NotFound;
