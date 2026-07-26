import { AccountSidebar } from "@/components/account/account-sidebar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { auth } from "@/domains/auth/auth";
import { redirect } from "next/navigation";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Defense in depth — middleware already protects /me,
  // this guards against direct access edge cases
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <aside className="md:w-64 md:shrink-0">
              <AccountSidebar user={session.user} />
            </aside>
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
