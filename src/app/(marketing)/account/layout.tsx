import { AccountSidebar } from "@/components/account/account-sidebar";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Left Column: Sidebar */}
          <aside className="md:col-span-1">
            <AccountSidebar />
          </aside>

          {/* Right Column: Main Content */}
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
