"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/lib/actions";
import {
  validateEmail,
  validateInput,
  validatePassword,
} from "@/utils/errorValidations";
import { useError } from "@/utils/useError";
import Button from "./Button";
import GoogleSignIn from "./GoogleSignIn";
import { Email, Password } from "./Input";

function Login() {
  const router = useRouter();
  const [emailError, setEmailError, emailRef] = useError();
  const [passwordError, setPasswordError, passwordRef] = useError();

  async function handleSubmit(formData) {
    // Client side validation for UX
    if (!emailRef.current.validity.valid) {
      setEmailError(validateEmail(emailRef.current)?.message);
      return;
    }
    if (!passwordRef.current.validity.valid) {
      setPasswordError(validatePassword(passwordRef.current)?.message);
      return;
    }

    try {
      // Server Action
      await loginAction(formData);
      // Redirect on success
      router.push("/");
      router.refresh();
    } catch (error) {
      // Show error from server
      setEmailError(error.message);
    }
  }

  return (
    <>
      <form className="space-y-6" noValidate action={handleSubmit}>
        <Email
          emailEl={emailRef}
          label="Email"
          error={emailError}
          setError={setEmailError}
          onInputChange={(event) =>
            validateInput(event.target, setEmailError, validateEmail)
          }
        />
        <Password
          passwordEl={passwordRef}
          label="Password"
          name="password"
          id="password"
          error={passwordError}
          setError={setPasswordError}
          onInputChange={(event) =>
            validateInput(event.target, setPasswordError, validatePassword)
          }
        />
        <div className="buttons flex items-center justify-between">
          <Button type="submit">Login</Button>
          <Link
            href="/forgot-password"
            className="cursor-pointer text-primary hover:text-primary-hover hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>
      <GoogleSignIn />
    </>
  );
}

export default Login;