import React from "react";

const Card = ({
  children,
  className,
  title,
  description,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}) => {
  const showHeader = title || description;
  return (
    <div
      className={`rounded-lg relative overflow-hidden bg-surface ${className}`}
    >
      {showHeader && (
        <div className="w-full border-b border-subtle">
          <div className="p-s16 flex flex-row items-center justify-between">
            <div className="text-lg font-bold leading-normal text-surface-on-surface">
              {title}
            </div>
            <div className="text-sm font-normal leading-normal text-surface-on-surface-subtle">
              {description}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
