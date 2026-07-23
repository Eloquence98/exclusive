import SignIn from "@/components/signin";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>

        <p className="text-sm text-muted-foreground">
          Sign in to access your account and continue shopping.
        </p>
      </div>

      <div className="space-y-6">
        <SignIn />

        <p className="px-4 text-center text-xs leading-relaxed text-muted-foreground">
          New here? No problem. Your account will be created automatically when
          you continue with Google.
        </p>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </>
  );
}
