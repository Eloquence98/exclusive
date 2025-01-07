"use client";
import {
  validateAddress,
  validateInput,
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

  return (
    <form className="billing-details-form">
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

      <fieldset className="address-fieldset">
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
    </form>
  );
}

export default BillingDetailsForm;
