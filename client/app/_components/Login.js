import Link from "next/link";
import Button from "./Button";
import FormInput from "./FormInput";
import GoogleSignIn from "./GoogleSignIn";

function Login() {
  return (
    <>
      <form className="">
        <FormInput type="text" name="name" placeholder="Name" required />
        <FormInput type="text" name="email" placeholder="Email" required />
        <div className="buttons flex items-center justify-between">
          {/* <Button type="submit" primary>
            Login
          </Button> */}
          <Button>Login</Button>
          <Button
            as="link"
            href="/login"
            className="cursor-pointer !bg-transparent !p-[unset] !text-primary hover:!text-primary-hover hover:!underline"
          >
            Forgot password
          </Button>
        </div>
      </form>
      <GoogleSignIn />
    </>
  );
}

export default Login;
