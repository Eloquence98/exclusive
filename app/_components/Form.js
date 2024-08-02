import Link from "next/link";
import Button from "./Button";
import GoogleSignIn from "./GoogleSignIn";

function Form() {
  return (
    <>
      <form className="mx-auto mt-8 w-full max-w-sm">
        <FormInput type="text" name="name" placeholder="Name" required />
        <FormInput type="text" name="email" placeholder="Email" required />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        {/* <Button type="submit" primary>
        Create Account
      </Button> */}
        <Button className="w-full">Create Account</Button>
      </form>

      <GoogleSignIn />

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" class="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}

export default Form;

// const Button = ({ type, children, primary }) => {
//   const primaryClass = primary
//     ? "bg-primary text-white hover:bg-primary-dark"
//     : "border border-gray-300 text-gray-700 hover:bg-gray-100";

//   return (
//     <button
//       type={type}
//       className={`w-full rounded px-4 py-2 font-bold ${primaryClass} focus:outline-none`}
//     >
//       {children}
//     </button>
//   );
// };

const FormInput = ({ label, type, name, placeholder, required }) => {
  return (
    <div className="mb-4">
      {label ? (
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      <input
        className="w-full border-b-2 border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
