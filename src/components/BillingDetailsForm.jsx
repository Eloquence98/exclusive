"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@heroui/react";
import {
  validateAddress,
  validateEmail,
  validateInput,
  validateName,
  validatePhone,
} from "@/utils/errorValidations";
import { useError } from "@/utils/useError";
import { Address, Email, Phone, Text } from "./Input";

function BillingDetailsForm({ onDataChange }) {
  const [nameError, setNameError, nameRef] = useError();
  const [emailError, setEmailError, emailRef] = useError();
  const [cityError, setCityError, cityRef] = useError();
  const [streetAddressError, setStreetAddressError, streetAddressRef] =
    useError();
  const [phoneError, setPhoneError, phoneRef] = useError();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    city: "",
    streetAddress: "",
    phone: "",
    saveInfo: false,
  });

  // Pass data to parent whenever it changes
  useEffect(() => {
    // Only pass data if all required fields are filled
    const isValid =
      formData.name &&
      formData.email &&
      formData.city &&
      formData.streetAddress &&
      formData.phone;

    if (isValid) {
      onDataChange?.(formData);
    } else {
      onDataChange?.(null);
    }
  }, [formData, onDataChange]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="billing-details-form space-y-6">
      <Text
        name="name"
        label="Name"
        id="name"
        error={nameError}
        setError={setNameError}
        textEl={nameRef}
        onInputChange={(event) => {
          handleInputChange(event);
          validateInput(event.target, setNameError, validateName);
        }}
      />
      <Email
        emailEl={emailRef}
        label="Email"
        error={emailError}
        setError={setEmailError}
        onInputChange={(event) => {
          handleInputChange(event);
          validateInput(event.target, setEmailError, validateEmail);
        }}
      />
      <Text
        name="companyName"
        label="Company Name"
        id="company-name"
        required={false}
        onInputChange={handleInputChange}
      />

      <fieldset className="address-fieldset space-y-5">
        <Address
          label="City"
          name="city"
          id="city"
          pattern="[a-zA-Z0-9\s,.\-]+"
          dataPattern="city"
          error={cityError}
          setError={setCityError}
          addressEl={cityRef}
          onInputChange={(event) => {
            handleInputChange(event);
            validateInput(event.target, setCityError, validateAddress);
          }}
        />
        <Address
          label="Street Address"
          name="streetAddress"
          id="street-address"
          pattern="[a-zA-Z0-9\s,.\-]+"
          dataPattern="street"
          error={streetAddressError}
          setError={setStreetAddressError}
          addressEl={streetAddressRef}
          onInputChange={(event) => {
            handleInputChange(event);
            validateInput(
              event.target,
              setStreetAddressError,
              validateAddress
            );
          }}
        />
      </fieldset>

      <Phone
        label="Phone Number"
        name="phone"
        id="phone"
        error={phoneError}
        setError={setPhoneError}
        textEl={phoneRef}
        onInputChange={(event) => {
          handleInputChange(event);
          validateInput(event.target, setPhoneError, validatePhone);
        }}
      />
      <Checkbox
        name="saveInfo"
        size="sm"
        className="text-xs"
        isSelected={formData.saveInfo}
        onValueChange={(checked) =>
          handleInputChange({
            target: { name: "saveInfo", type: "checkbox", checked },
          })
        }
      >
        Save this information for faster check-out next time
      </Checkbox>
    </div>
  );
}

export default BillingDetailsForm;