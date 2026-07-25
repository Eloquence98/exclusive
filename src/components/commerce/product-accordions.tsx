import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface ProductAccordionsProps {
  description: string;
}

export function ProductAccordions({ description }: ProductAccordionsProps) {
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
          <p className="whitespace-pre-line">{description}</p>
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
            <Link
              href="/me/orders"
              className="text-foreground underline underline-offset-4"
            >
              Order History
            </Link>
            .
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
