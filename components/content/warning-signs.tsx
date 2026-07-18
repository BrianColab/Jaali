import { CircleAlert } from "lucide-react";

type WarningSignsProps = Readonly<{
  items: readonly string[];
}>;

export function WarningSigns({ items }: WarningSignsProps) {
  return (
    <ul className="warning-signs">
      {items.map((item, index) => (
        <li className="warning-signs__item" key={`${index}-${item}`}>
          <CircleAlert
            className="warning-signs__icon"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
