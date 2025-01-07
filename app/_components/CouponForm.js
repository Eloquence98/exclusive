"use client";
import { couponAction } from "../_lib/actions";
import { validateCoupon, validateInput } from "../_utills/errorValidations";
import { useError } from "../_utills/useError";
import Button from "./Button";
import { CouponInput } from "./Input";

function CouponForm() {
  const [couponError, setCouponError, couponRef] = useError();

  async function handleSubmit(formData) {
    // Client side validation for ux
    if (!couponRef.current.validity.valid) {
      setCouponError(validateCoupon(couponRef.current)?.message);
      return;
    }
    const { success, error } = await couponAction(formData);
    if (error) throw new Error(error);

    console.log("success?", success);
  }

  return (
    <form
      noValidate
      action={handleSubmit}
      className="flex flex-wrap items-start justify-start gap-4"
    >
      <CouponInput
        name="coupon"
        id="coupon"
        placeholder="Coupon code"
        className="!w-[18.75rem] !p-4"
        error={couponError}
        setError={setCouponError}
        couponEl={couponRef}
        onInputChange={(event) => {
          validateInput(event.target, setCouponError, validateCoupon);
        }}
      />
      <Button className="!text-nowrap">apply coupon</Button>
    </form>
  );
}

export default CouponForm;
