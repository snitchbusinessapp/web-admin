import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createEmailAuthSlice } from "./auth";
import * as slices from "./slices";
import { StoreSlice } from "./types";

export const useStore = create<StoreSlice>()(
  persist(
    (set, get, api) => ({
      ...slices.createUserSlice(set, get, api),
      ...slices.createUISlice(set, get, api),
      ...createEmailAuthSlice(set, get, api),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        appearanceMode: state.appearanceMode,
        terms: state.terms,
        policies: state.policies,
      }),
    },
  ),
);
