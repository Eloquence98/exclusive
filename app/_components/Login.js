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
          <span className="cursor-pointer text-primary hover:text-primary-hover hover:underline">
            forgot password
          </span>
        </div>
      </form>
      <GoogleSignIn />
    </>
  );
}

export default Login;
