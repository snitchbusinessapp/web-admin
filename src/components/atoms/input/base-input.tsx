import clsx from "clsx";
import {
  EyeIcon,
  EyeSlashIcon,
  WarningIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import React, { forwardRef, useMemo, useState } from "react";

type BaseInputProps = Omit<
  React.ComponentProps<"input">,
  | "type"
  | "value"
  | "defaultValue"
  | "onChange"
  | "disabled"
  | "placeholder"
  | "className"
> & {
  placeholder?: string;
  validationFn?: (value: string) => boolean;
  errorMessage?: string;
  isError?: boolean;
  className?: string;
  hideClearBtn?: boolean;
  textPos?: "start" | "center" | "end";
  showPasswordToggle?: boolean;
  editable?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  type?: React.HTMLInputTypeAttribute;
};

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  function BaseInput(
    {
      placeholder,
      editable = true,
      value: valueProp,
      onChangeText,
      validationFn,
      errorMessage,
      className,
      hideClearBtn = false,
      textPos = "start",
      isError,
      showPasswordToggle = false,
      secureTextEntry: secureTextEntryProp,
      placeholderTextColor: placeholderTextColorProp,
      type: typeProp,
      onBlur,
      ...props
    },
    ref,
  ) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [internalValue, setInternalValue] = useState("");
    const [hasError, setHasError] = useState(false);
    const [passwordMasked, setPasswordMasked] = useState(true);
    const value = valueProp !== undefined ? valueProp : internalValue;
    const showFloatingLabel = useMemo(() => {
      if (!placeholder) return false;
      return isFocused || value.length > 0;
    }, [placeholder, isFocused, value]);
    const showClearButton = value.length > 0;

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.currentTarget.value;
      if (valueProp === undefined) setInternalValue(text);
      onChangeText?.(text);
      if (hasError && validationFn?.(text)) setHasError(false);
    };

    const handleClear = () => {
      if (valueProp === undefined) setInternalValue("");
      onChangeText?.("");
      if (hasError && validationFn?.("")) setHasError(false);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (validationFn && !validationFn(value)) {
        setHasError(true);
      } else {
        setHasError(false);
      }
      onBlur?.(e);
    };

    const showError = (hasError && errorMessage) || isError;

    const inputType = showPasswordToggle
      ? passwordMasked
        ? "password"
        : "text"
      : secureTextEntryProp
        ? "password"
        : typeProp;

    const showClear = showClearButton && !hideClearBtn;
    const hasTrailingControls = showPasswordToggle || showClear;
    const trailingPaddingClass = hasTrailingControls ? "pr-[30px]" : "";

    return (
      <div className={clsx("flex flex-col gap-s8", className)}>
        <div
          className={clsx(
            "relative min-h-12 flex flex-row rounded-input-radius border px-s12",
            showError
              ? "border-error"
              : isFocused
                ? "border-primary-pressed"
                : "border-border",
            editable === false && "border-disabled",
          )}
        >
          <div
            className={clsx(
              "min-h-12 flex-1 flex flex-col justify-center py-2",
              trailingPaddingClass,
            )}
          >
            {showFloatingLabel && (
              <div
                className={clsx(
                  "text-[12px]",
                  editable === false
                    ? "text-disabled-on-disabled"
                    : "text-surface-on-surface-subtle",
                )}
              >
                {placeholder}
              </div>
            )}
            <input
              ref={ref}
              type={inputType}
              className={clsx(
                "w-full border-0 bg-transparent p-0 font-poppins text-[14px] outline-none caret-primary-pressed ring-0",
                placeholderTextColorProp
                  ? `placeholder:text-[${placeholderTextColorProp}]`
                  : "placeholder:text-surface-on-surface-subtle",
                showFloatingLabel ? "mt-0" : "",
                `text-${textPos}`,
                editable === false
                  ? "text-disabled-on-disabled"
                  : "text-surface-on-surface",
              )}
              disabled={!editable}
              placeholder={showFloatingLabel ? "" : placeholder}
              value={value}
              onChange={handleChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              {...props}
            />
          </div>
          {hasTrailingControls && (
            <div className="absolute right-s12 top-0 flex h-full flex-row items-center gap-s8">
              {showClear && !showPasswordToggle && editable === true && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center justify-center border-0 bg-transparent p-0"
                  aria-label="Clear input"
                >
                  <XCircleIcon
                    size={25}
                    className="text-surface-on-surface-subtle"
                    weight="regular"
                  />
                </button>
              )}
              {showPasswordToggle && (
                <button
                  type="button"
                  onClick={() => setPasswordMasked((m) => !m)}
                  className="flex items-center justify-center border-0 bg-transparent p-0"
                  aria-label={
                    passwordMasked ? "Show password" : "Hide password"
                  }
                >
                  {passwordMasked ? (
                    <EyeIcon
                      size={22}
                      className="text-surface-on-surface-subtle"
                      weight="regular"
                    />
                  ) : (
                    <EyeSlashIcon
                      size={22}
                      className="text-surface-on-surface-subtle"
                      weight="regular"
                    />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
        {showError && errorMessage && (
          <div className="flex flex-row items-center gap-s8 text-error-on-surface">
            <WarningIcon size={15} weight="regular" />
            <div className="flex-1 text-[12px] leading-normal color-error-on-surface">
              {errorMessage}
            </div>
          </div>
        )}
      </div>
    );
  },
);

export default BaseInput;
