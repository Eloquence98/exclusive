"use client";
import { Checkbox } from "@heroui/react";
import {
  validateAddress,
  validateEmail,
  validateInput,
  validateName,
  validatePhone,
} from "../_utills/errorValidations";
import { useError } from "../_utills/useError";
import { Address, Email, Phone, Text } from "./Input";

function BillingDetailsForm() {
  const [nameError, setNameError, nameRef] = useError();
  const [emailError, setEmailError, emailRef] = useError();
  const [cityError, setCityError, cityRef] = useError();
  const [streetAddressError, setStreetAddressError, streetAddressRef] =
    useError();
  const [phoneError, setPhoneError, phoneRef] = useError();

  function handleSubmit(formData) {
    const BillingInfo = formData.get("save-billing-information");

    console.log("save-billing-information", BillingInfo);
  }

  return (
    <form className="billing-details-form space-y-6" onSubmit={handleSubmit}>
      <Text
        name="name"
        label="Name"
        id="name"
        error={nameError}
        setError={setNameError}
        textEl={nameRef}
        onInputChange={(event) =>
          validateInput(event.target, setNameError, validateName)
        }
      />
      <Email
        emailEl={emailRef}
        label="Email:"
        error={emailError}
        setError={setEmailError}
        onInputChange={(event) =>
          validateInput(event.target, setEmailError, validateEmail)
        }
      />
      <Text
        name="companyName"
        label="Company Name"
        id="company-name"
        required={false}
      />

      <fieldset className="address-fieldset space-y-5">
        <Address
          label="City:"
          name="city"
          id="city"
          pattern="[a-zA-Z0-9\s,.\-]+"
          dataPattern="city"
          error={cityError}
          setError={setCityError}
          addressEl={cityRef}
          onInputChange={(event) =>
            validateInput(event.target, setCityError, validateAddress)
          }
        />
        <Address
          label="Street Address:"
          name="streetAddress"
          id="street-address"
          pattern="[a-zA-Z0-9\s,.\-]+"
          dataPattern="street"
          error={streetAddressError}
          setError={setStreetAddressError}
          addressEl={streetAddressRef}
          onInputChange={(event) =>
            validateInput(event.target, setStreetAddressError, validateAddress)
          }
        />
      </fieldset>

      <Phone
        label="Phone Number"
        name="PhoneNumber"
        id="phone"
        error={phoneError}
        setError={setPhoneError}
        textEl={phoneRef}
        onInputChange={(event) =>
          validateInput(event.target, setPhoneError, validatePhone)
        }
      />
      <Checkbox name="save-billing-information" size="sm" className="text-xs">
        Save this information for faster check-out next time
      </Checkbox>
    </form>
  );
}

export default BillingDetailsForm;
