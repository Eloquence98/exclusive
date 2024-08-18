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
  onInputChange,
  className,
}) {
  const ref = useOutsideClick(clearError);
  function clearError() {
    setError("");
  }
  return (
    <p className="" ref={ref}>
      <label className="relative w-full" htmlFor={id}>
        {label ? <span> {label} </span> : null}
        <input
          ref={textEl}
          className={`${className} ${baseStyles}`}
          type="text"
          id={id}
          name={name}
          autoComplete="off"
          required
          pattern="[a-zA-Z0-9]+"
          title="Please enter only letters and numbers (no special characters)."
          minLength="2"
          maxLength="30"
          onInput={onInputChange}
        />
        <FormRowError
          error={error}
          tempError="Entered value needs to be a name."
        />
      </label>
    </p>
  );
}

export function Email({
  label,
  error,
  setError,
  emailEl,
  onInputChange,
  className,
}) {
  const ref = useOutsideClick(clearError);
  function clearError() {
    setError("");
  }
  return (
    <p className="" ref={ref}>
      <label className="relative w-full" htmlFor="mail">
        {label ? <span> {label} </span> : null}
        <input
          ref={emailEl}
          className={`${className} ${baseStyles}`}
          type="email"
          id="mail"
          name="mail"
          autoComplete="off"
          required
          minLength="8"
          maxLength="50"
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
  className,
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
