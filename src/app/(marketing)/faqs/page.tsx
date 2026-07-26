import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5–7 business days. Expedited shipping (2–3 business days) is available at checkout. Free standard shipping on all orders over $100.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. Once your order is placed, you will receive a confirmation email with a tracking link. You can also track your order at any time using your order number at /orders/track.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently we ship within the United States only. International shipping is coming soon.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Orders can be cancelled within the first few minutes of being placed (while status is 'Processing'). Once confirmed or shipped, we are unable to make changes.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with all tags attached.",
      },
      {
        q: "How do I start a return?",
        a: "Contact our support team at support@exclusive.com with your order number and reason for return. We will send you a prepaid return label within 24 hours.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5–7 business days of receiving your returned item. You will be notified by email when the refund is issued.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We currently accept cash on delivery (COD). Additional payment methods including card and digital wallets are coming soon.",
      },
      {
        q: "Is cash on delivery available everywhere?",
        a: "Cash on delivery is available for all orders within the United States.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We do not store any payment information on our servers. All transactions are handled securely.",
      },
    ],
  },
  {
    category: "Account",
    items: [
      {
        q: "Do I need an account to place an order?",
        a: "No. We support full guest checkout — no account required to shop or place an order.",
      },
      {
        q: "How do I create an account?",
        a: "Simply click 'Sign in with Google' on the login page. Your account is created automatically on your first sign-in — no forms to fill out.",
      },
      {
        q: "What data do you store about me?",
        a: "We store only your name and email address (sourced from Google) to associate orders with your account. We do not sell or share your data with third parties. See our Privacy Policy for full details.",
      },
    ],
  },
];

export const metadata = {
  title: "FAQs",
};

export default function FAQsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-muted-foreground">
          Everything you need to know about shopping with EXCLUSIVE.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-12">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {section.category}
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {section.items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`${section.category}-${index}`}
                  className="rounded-lg border border-border px-4"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-medium text-foreground hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-lg border border-border bg-muted/30 p-8 text-center">
        <p className="mb-2 text-sm font-medium text-foreground">
          Still have questions?
        </p>
        <p className="text-sm text-muted-foreground">
          Contact us at{" "}
          <a
            href="mailto:support@exclusive.com"
            className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
          >
            support@exclusive.com
          </a>{" "}
          and we&lsquo;ll get back to you within 24–48 hours.
        </p>
      </div>
    </div>
  );
}
