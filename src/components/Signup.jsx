"use client";

import { signUpAction } from "@/lib/actions";
import {
  validateEmail,
  validateInput,
  validateName,
  validatePassword,
} from "@/utils/errorValidations";
import { useError } from "@/utils/useError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import GoogleSignIn from "./GoogleSignIn";
import { Email, Password, Text } from "./Input";

function Signup() {
  const router = useRouter();
  const [nameError, setNameError, nameRef] = useError();
  const [emailError, setEmailError, emailRef] = useError();
  const [passwordError, setPasswordError, passwordRef] = useError();
  const [passwordConfirmError, setPasswordConfirmError, passwordConfirmRef] =
    useError();

  async function handleSubmit(formData) {
    // Client side validation for UX
    if (!nameRef.current.validity.valid) {
      setNameError(validateName(nameRef.current)?.message);
      return;
    }
    if (!emailRef.current.validity.valid) {
      setEmailError(validateEmail(emailRef.current)?.message);
      return;
    }
    if (!passwordRef.current.validity.valid) {
      setPasswordError(validatePassword(passwordRef.current)?.message);
      return;
    }
    if (!passwordConfirmRef.current.validity.valid) {
      setPasswordConfirmError(
        validatePassword(passwordConfirmRef.current)?.message,
      );
      return;
    }

    // Check if passwords match
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setPasswordConfirmError("Passwords do not match");
      return;
    }

    try {
      // Server Action
      await signUpAction(formData);
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
      <form className="mx-auto mt-8 w-full max-w-sm" noValidate action={handleSubmit}>
        <Text
          label="Name"
          name="name"
          id="name"
          error={nameError}
          setError={setNameError}
          textEl={nameRef}
          onInputChange={(event) =>
            validateInput(event.target, setNameError, validateName)
          }
        />
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
        <Password
          passwordEl={passwordConfirmRef}
          label="Confirm Password"
          name="passwordConfirm"
          id="passwordConfirm"
          error={passwordConfirmError}
          setError={setPasswordConfirmError}
          onInputChange={(event) =>
            validateInput(
              event.target,
              setPasswordConfirmError,
              validatePassword,
            )
          }
        />

        <Button className="w-full mt-6" type="submit">
          Create Account
        </Button>
      </form>

      <GoogleSignIn />

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary-hover hover:underline"
        >
          Log in
        </Link>
      </p>
    </>
  );
}

export default Signup;