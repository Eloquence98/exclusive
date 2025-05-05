import { useError } from "@/utils/useError";
import { Address, Text } from "./Input";

function Examples() {
  const [streetAddressError, setStreetAddressError, streetAddressRef] =
    useError();
  const [cityError, setCityError, cityRef] = useError();
  const [postalCodeError, setPostalCodeError, postalCodeRef] = useError();
  const [firstNameError, setFirstNameError, firstNameRef] = useError();
  return (
    <div>
      <div className="form">
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
              validateInput(
                event.target,
                setStreetAddressError,
                validateAddress,
              )
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
      </div>
    </div>
  );
}

export default Examples;
