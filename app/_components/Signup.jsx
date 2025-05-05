import Link from "next/link";
import Button from "./Button";
import FormInput from "./FormInput";
import GoogleSignIn from "./GoogleSignIn";

function Signup() {
  return (
    <>
      <form className="mx-auto mt-8 w-full max-w-sm">
        <FormInput type="text" name="name" placeholder="Name" required />
        <FormInput type="text" name="email" placeholder="Email" required />
        <FormInput type="password" name="password" placeholder="Password" required />

        {/* <Button type="submit" primary>
          Create Account
        </Button> */}
        <Button className="w-full">Create Account</Button>
      </form>

      <GoogleSignIn />

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:text-primary-hover hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}

export default Signup;
