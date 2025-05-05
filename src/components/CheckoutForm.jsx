"use client";

import { useError } from "@/utils/useError";
import { Form } from "@heroui/form";
import { Radio, RadioGroup } from "@heroui/react";
import Button from "@/components/Button";

const bankIcons = [
  { src: "/icons/bkash.png", name: "Bkash" },
  { src: "/icons/visa.png", name: "Visa" },
  { src: "/icons/mastercard.png", name: "Mastercard" },
  { src: "/icons/nagad.png", name: "Nagad" },
];

function CheckoutForm({ className = "", data = {} }) {
  const [paymentMethodError, setPaymentMethodError, setPaymentMethodRef] =
    useError("");

  function handleSubmit(formData) {
    const paymentMethod = formData.get("paymentMethod");
    console.log("Payment M", paymentMethod);
    if (!paymentMethod) {
      setPaymentMethodError("Please select a payment method");
      return;
    }

    console.log("Selected Payment Method:", paymentMethod);
  }

  return (
    <Form className={`${className} checkout-form w-full`} action={handleSubmit}>
      <RadioGroup
        color="primary"
        // label="Payment Method"
        name="paymentMethod"
        className="w-full"
        isRequired
        errorMessage={paymentMethodError}
      >
        <Radio
          value="bank"
          classNames={{
            label: "!w-full flex items-center justify-between",
          }}
        >
          Bank
          {/* <div className="flex items-center gap-3">
            {bankIcons.map((bank, index) => (
              <NextImage
                key={`${bank.name}-${index}`}
                src={bank.src}
                as={NextImage}
                alt={`${bank.name} Icon`}
                height={28}
                width={42}
              />
            ))}
            <Avatar name="Junior" />
          </div> */}
        </Radio>
        <Radio value="cash-on-delivery">Cash on Delivery</Radio>
      </RadioGroup>

      <Button type="submit" className="mt-4">
        Place order
      </Button>
    </Form>
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
