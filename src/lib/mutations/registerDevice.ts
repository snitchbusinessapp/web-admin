import { useMutation } from "@tanstack/react-query";
import { authenticatedApiRequest } from "../api-client";
export interface RegisterDevice {
  fcm_token: string;
  device: string;
}
export function useRegisterDevice() {
  return useMutation({
    mutationFn: async (params: RegisterDevice): Promise<void> => {
      await authenticatedApiRequest<unknown>("/api/user/register-device", {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
  });
}
