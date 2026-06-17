import clsx from "clsx";

import { BORDER_RADIUS, BtnBaseInterface, Size, VARIANT_TYPE } from "./types";
import Spinner from "../spinner/spinner";

const FONT_SIZE: Record<Size, string> = {
  lg: "text-lg",
  md: "text-lg",
  sm: "text-md",
  xs: "text-sm",
};
const PADDING: Record<Size, string> = {
  lg: "px-s20",
  md: "px-s16",
  sm: "px-s12",
  xs: "px-s8",
};
const HEIGHT: Record<Size, string> = {
  lg: "h-btn-size-lg",
  md: "h-btn-size-md",
  sm: "h-btn-size-sm",
  xs: "h-btn-size-xs",
};

const VARIANT: VARIANT_TYPE = {
  solid: {
    bg: "bg-primary",
    text: "text-primary-on-primary",
  },
  ghost: {
    bg: "",
    text: "text-primary-on-surface",
  },
  muted: {
    bg: "bg-primary-muted",
    text: "text-primary-on-surface",
  },
  neutral: {
    bg: "bg-neutral",
    text: "text-neutral-on-surface",
  },
};

const BaseBtn = ({
  label,
  style,
  variant,
  leftIcon,
  rightIcon,
  centerIcon,
  loading,
  onPress,
  disabled = false,
  size = "lg",
  type = "button",
  ...props
}: BtnBaseInterface) => {
  const { bg: bgColor, text: textColor } = VARIANT[variant];
  return (
    <div className={clsx("w-full overflow-hidden", HEIGHT[size])}>
      <button
        className={clsx(
          "flex h-full w-full items-center justify-center cursor-pointer",
          PADDING[size],
          BORDER_RADIUS[size],
          style,
          disabled && variant === "solid" && "bg-disabled",
          loading && variant === "solid" && "bg-primary-loading",
          !disabled && !loading && bgColor,
        )}
        disabled={disabled || loading}
        type={type}
        onClick={onPress}
        {...props}
      >
        <div className="flex w-full flex-row items-center justify-between gap-s8">
          {leftIcon ?? <div />}
          <div className="flex flex-row items-center gap-s8">
            {loading && <Spinner variant="loading" />}
            <div
              className={clsx(
                disabled && "text-disabled-on-disabled",
                loading && "text-primary-on-primary-loading",
                !disabled && !loading && textColor,
                FONT_SIZE[size],
                variant === "solid"
                  ? "font-poppins-semibold"
                  : "font-poppins-medium",
              )}
            >
              {label}
            </div>
            {centerIcon}
          </div>
          {rightIcon ?? <div />}
        </div>
      </button>
    </div>
  );
};

export default BaseBtn;
