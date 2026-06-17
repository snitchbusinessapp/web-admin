import { useMutation } from "@tanstack/react-query";

import { apiRequest, type ApiResult } from "../api-client";

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar_url: string;
}
export interface RegisterResponse {
  user_id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface EmailLoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
}

export interface VerifyOtpParams {
  user_id: string;
  code: string;
  username: string;
}

export interface ResendOtpParams {
  user_id: string;
  user_email: string;
}

export type VerifyOtpResponse = {
  token: string;
  refresh_token: string;
  expires_in: string;
  refresh_expires_in: string;
};

export interface GoogleTokenExchangeParams {
  code: string;
  code_verifier: string | undefined;
  redirect_uri: string;
}

export interface RefreshTokenParams {
  refresh_token: string;
}

interface ForgotPasswordParams {
  email: string;
}

interface ForgotPasswordVerifyOtpParams {
  email: string;
  code: string;
}

interface ResetPasswordParams {
  email: string;
  password: string;
  code: string;
}

export function useEmailLogin() {
  return useMutation({
    mutationFn: async (
      params: EmailLoginParams,
    ): Promise<ApiResult<LoginResponse>> => {
      const res = await apiRequest<LoginResponse>(
        "/api/auth/admin/email/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: params.email,
            password: params.password,
          }),
        },
      );
      return res;
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (params: RegisterParams) => {
      const res = await apiRequest<RegisterResponse>(
        "/api/auth/email/register",
        {
          method: "POST",
          body: JSON.stringify(params),
        },
      );
      return res;
    },
  });
}

export function useVerifyOTP() {
  return useMutation<ApiResult<VerifyOtpResponse>, Error, VerifyOtpParams>({
    mutationFn: async (params: VerifyOtpParams) => {
      const res = await apiRequest<VerifyOtpResponse>(
        "/api/auth/email/verify-otp",
        {
          method: "POST",
          body: JSON.stringify(params),
        },
      );
      return res;
    },
  });
}

export function useResendOTP() {
  return useMutation<ApiResult<VerifyOtpResponse>, Error, ResendOtpParams>({
    mutationFn: async (params: ResendOtpParams) => {
      const queryParams = new URLSearchParams({
        user_id: params.user_id,
        user_email: params.user_email,
      });
      const res = await apiRequest<VerifyOtpResponse>(
        `/api/auth/email/resend-otp?${queryParams}`,
        {
          method: "POST",
        },
      );
      return res;
    },
  });
}

export function useGoogleTokenExchange() {
  return useMutation({
    mutationFn: async (
      params: GoogleTokenExchangeParams,
    ): Promise<ApiResult<LoginResponse>> => {
      const res = await apiRequest<LoginResponse>("/api/auth/google/token", {
        method: "POST",
        body: JSON.stringify({
          code: params.code,
          code_verifier: params.code_verifier,
          redirect_uri: params.redirect_uri,
        }),
      });
      return res;
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: async (
      params: RefreshTokenParams,
    ): Promise<ApiResult<LoginResponse>> => {
      const res = await apiRequest<LoginResponse>("/api/auth/refresh-token", {
        method: "POST",
        body: JSON.stringify({
          refresh_token: params.refresh_token,
        }),
      });
      return res;
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (
      params: ForgotPasswordParams,
    ): Promise<ApiResult<void>> => {
      const res = await apiRequest<void>("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({
          email: params.email,
        }),
      });
      return res;
    },
  });
}

export function useForgotPasswordVerifyOtp() {
  return useMutation({
    mutationFn: async (
      params: ForgotPasswordVerifyOtpParams,
    ): Promise<ApiResult<void>> => {
      const res = await apiRequest<void>(
        "/api/auth/forgot-password-verify-otp",
        {
          method: "POST",
          body: JSON.stringify({
            email: params.email,
            code: params.code,
          }),
        },
      );
      return res;
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (
      params: ResetPasswordParams,
    ): Promise<ApiResult<void>> => {
      const res = await apiRequest<void>("/api/auth/forgot-password-reset", {
        method: "POST",
        body: JSON.stringify({
          email: params.email,
          code: params.code,
          password: params.password,
        }),
      });
      return res;
    },
  });
}
