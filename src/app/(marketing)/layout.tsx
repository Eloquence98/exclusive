import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* 
        flex-1 ensures the main content area grows to fill available space, 
        pushing the footer to the bottom even on pages with little content.
      */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
