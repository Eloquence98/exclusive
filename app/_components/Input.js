"use client";
import { useOutsideClick } from "../_utills/useOutsideClick";
import FormRowError from "./FormRowError";

const baseStyles = `w-full border-[1.5px] border-transparent p-4 px-3 py-2 valid:border-green-400 valid:bg-green-50 invalid:required:border-red-400 invalid:required:bg-red-50 focus:outline-none`;

export function Text({
  label,
  name,
  id,
  error,
  setError,
  textEl,
  required = true,
  onInputChange,
  className = "",
}) {
  const ref = useOutsideClick(clearError);
  function clearError() {
    setError("");
  }
  return (
    <p className="" ref={ref}>
      <label className="relative w-full" htmlFor={id}>
        {label ? (
          <span>
            {label}{" "}
            {required && (
              <span className="relative -left-1 -top-1 text-red-700">
                {" "}
                &#42;{" "}
              </span>
            )}
          </span>
        ) : null}
        <input
          ref={textEl}
          className={`${className} ${baseStyles}`}
          type="text"
          id={id}
          name={name}
          autoComplete="off"
          required={required}
          pattern="[a-zA-Z0-9]+"
          title="Please enter only letters and numbers (no special characters)."
          minLength="2"
          maxLength="30"
          onInput={onInputChange}
        />
        <FormRowError error={error} tempError="You need to enter a name." />
      </label>
    </p>
  );
}

export function Email({
  label,
  error,
  setError,
  emailEl,
  pattern = "^[a-z0-9._%+\\-]+@[a-z0-9.-]+\\.[a-z]{2,63}$",
  title = "Please enter a valid email address (e.g., 'example@domain.com').",
  maxLength = "320",
  required = true,
  onInputChange,
  className = "",
}) {
  const ref = useOutsideClick(clearError);
  function clearError() {
    setError("");
  }
  return (
    <p className="" ref={ref}>
      <label className="relative w-full" htmlFor="mail">
        {label ? (
          <span>
            {label}{" "}
            {required && (
              <span className="relative -left-1 -top-1 text-red-700">
                {" "}
                &#42;{" "}
              </span>
            )}
          </span>
        ) : null}
        <input
          ref={emailEl}
          className={`${className} ${baseStyles}`}
          type="email"
          id="mail"
          name="email"
          autoComplete="off"
          placeholder="example@domain.com"
          pattern={pattern}
          title={title}
          required={required}
          maxLength={maxLength}
          onInput={onInputChange}
        />
        <FormRowError
          error={error}
          tempError="Entered value needs to be an e-mail."
        />
      </label>
    </p>
  );
}

export function Phone({
  label = "Phone",
  name = "phone",
  id = "phone",
  required = true,
  error,
  setError,
  phoneEl,
  onInputChange,
  className = "",
}) {
  const ref = useOutsideClick(clearError);
  function clearError() {
    setError("");
  }
  return (
    <p className="" ref={ref}>
      <label className="relative w-full" htmlFor={id}>
        {label ? (
          <span>
            {label}{" "}
            {required && (
              <span className="relative -left-1 -top-1 text-red-700">
                {" "}
                &#42;{" "}
              </span>
            )}
          </span>
        ) : null}
        <input
          ref={phoneEl}
          className={`${className} ${baseStyles}`}
          type="tel"
          id={id}
          name={name}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required={required}
          title="Enter a phone number in the format: 123-456-7890"
          size="20"
          placeholder="XXX-XXX-XXXX"
          minLength="9"
          maxLength="14"
          onInput={onInputChange}
        />
        <FormRowError
          error={error}
          tempError="Enter a phone number in the format: 123-456-7890"
        />
      </label>
    </p>
  );
}

export function Textarea({
  id = "contact-message",
  name = "contactMessage",
  rows = "5",
  cols = "33",
  label = "Your message",
  required = false,
  error,
  setError,
  textareaEl,
  className = "",
  onInputChange,
}) {
  const ref = useOutsideClick(clearError);
  function clearError() {
    setError("");
  }
  return (
    <p ref={textareaEl} className={`${className} ""`}>
      <label className="relative w-full" htmlFor={id}>
        {label ? (
          <span>
            {label}{" "}
            {required && (
              <span className="relative -left-1 -top-1 text-red-700">
                {" "}
                &#42;{" "}
              </span>
            )}
          </span>
        ) : null}

        <textarea
          className={`${baseStyles} resize-none`}
          id={id}
          name={name}
          rows={rows}
          cols={cols}
          required={required}
          defaultValue="It was a dark and stormy night..."
          maxLength="300"
          onInput={onInputChange}
        ></textarea>
        <FormRowError
          error={error}
          tempError="This is a error message for the text area set it when it's required"
        />
      </label>
    </p>
  );
}

export function Address({
  label = "Address:",
  name = "address",
  id = "address",
  minLength = "6",
  maxLength = "100",
  pattern = "[a-zA-Z0-9s,.-]+",
  title = "Please enter a valid UK address.",
  dataPattern = "address",
  error,
  setError,
  addressEl,
  onInputChange,
  className = "",
}) {
  const ref = useOutsideClick(clearError);

  function clearError() {
    setError("");
  }

  return (
    <p className="" ref={ref}>
      <label className="relative w-full" htmlFor={id}>
        {label ? <span>{label}</span> : null}
        <input
          ref={addressEl}
          className={`${className} ${baseStyles}`}
          type="text"
          id={id}
          name={name}
          required
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          onInput={onInputChange}
          title={title}
          data-pattern={dataPattern}
        />
        <FormRowError
          error={error}
          tempError="Entered value needs to be a valid UK address."
        />
      </label>
    </p>
  );
}
