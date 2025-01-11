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
    </form>
  );
}

export default CheckoutForm;
