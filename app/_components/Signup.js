import Form from "./Form";

function Signup() {
  return (
    <div className="max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-medium">Create an account</h1>
        <p className="">Enter your details below</p>
      </div>
      <Form />
    </div>
  );
}

export default Signup;
