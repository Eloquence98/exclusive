import Form from "./Form";

function Signup() {
  return (
    <div className="max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-medium">Create an account</h1>
        <p className="text-muted-foreground">Enter your details below</p>
      </div>
      <Form />
    </div>
  );
}

export default Signup;

// function Signup() {
//   return (
//     <div className="max-w-md space-y-6">
//       <div className="space-y-2">
//         <h1 className="text-4xl font-medium">Create an account</h1>
//         <p className="text-muted-foreground">Enter your details below</p>
//       </div>
//       <form className="space-y-4">
//         <div className="space-y-2">
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Name
//           </label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             autoComplete="name"
//             required
//             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             placeholder="John Doe"
//           />
//         </div>
//         <div className="space-y-2">
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             autoComplete="email"
//             required
//             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             placeholder="m@example.com"
//           />
//         </div>
//         <div className="space-y-2">
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             autoComplete="current-password"
//             required
//             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           />
//         </div>
//         <button
//           type="submit"
//           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Sign Up
//         </button>
//       </form>
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="border-muted w-full border-t" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background text-muted-foreground px-2">
//             Or continue with
//           </span>
//         </div>
//       </div>
//       <button
//         type="button"
//         className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//       >
//         <svg
//           className="mr-2 h-4 w-4"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.304 4.492 3.304 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
//         </svg>
//         Continue with Google
//       </button>
//     </div>
//   );
// }

// export default Signup;
