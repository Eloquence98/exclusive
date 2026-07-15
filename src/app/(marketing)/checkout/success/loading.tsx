import { Skeleton } from "@/components/ui/skeleton";

export default function SuccessLoading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
        <div className="space-y-8">
          {/* Confirmation Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Skeleton className="h-16 w-16 rounded-full" />

            <div className="space-y-3">
              <Skeleton className="mx-auto h-10 w-64" />
              <Skeleton className="mx-auto h-5 w-80 max-w-full" />
            </div>

            <Skeleton className="h-9 w-44 rounded-lg" />
          </div>

          {/* Status */}
          <div className="rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>

          {/* Items Card */}
          <div className="rounded-xl border border-border p-6">
            <Skeleton className="mb-5 h-5 w-32" />

            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-lg" />

                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-16" />
                  </div>

                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-3 border-t border-border pt-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex justify-between border-t border-border pt-3">
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>

          {/* Payment + Shipping */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item} className="rounded-xl border border-border p-6">
                <Skeleton className="mb-4 h-5 w-28" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            ))}
          </div>

          {/* Account CTA */}
          <div className="flex flex-col gap-4 rounded-xl border border-border p-6 sm:flex-row sm:items-center">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-full max-w-md" />
            </div>

            <Skeleton className="h-9 w-32 rounded-md" />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Skeleton className="h-12 w-full rounded-lg sm:w-36" />
            <Skeleton className="h-12 w-full rounded-lg sm:w-44" />
          </div>
        </div>
      </main>
    </div>
  );
}
