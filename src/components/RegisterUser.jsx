import ImageCssBg from "./ImageCssBg";
import Login from "./Login";
import Signup from "./Signup";

function RegisterUser({ to = "login" }) {
  const loginPage = to === "login";

  return (
    <div className="min-[32rem] min-h[unset] mt-15 flex h-[unset] w-full px-layout md:px-layout-md lg:h-[38.75em] lg:min-h-[38.75em] lg:px-[unset] lg:pr-layout-lg">
      <div className="relative hidden h-full min-w-[60%] lg:block">
        <ImageCssBg src="/side-image.png" alt="Shoping cart image" />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-medium">
              {" "}
              {loginPage ? "Log in to Exclusive" : "Create an account"}{" "}
            </h1>
            <p className="">Enter your details below</p>
          </div>
          {loginPage ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
