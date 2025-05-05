import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

const commonStyles =
  "flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-black focus:ring-2 focus:ring-secondary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50";

export default function SliderNavigationButton({ next, classes, onClick }) {
  if (onClick)
    return (
      <button className={`${classes} ${commonStyles}`} onClick={onClick}>
        {next ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </button>
    );

  return (
    <button className={`${classes} ${commonStyles}`}>
      {next ? <ArrowRightIcon /> : <ArrowLeftIcon />}
    </button>
  );
}
