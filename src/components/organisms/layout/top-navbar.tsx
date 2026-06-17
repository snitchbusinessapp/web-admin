import { BellIcon, SidebarSimpleIcon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";
import { User } from "../../../store/slices";

const TopNavbar = ({
  onToggleNavbar,
  user,
}: {
  onToggleNavbar: Dispatch<SetStateAction<boolean>>;
  user?: User;
}) => {
  return (
    <div className="h-20 p-s16 bg-surface flex flex-row items-center justify-between self-stretch border-b border-subtle w-full">
      <div
        className="h-btn-size-lg w-btn-size-lg flex items-center justify-center cursor-pointer"
        onClick={() => onToggleNavbar((isOpen) => !isOpen)}
      >
        <SidebarSimpleIcon size={24} />
      </div>
      <div className="flex flex-row items-center gap-s12 w-fit">
        <div className="w-btn-size-lg h-btn-size-lg rounded-full border border-neutral items-center justify-center flex">
          <BellIcon size={24} />
        </div>
        <div className="w-btn-size-lg h-btn-size-lg capitalize rounded-full border justify-center border-none flex bg-surface-container-subtle text-lg font-medium items-center">
          {user?.firstName[0]}
          {user?.lastName[0]}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
