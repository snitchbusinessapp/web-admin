import { StateCreator } from "zustand";

import { StoreSlice } from "../types";

export interface EmailAuthState {
  isLoading: boolean;
  error: string | null;
}

export interface EmailAuthActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type EmailAuthSlice = EmailAuthState & EmailAuthActions;

export const createEmailAuthSlice: StateCreator<
  StoreSlice,
  [],
  [],
  { email: EmailAuthSlice }
> = (set) => {
  const setEmailState = (partial: Partial<EmailAuthSlice>) =>
    set((state) => ({
      email: { ...state.email, ...partial },
    }));

  return {
    email: {
      isLoading: false,
      error: null,
      setLoading: (isLoading) => setEmailState({ isLoading }),
      setError: (error) => setEmailState({ error }),
    },
  };
};
