import Packa from "components/atoms/logos/packa";
import clsx from "clsx";
import {
  CompassToolIcon,
  SquaresFourIcon,
  StorefrontIcon,
} from "@phosphor-icons/react";
import PackaLetter from "components/atoms/logos/packaLetter";
import { NavLink } from "react-router-dom";

const NAVIGATION = [
  { label: "Dashboard", Icon: SquaresFourIcon, path: "/dashboard" },
  { label: "Business profile", Icon: StorefrontIcon, path: "/business-profile" },
  { label: "Workshops", Icon: CompassToolIcon, path: "/workshops" },
];

const LeftSidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={clsx(
        "bg-surface flex flex-col items-start self-stretch h-full shrink-0 overflow-hidden border-r border-subtle transition-[width] duration-300 ease-in-out",
        isOpen ? "w-60" : "w-[68px]",
      )}
    >
      <div
        className={clsx(
          "h-20 p-s16",
          !isOpen && "flex items-center justify-center",
        )}
      >
        {isOpen ? (
          <Packa width={100} />
        ) : (
          <PackaLetter width={30} height={30} />
        )}
      </div>
      <div className="flex flex-1 flex-col px-s8 w-full">
        {NAVIGATION.map((n) => (
          <NavLink
            key={n.label}
            to={n.path}
            className={({ isActive }) =>
              clsx(
                "p-s16 flex flex-row gap-s8 items-center cursor-pointer w-full",
                isActive
                  ? "text-primary-on-surface bg-surface-container-subtle rounded-md"
                  : "text-surface-on-surface-subtle",
              )
            }
          >
            <n.Icon size={20} className="shrink-0" />
            {isOpen && (
              <span
                className={clsx(
                  "whitespace-nowrap overflow-hidden transition-opacity duration-200",
                  isOpen ? "opacity-100" : "opacity-0",
                )}
              >
                {n.label}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
