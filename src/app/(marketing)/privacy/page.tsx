import { formatDate } from "@/utils/utility";

export const metadata = {
  title: "Privacy Policy",
};

const LAST_UPDATED = "2025-01-01";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">
          Privacy Policy
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
          demonstration. This privacy policy accurately reflects how this
          application handles data — which is minimally and transparently.
        </p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            1. What We Collect
          </h2>
          <p className="mb-3">
            We collect the minimum data necessary to operate this application:
          </p>
          <ul className="space-y-2">
            {[
              "Your name (from Google) — used to personalize your account",
              "Your email address (from Google) — used to identify your account and associate orders",
              "Your Google profile photo (from Google) — displayed in your account",
              "Order data you submit (shipping address, items) — used to process demo orders",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            2. What We Do Not Collect
          </h2>
          <ul className="space-y-2">
            {[
              "Passwords — authentication is handled entirely by Google",
              "Payment information — no real payments are processed",
              "Browsing history or analytics beyond what is necessary for the app to function",
              "Any data from third-party tracking or advertising networks",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            3. How We Use Your Data
          </h2>
          <p>
            Your name, email, and photo are used solely to personalize your
            account experience within this application. Your email is used to
            associate orders with your account. We do not use your data for
            marketing, advertising, or any purpose beyond operating the
            application.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            4. Google OAuth
          </h2>
          <p>
            Sign-in is powered by Google OAuth. When you sign in with Google,
            Google authenticates your identity and shares your name, email, and
            profile photo with us. We do not have access to your Google
            password. Your Google account is governed by{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            5. Data Sharing
          </h2>
          <p>
            We do not sell, rent, or share your personal data with any third
            parties. Your data stays within this application only.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            6. Data Retention
          </h2>
          <p>
            Your account data is retained for as long as your account exists. If
            you would like your data deleted, contact us at the email below and
            we will remove your account and all associated data within 7
            business days.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            7. Security
          </h2>
          <p>
            Authentication is handled by Auth.js (NextAuth) using industry
            standard JWT session tokens. Your backend session token is never
            exposed to the browser. We take reasonable technical measures to
            protect your data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            8. Your Rights
          </h2>
          <p>
            You have the right to access, correct, or delete your personal data
            at any time. To exercise any of these rights, contact us at the
            email below.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            9. Contact
          </h2>
          <p>
            Privacy questions or data requests? Contact us at{" "}
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
