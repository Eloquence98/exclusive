function FormRowError({ error, tempError }) {
  return (
    <span
      className={`${error ? "scale-100 opacity-100" : "-translate-x-4 -translate-y-4 scale-0 opacity-0"} tooltip absolute -left-4 top-[78px] !z-[999] origin-top-left transition-all duration-300`}
      aria-live="polite"
    >
      {error ? error : tempError}
    </span>
  );
}

export default FormRowError;
