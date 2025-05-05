import RegisterUser from "@/components/RegisterUser";

export const metadata = {
  title: "Signup",
};
function page() {
  return <RegisterUser to="signup" />;
}

export default page;
