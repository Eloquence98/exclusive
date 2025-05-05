import { signInAction } from "@/lib/actions";
import Button from "./Button";

function GoogleSignIn() {
  return (
    <form action={signInAction} className="mt-4 flex justify-center">
      <Button className="flex w-full items-center justify-center gap-3 border border-gray-300 bg-white !text-gray-700 hover:bg-gray-100 hover:!text-slate-800 focus:bg-gray-100 focus:outline-none focus:ring focus:ring-offset-2">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google icon"
          className="mr-2 inline-block h-6 w-6"
        />
        <span>Continue with Google</span>
      </Button>
    </form>
  );
}

export default GoogleSignIn;
