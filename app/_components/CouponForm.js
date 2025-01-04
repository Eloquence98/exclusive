"use client";
import { validateCoupon, validateInput } from "../_utills/errorValidations";
import { useError } from "../_utills/useError";
import Button from "./Button";
import { CouponInput } from "./Input";

function CouponForm() {
  const [couponError, setCouponError, couponRef] = useError();
  return (
    <form action="" className="flex items-start justify-start gap-4">
      <CouponInput
        name="coupon"
        id="coupon"
        placeholder="Coupon code"
        className="w-[18.75rem] !p-4"
        error={couponError}
        setError={setCouponError}
        textEl={couponRef}
        onInputChange={(event) => {
          validateInput(event.target, setCouponError, validateCoupon);
        }}
      />
      <Button>apply coupon</Button>
    </form>
  );
}

export default CouponForm;
