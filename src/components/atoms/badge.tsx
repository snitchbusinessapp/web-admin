import clsx from "clsx";

type Status = "active" | "paused";
const VARIANT: Record<Status, string[]> = {
  active: ["bg-secondary-subtle", "text-secondary-on-surface"],
  paused: ["bg-neutral-pressed", "text-neutral-on-surface"],
};
const Badge = ({ status, label }: { status: Status; label?: string }) => {
  return (
    <div
      className={clsx(
        "px-s4 h-5 flex items-center justify-center rounded-sm text-xs font-normal leading-normal capitalize",
        ...VARIANT[status],
      )}
    >
      {label ?? status}
    </div>
  );
};

export default Badge;
