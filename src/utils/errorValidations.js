export function validateEmail(email) {
  if (!email?.validity) return null;

  switch (true) {
    case email.validity.valueMissing:
      return {
        error: email.validity.valueMissing,
        message: "Please enter your email address.",
      };

    case email.validity.typeMismatch:
      return {
        error: email.validity.typeMismatch,
        message: "This doesn't look like a valid email address.",
      };

    case email.validity.patternMismatch:
      return {
        error: email.validity.patternMismatch,
        message:
          "Email should be in the format 'user@domain.com' and should include only valid characters.",
      };

    case email.validity.tooLong:
      return {
        error: email.validity.tooLong,
        message: "Email address must be 320 characters or less.",
      };

    default:
      return null;
  }
}

export function validateName(name) {
  if (!name?.validity) return null;

  switch (true) {
    case name.validity.valueMissing:
      return {
        error: name.validity.valueMissing,
        message: "You need to enter a name.",
      };

    case name.validity.typeMismatch:
      return {
        error: name.validity.typeMismatch,
        message: "Entered value needs to be a valid name.",
      };

    case name.validity.tooShort:
      return {
        error: name.validity.tooShort,
        message: `Name should be at least ${name.minLength} characters; you entered ${name.value.length}.`,
      };

    case name.validity.tooLong:
      return {
        error: name.validity.tooLong,
        message: `Name should be no more than ${name.maxLength} characters; you entered ${name.value.length}.`,
      };

    case name.validity.patternMismatch:
      return {
        error: name.validity.patternMismatch,
        message:
          "Name should contain only letters and numbers (no special characters).",
      };

    default:
      return null;
  }
}

export function validatePhone(phoneNumber) {
  if (!phoneNumber?.validity) return null;

  switch (true) {
    case phoneNumber.validity.valueMissing:
      return {
        error: phoneNumber.validity.valueMissing,
        message: "You need to enter a phone number.",
      };

    case phoneNumber.validity.typeMismatch:
      return {
        error: phoneNumber.validity.typeMismatch,
        message: "Entered value needs to be a valid phone number.",
      };

    case phoneNumber.validity.tooShort:
      return {
        error: phoneNumber.validity.tooShort,
        message: `Number should be at least ${phoneNumber.minLength} characters; you entered ${phoneNumber.value.length}.`,
      };

    case phoneNumber.validity.tooLong:
      return {
        error: phoneNumber.validity.tooLong,
        message: `Number should be no more than ${phoneNumber.maxLength} characters; you entered ${phoneNumber.value.length}.`,
      };

    case phoneNumber.validity.patternMismatch:
      return {
        error: phoneNumber.validity.patternMismatch,
        message: "Enter a phone number in the format: 123-456-7890",
      };

    default:
      return null;
  }
}

// Follow the following pattern for other input validation functions or might leave it as it is for readability

export function validateAddress(address) {
  if (!address?.validity) return null;

  const messages = {
    street: {
      valueMissing: "You need to enter a Street Address: 123 Baker Street.",
      tooShort: `Street address should be at least ${address.minLength} characters; you entered ${address.value.length}: 123 Baker Street.`,
      tooLong: `Street address should be no more than ${address.maxLength} characters; you entered ${address.value.length}`,
      patternMismatch:
        "Street address should contain only letters, numbers, spaces, commas, periods, and hyphens: 123 Baker Street.",
    },
    city: {
      valueMissing: "You need to enter a City: London.",
      tooShort: `City name should be at least ${address.minLength} characters; you entered ${address.value.length}.`,
      tooLong: `City name should be no more than ${address.maxLength} characters; you entered ${address.value.length}.`,
      patternMismatch:
        "City name should contain only letters and spaces: Liverpool",
    },
    postalCode: {
      valueMissing: "You need to enter a Postal Code: NW1 6XE.",
      tooShort: `Postal Code should be at least ${address.minLength} characters; you entered ${address.value.length}: NW1 6XE.`,
      tooLong: `Postal Code should be no more than ${address.maxLength} characters; you entered ${address.value.length}: NW1 6XE.`,
      patternMismatch:
        "Postal Code should be in uppercase and follow the valid UK format, e.g., NW1 6XE.",
    },
  };

  const pattern = address?.dataset?.pattern;

  switch (true) {
    case address.validity.valueMissing:
      return {
        error: address.validity.valueMissing,
        message: messages[pattern]?.valueMissing,
      };

    case address.validity.tooShort:
      return {
        error: address.validity.tooShort,
        message: messages[pattern]?.tooShort,
      };

    case address.validity.tooLong:
      return {
        error: address.validity.tooLong,
        message: messages[pattern]?.tooLong,
      };

    case address.validity.patternMismatch:
      return {
        error: address.validity.patternMismatch,
        message: messages[pattern]?.patternMismatch,
      };

    default:
      return null;
  }
}

export function validateInput(
  inputElement = document.createElement("input"),
  setError = () => console.log("pass in an error state setter function"),
  validationFunction = () =>
    console.log("pass in an error validation function"),
) {
  if (inputElement.validity.valid) {
    setError("");
  } else {
    setError(validationFunction(inputElement)?.message);
  }
}

// export function validateInput(
//   event = {},
//   setError = () => console.log("pass in a error state setter function"),
//   validationFunction = () => console.log("pass in a error validation function"),
// ) {
//   const input = event.target;
//   if (input.validity.valid) {
//     setError("");
//   } else {
//     setError(validationFunction(input)?.message);
//   }
// }

export function validateCoupon(coupon) {
  if (!coupon?.validity) return null;

  switch (true) {
    case coupon.validity.valueMissing:
      return {
        error: coupon.validity.valueMissing,
        message: "Please enter a coupon code.",
      };

    case coupon.validity.typeMismatch:
      return {
        error: coupon.validity.typeMismatch,
        message: "Invalid input. Enter a valid coupon name.",
      };

    case coupon.validity.tooShort:
      return {
        error: coupon.validity.tooShort,
        message: `Too short. Minimum ${coupon.minLength} characters required.`,
      };

    case coupon.validity.tooLong:
      return {
        error: coupon.validity.tooLong,
        message: `Too long. Maximum ${coupon.maxLength} characters allowed.`,
      };

    case coupon.validity.patternMismatch:
      return {
        error: coupon.validity.patternMismatch,
        message:
          "Invalid code. Use 6-12 uppercase letters or numbers (e.g., SAVE20).",
      };

    default:
      return null;
  }
}
