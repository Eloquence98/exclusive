import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductAccordions() {
  return (
    <Accordion
      type="single"
      collapsible
      className="mt-8 w-full border-t border-border pt-8"
    >
      <AccordionItem value="description" className="border-border">
        <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:text-foreground">
          Description
        </AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
          <p>
            Crafted from the finest Grade-A Mongolian cashmere, this crewneck
            sweater offers unparalleled softness and warmth. The relaxed yet
            tailored silhouette ensures a perfect drape, making it an essential
            layering piece for transitional weather. Features include ribbed
            cuffs, hem, and a reinforced collar to maintain its shape over time.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>100% Grade-A Mongolian Cashmere</li>
            <li>Relaxed, true-to-size fit</li>
            <li>Ribbed trims for structure</li>
            <li>Dry clean only</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="shipping" className="border-border">
        <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:text-foreground">
          Shipping Information
        </AccordionTrigger>
        <AccordionContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="font-medium text-foreground">
              Complimentary Standard Shipping:
            </strong>{" "}
            Free on all orders over $100. Delivered within 5-7 business days.
          </p>
          <p>
            <strong className="font-medium text-foreground">
              Express Shipping:
            </strong>{" "}
            $15 flat rate. Delivered within 2-3 business days.
          </p>
          <p>
            All orders are carefully packaged in our signature sustainable
            materials and shipped with priority tracking.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="returns" className="border-border">
        <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:text-foreground">
          Returns & Exchanges
        </AccordionTrigger>
        <AccordionContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            We want you to be completely satisfied with your purchase. If you
            are not, we offer hassle-free returns within 30 days of delivery.
          </p>
          <p>
            Items must be unworn, unwashed, and in their original packaging with
            all tags attached. Final sale items cannot be returned.
          </p>
          <p>
            To initiate a return, please visit your{" "}
            <a
              href="/account/orders"
              className="text-foreground underline underline-offset-4"
            >
              Order History
            </a>
            .
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
