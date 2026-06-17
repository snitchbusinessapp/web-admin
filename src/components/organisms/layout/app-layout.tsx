import { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./left-sidebar";
import TopNavbar from "./top-navbar";
import { useStore } from "../../../store";

const AppLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const user = useStore((state) => state.user);

  return (
    <div className="h-full w-full bg-surface-container-subtle flex flex-row">
      <LeftSidebar isOpen={isSidebarVisible} />
      <div className="flex h-full min-h-0 w-full flex-col">
        <TopNavbar onToggleNavbar={setIsSidebarVisible} user={user} />
        <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto p-s24 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
