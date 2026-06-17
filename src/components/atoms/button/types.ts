import type { ReactNode } from "react";

export type Size = "lg" | "md" | "sm" | "xs";

export type VARIANT_TYPES = "solid" | "muted" | "neutral" | "ghost";
export type VARIANT_VALUES = { bg: string; text: string };
export type VARIANT_TYPE = Record<VARIANT_TYPES, VARIANT_VALUES>;

export interface BtnBaseInterface {
  label: string;
  size?: Size;
  style?: string;
  variant: VARIANT_TYPES;
  onPress?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  centerIcon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

export const BTN_SIZE: Record<Size, string> = {
  lg: "h-btn-size-lg",
  md: "h-btn-size-md",
  sm: "h-btn-size-sm",
  xs: "h-btn-size-xs",
};

export const BORDER_RADIUS: Record<Size, string> = {
  lg: "rounded-lg",
  md: "rounded-md",
  sm: "rounded-sm",
  xs: "rounded-xs",
};
