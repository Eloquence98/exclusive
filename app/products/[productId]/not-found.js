import Link from "next/link";
import Button from "@/app/_components/Button";

function NotFound() {
  return (
    <main className="mt-20 flex flex-col items-center justify-center space-y-6 px-4 text-center lg:mt-0 lg:h-[calc(100dvh-7.25em)]">
      <h1 className="text-balance text-4xl font-semibold">
        The Product could not be found :(
      </h1>
      <p>
        You may go back to all{" "}
        <Link href="/" className="text-primary hover:underline">
          products
        </Link>
        .
      </p>
      <Button as="link" href="/products">
        Back to all products
      </Button>
    </main>
  );
}

export default NotFound;
