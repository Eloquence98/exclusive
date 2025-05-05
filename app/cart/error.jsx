"use client";
export default function Error({ error, reset }) {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong with your cart!</h1>
      <p className="text-lg">
        {" "}
        {error.message || "We couldn't process your request. Please try again."}{" "}
      </p>

      <button
        className="bg-accent-500 inline-block px-6 py-3 text-lg text-primary-800"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
