import { MissingProductEmptyState } from "@/components/ui/empty-state";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <MissingProductEmptyState />
    </div>
  );
}
