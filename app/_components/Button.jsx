import Link from "next/link";

function Button({
  as = "button",
  variant = "primary",
  href = "/",
  className,
  children,
  secondary = false,
  ...rest
}) {
  const commonClasses =
    "transition-colors capitalize border duration-300 ease-in-out focus:outline-none focus:ring focus:ring-offset-2 text-base font-medium py-4 px-12 rounded";

  const styles = {
    primary:
      "bg-primary border-transparent hover:bg-primary-hover active:bg-primary-hover focus:ring-primary-hover text-white",
    secondary: "border-discount bg-transparent text-black hover:bg-secondary",
  };

  if (as === "link")
    return (
      <Link href={href} className={` ${commonClasses} ${styles[variant]} ${className}`}>
        {children}
      </Link>
    );
  return (
    <button {...rest} className={`${commonClasses} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
