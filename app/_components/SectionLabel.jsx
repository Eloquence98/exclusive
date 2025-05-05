function SectionLabel({ className, spanStyles, children }) {
  return (
    <h3 className={`${className} text-regular relative pl-9 font-semibold leading-9 text-primary`}>
      <span
        className={`${spanStyles} absolute left-0 top-0 inline-block h-full w-5 rounded bg-primary`}
      ></span>
      {children}
    </h3>
  );
}

export default SectionLabel;
