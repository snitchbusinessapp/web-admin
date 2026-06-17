import { useMutation } from '@tanstack/react-query';

import { apiRequest, type ApiResult, authenticatedApiRequest } from '../api-client';

export interface PresignedUrlParams {
  type: 'post' | 'get';
  extension: string;
}
export interface PresignedPostFields {
  key: string;
  policy: string;
  'x-amz-algorithm': string;
  'x-amz-credential': string;
  'x-amz-date': string;
  'x-amz-signature': string;
  [key: string]: string;
}

export interface PresignedPostUrl {
  fields: PresignedPostFields;
  url: string;
}

export interface PresignedUrlResponse {
  path: string;
  url: string | PresignedPostUrl;
}

export interface LogoutParams {
  refresh_token: string;
}
export interface ChangePasswordParams {
  current_password: string;
  new_password: string;
}

interface UserProfileParams {
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar_url?: string;
  password: string;
  preferences?: string[];
}
interface PatchProfileParams {
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar_url?: string;
}
export function usePresignedUrl() {
  return useMutation({
    mutationFn: async (params: PresignedUrlParams): Promise<ApiResult<PresignedUrlResponse>> => {
      const res = await authenticatedApiRequest<PresignedUrlResponse>(
        '/api/users/profile/presigned-url',
        {
          method: 'POST',
          body: JSON.stringify({ ...params }),
        }
      );
      return res;
    },
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: async (params: UserProfileParams): Promise<number> => {
      const res = await authenticatedApiRequest<PresignedUrlResponse>('/api/users/profile', {
        method: 'POST',
        body: JSON.stringify({ ...params }),
      });
      return res.statusCode;
    },
  });
}
export function usePatchProfile() {
  return useMutation({
    mutationFn: async (params: PatchProfileParams): Promise<ApiResult<number>> => {
      const res = await authenticatedApiRequest<number>('/api/users/profile', {
        method: 'PATCH',
        body: JSON.stringify({ ...params }),
      });
      return res;
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async (params: LogoutParams): Promise<void> => {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
        body: JSON.stringify({
          refresh_token: params.refresh_token,
        }),
      });
    },
  });
}
export function useCloseAccount() {
  return useMutation({
    mutationFn: async (): Promise<ApiResult<void>> => {
      return await authenticatedApiRequest('/api/users/close-account', {
        method: 'POST',
      });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (params: ChangePasswordParams): Promise<ApiResult<void>> => {
      return await authenticatedApiRequest('/api/users/profile/change-password', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    },
  });
}
