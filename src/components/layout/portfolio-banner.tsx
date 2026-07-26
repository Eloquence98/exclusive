export function PortfolioBanner() {
  return (
    <div className="w-full bg-primary px-4 py-2 text-center text-xs text-primary-foreground/70">
      <span>
        This is a{" "}
        <span className="font-semibold text-primary-foreground">
          portfolio project
        </span>{" "}
        — not a real store. No payments are processed and no orders will be
        fulfilled.{" "}
        <span className="text-muted-foreground">
          Built to demonstrate production-grade frontend engineering.
        </span>
      </span>
    </div>
  );
}
