import { Globe2 } from "lucide-react";

type CountryFlagProps = Readonly<{
  code?: string | null;
  label?: string | undefined;
}>;

export function CountryFlag({ code, label }: CountryFlagProps) {
  const normalizedCode = code?.trim().toUpperCase();
  const accessibleLabel = label ?? normalizedCode ?? "Unknown country";

  if (normalizedCode === "CA") {
    return (
      <svg
        className="analytics-flag"
        viewBox="0 0 28 18"
        role="img"
        aria-label={`${accessibleLabel} flag`}
      >
        <rect width="28" height="18" rx="1.5" fill="#fff" />
        <path d="M0 0h7v18H0zM21 0h7v18h-7z" fill="#d80621" />
        <path
          d="m14 3 1.05 2.25 2.2-.8-.65 2.25 1.85.85-2.05 1.7.55 1.35-2.35-.4.2 3.05h-1.6l.2-3.05-2.35.4.55-1.35-2.05-1.7 1.85-.85-.65-2.25 2.2.8z"
          fill="#d80621"
        />
      </svg>
    );
  }

  if (normalizedCode === "US") {
    return (
      <svg
        className="analytics-flag"
        viewBox="0 0 28 18"
        role="img"
        aria-label={`${accessibleLabel} flag`}
      >
        <g>
          <rect width="28" height="18" fill="#fff" />
          {[0, 2.77, 5.54, 8.31, 11.08, 13.85, 16.62].map((y) => (
            <rect key={y} y={y} width="28" height="1.39" fill="#c8102e" />
          ))}
          <rect width="12" height="9.7" fill="#174a88" />
          {[2, 4, 6, 8, 10].flatMap((x) =>
            [1.6, 4.8, 8].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="0.38" fill="#fff" />
            )),
          )}
        </g>
      </svg>
    );
  }

  return (
    <span
      className="analytics-flag analytics-flag--unknown"
      role="img"
      aria-label={accessibleLabel}
    >
      <Globe2 aria-hidden="true" />
    </span>
  );
}

export function countryCodeFromTitle(title: string): string | null {
  const normalized = title.toLowerCase();
  if (normalized.includes("canada")) return "CA";
  if (normalized.includes("united states") || normalized === "usa") return "US";
  return null;
}
