import {
  CaretLeftIcon,
  CheckIcon,
  DotOutlineIcon,
  XIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import BaseBtn from "components/atoms/button/button";
import BaseInput from "components/atoms/input/base-input";
import Card from "components/organisms/card";
import { Dispatch, FormEvent, SetStateAction, useMemo, useState } from "react";
import {
  isEmailValid,
  PASSWORD_VALIDATIONS,
} from "../../lib/helpers/validators";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "email" | "reset" | "success";

const Email = ({
  email,
  setEmail,
  setError,
  error,
  onContinue,
}: {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  error: string;
  onContinue: () => void;
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <form className="flex flex-col gap-s24" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-s8">
        <div
          id="forgot-password-title"
          className="text-surface-on-surface text-xxl font-bold leading-normal"
        >
          Forgot your password?
        </div>
        <p className="text-surface-on-surface-subtle text-md font-normal leading-normal">
          Enter the email address you used when you joined and we&apos;ll send
          you instructions to reset your password.
        </p>
      </div>

      <BaseInput
        placeholder="Email"
        className="w-full"
        value={email}
        errorMessage={error}
        isError={!!error}
        onChangeText={(text) => {
          setError("");
          setEmail(text);
        }}
      />

      <BaseBtn label="Continue" variant="solid" type="submit" />
    </form>
  );
};

const ResetPassword = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  confirmPasswordError,
  setConfirmPasswordError,
  onContinue,
}: {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  confirmPasswordError: string;
  setConfirmPasswordError: Dispatch<SetStateAction<string>>;
  onContinue: () => void;
}) => {
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const passwordValidations = useMemo(
    () =>
      PASSWORD_VALIDATIONS.map((validation) => ({
        ...validation,
        isValid: validation.fn(password),
      })),
    [password],
  );

  const isPasswordValid = passwordValidations.every(
    (validation) => validation.isValid,
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (!isPasswordValid) {
      setShowValidationErrors(true);
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    }

    if (hasError) return;

    onContinue();
  };

  return (
    <form className="flex flex-col gap-s24" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-s8">
        <div
          id="reset-password-title"
          className="text-surface-on-surface text-xxl font-bold leading-normal"
        >
          Reset your password
        </div>
        <p className="text-surface-on-surface-subtle text-md font-normal leading-normal">
          Please enter a new password below.
        </p>
      </div>

      <div className="flex flex-col gap-s16">
        <div className="flex flex-col gap-s8">
          <BaseInput
            placeholder="Password"
            className="w-full"
            type="password"
            showPasswordToggle
            value={password}
            isError={showValidationErrors && !isPasswordValid}
            onChangeText={(text) => {
              setShowValidationErrors(false);
              setPassword(text);
            }}
          />
          <div
            className={clsx(
              "grid transition-[grid-template-rows] duration-300 ease-out",
              password ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
            aria-hidden={!password}
          >
            <div className="overflow-hidden">
              <div
                className={clsx(
                  "flex flex-col gap-s8",
                  password && "animate-drawer-down",
                )}
              >
                {passwordValidations.map((validation) => (
                  <div
                    className="flex flex-row items-center gap-s4"
                    key={validation.label}
                  >
                    {validation.isValid ? (
                      <CheckIcon
                        size={16}
                        className="text-success-on-surface"
                        weight="bold"
                      />
                    ) : showValidationErrors ? (
                      <XIcon
                        size={16}
                        className="text-error-on-surface"
                        weight="bold"
                      />
                    ) : (
                      <DotOutlineIcon
                        size={16}
                        className="text-surface-on-surface-subtle"
                        weight="fill"
                      />
                    )}
                    <span
                      className={clsx(
                        "font-poppins text-[12px] leading-normal",
                        validation.isValid
                          ? "text-success-on-surface"
                          : showValidationErrors
                            ? "text-error-on-surface"
                            : "text-surface-on-surface-subtle",
                      )}
                    >
                      {validation.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <BaseInput
          placeholder="Confirm password"
          className="w-full"
          type="password"
          showPasswordToggle
          value={confirmPassword}
          errorMessage={confirmPasswordError}
          isError={!!confirmPasswordError}
          onChangeText={(text) => {
            setConfirmPasswordError("");
            setConfirmPassword(text);
          }}
        />
      </div>

      <BaseBtn label="Continue" variant="solid" type="submit" />
    </form>
  );
};

const Success = ({ onClose }: { onClose: () => void }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-s24"
      onSubmit={handleSubmit}
    >
      <div className="rounded-full bg-primary-muted w-[60px] h-[60px] flex items-center justify-center">
        <CheckIcon size={24} className="text-primary-on-surface" />
      </div>
      <div className="flex flex-col items-center justify-center text-center gap-s8">
        <div className="text-surface-on-surface text-xxl font-bold leading-normal">
          Your password has been reset successfully
        </div>
        <div className="text-surface-on-surface-subtle text-lg font-normal leading-normal">
          Please enter your new password when signing in
        </div>
      </div>
      <BaseBtn label="Back to Sign in" variant="solid" type="submit" />
    </form>
  );
};

const ForgotPasswordModal = ({ open, onClose }: ForgotPasswordModalProps) => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const resetState = () => {
    setStep("email");
    setEmail("");
    setError("");
    setPassword("");
    setConfirmPassword("");
    setConfirmPasswordError("");
  };

  const onEmailContinue = () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!isEmailValid(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setStep("reset");
  };

  const onResetContinue = () => {
    setStep("success");
  };

  const handleGoBack = () => {
    if (step === "reset") {
      setStep("email");
      setPassword("");
      setConfirmPassword("");
      setConfirmPasswordError("");
      return;
    }

    resetState();
    onClose();
  };

  if (!open) return null;

  const titleId =
    step === "email" ? "forgot-password-title" : "reset-password-title";

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center bg-no-repeat p-s24"
      style={{ backgroundImage: "url(/signInLeftPanel.png)" }}
      role="presentation"
    >
      <div
        className="animate-fade-in-up"
        onClick={(event) => event.stopPropagation()}
      >
        <Card className="bg-surface w-[480px] p-s32 flex flex-col gap-s24">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex flex-col gap-s24"
          >
            <button
              type="button"
              onClick={handleGoBack}
              className="flex w-fit flex-row items-center gap-s4 border-0 bg-transparent p-0 text-primary text-lg font-md leading-normal hover:underline cursor-pointer"
            >
              <CaretLeftIcon size={16} weight="bold" />
              Go back
            </button>

            {step === "email" ? (
              <Email
                email={email}
                error={error}
                onContinue={onEmailContinue}
                setEmail={setEmail}
                setError={setError}
              />
            ) : step === "reset" ? (
              <ResetPassword
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                confirmPasswordError={confirmPasswordError}
                setConfirmPasswordError={setConfirmPasswordError}
                onContinue={onResetContinue}
              />
            ) : (
              <Success
                onClose={() => {
                  resetState();
                  onClose();
                }}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
