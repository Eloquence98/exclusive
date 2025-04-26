"use client";
import { contactGeneralInquiry } from "../_lib/actions";
import {
  validateEmail,
  validateInput,
  validateName,
  validatePhone,
} from "../_utills/errorValidations";
import { useError } from "../_utills/useError";
import Button from "./Button";
import { Email, Phone, Text, Textarea } from "./Input";

function ContactForm({ className }) {
  const [lastNameError, setLastNameError, lastNameRef] = useError();
  const [emailError, setEmailError, emailRef] = useError();
  const [phoneError, setPhoneError, phoneRef] = useError();

  function handleSubmit(formData) {
    // Client side validation for ux
    if (!lastNameRef.current.validity.valid) {
      setLastNameError(validateName(lastNameRef.current)?.message);
      return;
    }
    if (!emailRef.current.validity.valid) {
      setEmailError(validateEmail(emailRef.current)?.message);
      return;
    }
    // submit
    // Server Action
    contactGeneralInquiry(formData);
  }

  return (
    <form
      className={`${className} grid grid-cols-1 grid-rows-[max-content_max-content_max-content_1fr_max-content] gap-3 md:grid-cols-3 md:grid-rows-[max-content_1fr_max-content]`}
      noValidate
      action={handleSubmit}
    >
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
      <Phone
        phoneEl={phoneRef}
        error={phoneError}
        setError={setPhoneError}
        onInputChange={(event) =>
          validateInput(event.target, setPhoneError, validatePhone)
        }
      />
      <Textarea
        className="md:col-span-3"
        id="contact-message"
        name="contactMessage"
        rows="5"
        cols="33"
      />
      <div className="text-right md:col-span-3">
        <Button>Send Massage</Button>
      </div>
    </form>
  );
}

export default ContactForm;
