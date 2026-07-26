export const metadata = {
  title: "Shipping & Returns",
};

const shippingOptions = [
  {
    method: "Standard Shipping",
    timeframe: "5–7 business days",
    cost: "Free on orders over $100. $8.99 otherwise.",
  },
  {
    method: "Expedited Shipping",
    timeframe: "2–3 business days",
    cost: "$14.99 flat rate.",
  },
  {
    method: "Overnight Shipping",
    timeframe: "Next business day",
    cost: "$24.99 flat rate.",
  },
];

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">
          Shipping & Returns
        </h1>
        <p className="text-base text-muted-foreground">
          Everything you need to know about how we ship and how to return an
          item.
        </p>
      </div>

      {/* Shipping */}
      <section className="mb-16">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Shipping Options
        </h2>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Method
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Timeframe
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {shippingOptions.map((option) => (
                <tr key={option.method}>
                  <td className="px-4 py-4 font-medium text-foreground">
                    {option.method}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {option.timeframe}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {option.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-4 text-sm text-muted-foreground">
          <p>
            All orders are processed within 1–2 business days. Orders placed on
            weekends or public holidays are processed the next business day.
          </p>
          <p>
            Once your order ships, you will receive a tracking link via email.
            You can also track your order at any time using your order number.
          </p>
        </div>
      </section>

      {/* Returns */}
      <section className="mb-16">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Return Policy
        </h2>

        <div className="space-y-6 text-sm text-muted-foreground">
          <p>
            We want you to love what you ordered. If something isn&lsquo;t
            right, we make returns simple.
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <p className="mb-1 font-medium text-foreground">
                30-Day Return Window
              </p>
              <p>
                Items can be returned within 30 days of the delivery date. Items
                must be unworn, unwashed, and in their original condition with
                all tags attached.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="mb-1 font-medium text-foreground">
                Free Return Shipping
              </p>
              <p>
                We provide a prepaid return shipping label for all eligible
                returns. Contact support to initiate a return and we&lsquo;ll
                email your label within 24 hours.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="mb-1 font-medium text-foreground">
                Refund Timeline
              </p>
              <p>
                Refunds are processed within 5–7 business days of receiving your
                returned item. You&lsquo;ll receive an email confirmation once
                the refund is issued.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Non-returnable */}
      <section className="mb-16">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Non-Returnable Items
        </h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Fragrances and beauty products (once opened)",
            "Underwear and swimwear (for hygiene reasons)",
            "Items marked as Final Sale at time of purchase",
            "Items that have been worn, washed, or damaged after delivery",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
        <p className="mb-2 text-sm font-medium text-foreground">
          Need help with a return?
        </p>
        <p className="text-sm text-muted-foreground">
          Email us at{" "}
          <a
            href="mailto:support@exclusive.com"
            className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
          >
            support@exclusive.com
          </a>{" "}
          with your order number and we&apos;ll take care of the rest.
        </p>
      </div>
    </div>
  );
}
