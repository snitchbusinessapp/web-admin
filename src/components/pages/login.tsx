import BaseBtn from "components/atoms/button/button";
import BaseInput from "components/atoms/input/base-input";
import Packa from "components/atoms/logos/packa";
import Card from "components/organisms/card";
import { FormEvent, useState } from "react";
import { useEmailLogin } from "../../lib/mutations";
import ForgotPasswordModal from "./forgot-password-modal";
import ToastError from "components/atoms/toast/form-toast";
import { isEmailValid } from "../../lib/helpers/validators";
import type { User } from "../../store/slices/userSlice";

interface LoginProps {
  onSuccess: (user: User) => void;
  isExiting?: boolean;
}

const Login = ({ onSuccess, isExiting = false }: LoginProps) => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const { mutateAsync, isPending } = useEmailLogin();
  const onLogin = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!loginInfo["email"] || !loginInfo["password"]) {
      setErrors({
        email: !loginInfo["email"] ? "Email is required" : "",
        password: !loginInfo["password"] ? "Password is required" : "",
        general: errors["general"],
      });
      return;
    }
    if (!isEmailValid(loginInfo["email"])) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
      return;
    }
    const res = await mutateAsync(loginInfo);
    if (res.error?.detail) {
      setErrors({
        ...errors,
        general: res.error.detail,
      });
    } else if (res.data) {
      const {
        access_token,
        refresh_expires_in,
        refresh_token,
        expires_in,
        ...restOfData
      } = res.data;
      onSuccess({
        ...restOfData,
        token: {
          expires_in: expires_in.toString(),
          jwt: access_token,
          refresh_expires_in: refresh_expires_in.toString(),
          refresh_token,
        },
      });
    }
  };
  return (
    <div className="flex flex-row w-full h-full bg-surface-container-subtle p-5">
      <div
        className="flex flex-col w-1/2 h-full bg-cover bg-center bg-no-repeat p-[60px] flex-1 rounded-xxl"
        style={{ backgroundImage: "url(/signInLeftPanel.png)" }}
      >
        <div className="flex flex-col flex-1 justify-between">
          <Packa width={150} />
          <div className="flex flex-col gap-s16">
            <div className="text-surface-on-surface-subtle font-normal text-md">
              Packa operations portal
            </div>
            <div className="text-surface-on-surface text-[64px] font-bold leading-[88px]">
              Run Your Business With Confidence
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-full flex-1">
        <div className="items-center flex justify-center h-full px-[110px] py-[310px]">
          <Card
            className={`bg-surface w-full p-s32 flex flex-col gap-s24${isExiting ? " animate-login-card-exit" : ""}`}
          >
            <form
              className="flex flex-col gap-s24"
              onSubmit={onLogin}
              noValidate
            >
              <div className="flex flex-col gap-s8">
                <div className="text-surface-on-surface text-xxl font-bold leading-normal">
                  Sign in
                </div>
              </div>
              <div className="flex flex-col gap-s16 items-end">
                <BaseInput
                  placeholder="Email"
                  name="email"
                  autoComplete="email"
                  className="w-full"
                  errorMessage={errors["email"]}
                  isError={!!errors["email"]}
                  onChangeText={(text) => {
                    setErrors({ ...errors, email: "" });
                    setLoginInfo({ ...loginInfo, email: text });
                  }}
                />
                <BaseInput
                  placeholder="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full"
                  showPasswordToggle
                  errorMessage={errors["password"]}
                  isError={!!errors["password"]}
                  onChangeText={(text) => {
                    setErrors({ ...errors, password: "" });
                    setLoginInfo({ ...loginInfo, password: text });
                  }}
                />
                <button
                  type="button"
                  className="px-s20 w-full text-primary text-end hover:underline text-lg font-md leading-normal cursor-pointer border-0 bg-transparent"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
              {errors["general"] && (
                <ToastError
                  error={errors["general"]}
                  onClose={() => setErrors({ ...errors, general: "" })}
                />
              )}
              <BaseBtn
                label="Sign in"
                variant="solid"
                type="submit"
                loading={isPending}
                disabled={!loginInfo.email.length || !loginInfo.password.length}
              />
            </form>
          </Card>
        </div>
      </div>
      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default Login;
