function FormInput({ label, type, name, placeholder, required }) {
  return (
    <div className="mb-4">
      {label ? (
        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <input
        className="w-full border-b-2 border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default FormInput;
