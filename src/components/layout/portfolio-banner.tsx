export function PortfolioBanner() {
  return (
    <div className="w-full bg-zinc-950 px-4 py-2 text-center text-xs text-zinc-400">
      <span>
        This is a{" "}
        <span className="font-semibold text-zinc-200">portfolio project</span> —
        not a real store. No payments are processed and no orders will be
        fulfilled.{" "}
        <span className="text-muted-foreground">
          Built to demonstrate production-grade frontend engineering.
        </span>
      </span>
    </div>
  );
}
