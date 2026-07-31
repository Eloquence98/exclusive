export function PortfolioBanner() {
  return (
    <div className="flex w-full items-center justify-center border-b border-border bg-muted px-4 py-2 text-center text-xs text-muted-foreground">
      <span>
        <span className="mr-1 rounded-full bg-background px-2 py-0.5 font-medium text-foreground shadow-sm">
          Demo
        </span>
        This is a portfolio project. No payments are processed and no orders
        will be fulfilled.
      </span>
    </div>
  );
}
