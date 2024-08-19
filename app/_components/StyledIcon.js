function StyledIcon({ className = "", children }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-full bg-primary p-2 text-white`}
    >
      {children}
    </div>
  );
}

export default StyledIcon;
