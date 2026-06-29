import { starRating } from "@/utils/utility";

export function Rating({ value, size = 14 }) {
  const rounded = starRating(value);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill = rounded >= i ? 1 : rounded >= i - 0.5 ? 0.5 : 0;
    stars.push(
      <svg
        key={i}
        width={size}
        height={size}
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`half-${i}-${size}`}>
            <stop offset="50%" stopColor="#141311" />
            <stop offset="50%" stopColor="#141311" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path
          d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.76L10 14.85l-5.18 2.58.99-5.76L1.62 7.59l5.79-.84L10 1.5z"
          fill={
            fill === 1
              ? "#141311"
              : fill === 0.5
                ? `url(#half-${i}-${size})`
                : "#14131133"
          }
        />
      </svg>,
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}
