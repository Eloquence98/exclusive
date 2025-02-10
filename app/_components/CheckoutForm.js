"use client";

function CheckoutForm({ className = "" }) {
  function handleCheckoutForm(formData) {
    console.log(formData);
  }
  return (
    <form
      className={`${className} checkout-form`}
      noValidate
      action={handleCheckoutForm}
    >
      form
      {/* <RadioGroup /> */}
    </form>
  );
}

export default CheckoutForm;

// const RadioGroup = ({ selected, onChange }) => {
//   return (
//     <fieldset className="space-y-2">
//       <legend className="text-lg font-medium">Select Payment Method</legend>
//       <div className="flex items-center space-x-3">
//         <input
//           type="radio"
//           id="bank"
//           name="payment"
//           value="bank"
//           checked={selected === "bank"}
//           onChange={onChange}
//           className="peer hidden"
//         />
//         <label
//           htmlFor="bank"
//           className="cursor-pointer rounded-lg border px-4 py-2 peer-checked:bg-blue-500 peer-checked:text-white"
//         >
//           Bank
//         </label>
//       </div>
//       <div className="flex items-center space-x-3">
//         <input
//           type="radio"
//           id="cod"
//           name="payment"
//           value="cod"
//           checked={selected === "cod"}
//           onChange={onChange}
//           className="peer hidden"
//         />
//         <label
//           htmlFor="cod"
//           className="cursor-pointer rounded-lg border px-4 py-2 peer-checked:bg-blue-500 peer-checked:text-white"
//         >
//           Cash on Delivery
//         </label>
//       </div>
//     </fieldset>
//   );
// };
