import { CaretDownIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface Option {
  id: string;
  label: string;
}
const Select = ({
  options,
  defaultOption,
}: {
  options: Option[];
  defaultOption: Option;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  const effectiveId = selectedOptionId ?? defaultOption.id;
  const selectedLabel =
    options.find((option) => option.id === effectiveId)?.label ??
    defaultOption.label;

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        rangeRef.current &&
        !rangeRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={rangeRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((open) => !open)}
        className="h-btn-size-lg p-s20 flex items-center justify-center gap-s8 rounded-lg bg-neutral text-neutral-on-surface cursor-pointer"
      >
        <span className="text-lg font-medium leading-normal">
          {selectedLabel}
        </span>
        <CaretDownIcon
          size={24}
          className={clsx(
            "transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-label="Date range"
          className="absolute right-0 top-full z-10 mt-s8 min-w-full rounded-xl border border-subtle bg-surface p-s4 shadow-soft animate-drawer-down"
        >
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={effectiveId === option.id}
              onClick={() => {
                setSelectedOptionId(option.id);
                setIsOpen(false);
              }}
              className={clsx(
                "w-full py-s8 px-s12 flex items-center text-md leading-normal cursor-pointer rounded-lg whitespace-nowrap",
                effectiveId === option.id
                  ? "text-light-on-light font-medium bg-light"
                  : "text-surface-on-surface-subtle font-normal hover:bg-surface-container-subtle",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
