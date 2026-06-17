import { XIcon } from "@phosphor-icons/react";

const ToastError = ({
  error,
  onClose,
}: {
  error: string;
  onClose: () => void;
}) => {
  return (
    <div className="w-full h-fit bg-error-subtle py-s8 px-s12 flex flex-col gap-s4 rounded-md animate-drawer-down">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="text-surface-on-surface text-md font-normal leading-normal">
          Couldn't sign you in
        </div>
        <XIcon
          className="text-surface-on-surface cursor-pointer"
          size={20}
          weight="regular"
          onClick={onClose}
        />
      </div>
      <div className="text-sm font-normal text-surface-on-surface-subtle leading-normal">
        {error}
      </div>
    </div>
  );
};

export default ToastError;
