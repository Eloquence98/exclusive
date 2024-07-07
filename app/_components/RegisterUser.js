import Image from "next/image";
import LayoutPadding from "./LayoutPadding";
import Signup from "./Signup";
import Login from "./Login";
import ImageCssBg from "./ImageCssBg";
import sideImage from "@/public/side-image.png";

function RegisterUser({ to = "login" }) {
  return (
    <div className="min-[32rem] min-h[unset] mt-15 flex h-[unset] w-full px-layout md:px-layout-md lg:h-[38.75em] lg:min-h-[38.75em] lg:px-[unset] lg:pr-layout-lg">
      <div className="relative hidden h-full min-w-[60%] lg:block">
        <ImageCssBg src={sideImage} alt="Shoping cart image" />
      </div>
      <div className="flex w-full items-center justify-center">
        {/* <p className="w-full bg-blue-500 text-center">content</p> */}
        {to === "signup" ? <Signup /> : <Login />}
      </div>
    </div>
  );
  // return (
  //   <div className="mt-14 grid grid-cols-1 pl-0 pr-layout md:grid-cols-[1fr_22rem] md:pr-layout-md lg:pr-layout-lg">
  //     <div className="bg-muted hidden md:block">
  //       <Image
  //         src="/mart-production.jpg"
  //         width={1200}
  //         height={500}
  //         alt="Signup"
  //         className="h-full w-full object-cover"
  //       />
  //     </div>
  //     <div className="flex items-center justify-end">
  //       {to === "signup" ? <Signup /> : <Login />}
  //     </div>
  //   </div>
  // );
}

export default RegisterUser;

// function RegisterUser({ to = "login" }) {
//   if (to === "signup")
//     return (
//       <div className="signup">
//         {" "}
//         <h1>Signup</h1>{" "}
//       </div>
//     );
//   return (
//     <div className="mt-10 flex flex-col items-center gap-10">
//       <h2 className="text-3xl font-semibold">
//         Sign in to access your guest area
//       </h2>

//       <SignInButton />
//     </div>
//   );
// }

// export default RegisterUser;
