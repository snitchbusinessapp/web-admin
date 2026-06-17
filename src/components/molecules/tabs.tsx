import clsx from "clsx";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}
const Tabs = ({
  tabs,
  onSelectTab,
  selectedTab,
}: {
  tabs: Tab[];
  onSelectTab?: CallableFunction;
  selectedTab?: string;
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState(tabs[0].id);
  if (onSelectTab && selectedTab !== selectedSectionId) {
    onSelectTab(selectedSectionId);
  }
  return (
    <div className="rounded-xl bg-surface-container flex p-s4 gap-s8 items-center">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => {
            setSelectedSectionId(tab.id);
            onSelectTab?.(tab.id);
          }}
          className={clsx(
            "h-12 py-s8 px-s12 flex items-center justify-center text-md leading-normal cursor-pointer",
            selectedSectionId === tab.id
              ? "text-light-on-light font-medium bg-light rounded-lg"
              : "text-surface-on-surface-subtle font-normal",
          )}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
