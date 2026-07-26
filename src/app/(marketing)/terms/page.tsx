import { formatDate } from "@/utils/utility";

export const metadata = {
  title: "Terms of Service",
};

const LAST_UPDATED = "2025-01-01";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {formatDate(LAST_UPDATED)}
        </p>
      </div>

      {/* Portfolio Disclaimer */}
      <div className="mb-12 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm leading-relaxed text-amber-800">
          <span className="font-semibold">Portfolio Project Notice:</span>{" "}
          EXCLUSIVE is a fictional ecommerce brand built as a portfolio
          demonstration. No real transactions are processed, no real goods are
          sold, and no real money is ever charged. These terms exist for
          completeness and realism as part of the portfolio presentation.
        </p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the EXCLUSIVE website, you agree to be bound
            by these Terms of Service. If you do not agree with any part of
            these terms, you may not use our services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            2. Nature of Service
          </h2>
          <p>
            EXCLUSIVE is a portfolio demonstration project. It is not a real
            ecommerce store. Products shown are fictional. Orders placed are not
            fulfilled. No payments are processed. No goods are shipped.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            3. User Accounts
          </h2>
          <p>
            Account creation is handled exclusively through Google OAuth. We do
            not store passwords. By signing in with Google, you authorize us to
            receive your name and email address from Google for the purpose of
            identifying your account. You may sign out and request account
            deletion at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            4. Intellectual Property
          </h2>
          <p>
            All design, code, and content on this site is the intellectual
            property of the developer. You may not reproduce, copy, or
            redistribute any part of this site without express written
            permission.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            5. Disclaimer of Warranties
          </h2>
          <p>
            This site is provided &quot;as is&quot; without warranties of any
            kind, either express or implied. We do not warrant that the site
            will be uninterrupted, error-free, or free of viruses or other
            harmful components.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            6. Limitation of Liability
          </h2>
          <p>
            In no event shall EXCLUSIVE or its developer be liable for any
            indirect, incidental, special, or consequential damages arising from
            your use of or inability to use this site.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to update these terms at any time. Changes will
            be reflected by updating the &ldquo;Last updated&ldquo; date at the
            top of this page.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            8. Contact
          </h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a
              href="mailto:support@exclusive.com"
              className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              support@exclusive.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
