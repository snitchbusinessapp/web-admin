import { StateCreator } from "zustand";

import { StoreSlice } from "../types";

export interface User {
  email: string;
  id: string;
  username: string;
  hasCompletedRegistration?: boolean;
  hasVerifiedOtp?: boolean;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  preferences?: string[];
  token: {
    jwt: string;
    expires_in: string;
    refresh_token: string;
    refresh_expires_in: string;
  };
}

export enum Screen {
  LOGIN = "login",
  SIGNUP = "signup",
  HOME = "home",
  ONBOARDING = "onboarding",
}

export interface UserState {
  user?: User;
  screen: Screen;
}

export interface UserActions {
  setUser: (user?: User) => void;
  setScreen: (screen: Screen) => void;
  clearUser: () => void;
  logout: () => Promise<void>;
}

export type UserSlice = UserState & UserActions;

export const createUserSlice: StateCreator<StoreSlice, [], [], UserSlice> = (
  set,
) => ({
  user: undefined,
  screen: Screen.ONBOARDING,
  setUser: (user) => set({ user }),
  setScreen: (authScreen) => set({ screen: authScreen }),
  clearUser: () => set({ user: undefined }),
  logout: async () => {
    set({ user: undefined });
  },
});
