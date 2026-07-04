import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Column: Brand Imagery (Hidden on mobile) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-zinc-900 p-12 text-white lg:flex">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop"
          alt="Atelier Brand"
          fill
          className="object-cover opacity-40"
          priority
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-white"
          >
            ATELIER
          </Link>

          <div className="max-w-md space-y-6">
            <blockquote className="text-3xl font-medium leading-tight tracking-tight">
              &ldquo;True luxury is found in the details, the materials, and the
              timeless nature of the design.&rdquo;
            </blockquote>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">
                The Atelier Philosophy
              </p>
              <p className="text-xs text-zinc-400">
                Crafting essentials for the modern wardrobe since 2020.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form Area */}
      <div className="flex flex-col bg-background">
        {/* Mobile Logo */}
        <div className="border-b border-border p-6 lg:hidden">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            ATELIER
          </Link>
        </div>

        {/* Form Container */}
        <main className="flex flex-1 items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-sm space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
