"use client";
import {
  validateAddress,
  validateEmail,
  validateInput,
  validateName,
} from "../_utills/errorValidations";
import { useError } from "../_utills/useError";
import { Address, Email, Text } from "./Input";

function ContactForm({ className }) {
  const [emailError, setEmailError, emailRef] = useError();
  const [firstNameError, setFirstNameError, firstNameRef] = useError();
  const [lastNameError, setLastNameError, lastNameRef] = useError();
  const [streetAddressError, setStreetAddressError, streetAddressRef] =
    useError();
  const [cityError, setCityError, cityRef] = useError();
  const [postalCodeError, setPostalCodeError, postalCodeRef] = useError();

  function handleSubmit(event) {
    event.preventDefault();
    if (!firstNameRef.current.validity.valid) {
      setFirstNameError(validateName(firstNameRef.current)?.message);
      return;
    }
    if (!lastNameRef.current.validity.valid) {
      setLastNameError(validateName(lastNameRef.current)?.message);
      return;
    }
    if (!emailRef.current.validity.valid) {
      setEmailError(validateEmail(emailRef.current)?.message);
      return;
    }
    if (!streetAddressRef.current.validity.valid) {
      setStreetAddressError(
        showAddressError(streetAddressRef.current)?.message,
      );
      return;
    }
    if (!cityRef.current.validity.valid) {
      setCityError(showAddressError(cityRef.current)?.message);
      return;
    }
    if (!postalCodeRef.current.validity.valid) {
      setPostalCodeError(showAddressError(postalCodeRef.current)?.message);
      return;
    }
    console.log("Submit?");
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Text
        label="First name"
        name="firstName"
        id="first-name"
        error={firstNameError}
        setError={setFirstNameError}
        textEl={firstNameRef}
        onInputChange={(event) =>
          validateInput(event.target, setFirstNameError, validateName)
        }
      />
      <Text
        label="Last name"
        name="lastName"
        id="last-name"
        error={lastNameError}
        setError={setLastNameError}
        textEl={lastNameRef}
        onInputChange={(event) =>
          validateInput(event.target, setLastNameError, validateName)
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
      <fieldset className="address-fieldset">
        <legend>Address Details</legend>
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
          label="Postal Code:"
          name="postalCode"
          id="postal-code"
          minLength="6"
          maxLength="8"
          pattern="[A-Z0-9 ]{6,8}"
          dataPattern="postalCode"
          title="Please enter a valid UK postal code."
          error={postalCodeError}
          setError={setPostalCodeError}
          addressEl={postalCodeRef}
          onInputChange={(event) =>
            validateInput(event.target, setPostalCodeError, validateAddress)
          }
        />
      </fieldset>
      <button>Submit</button>
    </form>
  );
}

export default ContactForm;
