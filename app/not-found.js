import Link from "next/link";
import Button from "./_components/Button";

function NotFound() {
  return (
    <main className="mt-20 flex items-center justify-center flex-col text-center space-y-6 lg:mt-0 lg:h-[calc(100dvh-7.25em)] px-4">
      <h1 className="text-4xl font-semibold text-balance">
        This page could not be found :(
      </h1>
      <p>
        You may go back{" "}
        <Link href="/" class="text-primary hover:underline">
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
