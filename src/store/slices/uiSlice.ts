import { StateCreator } from 'zustand';

export type AppearanceMode = 'system' | 'light' | 'dark';
export type Language = 'en' | 'ar';
export interface UIState {
  modalVisible: boolean;
  appearanceMode: AppearanceMode;
  language: Language;
  terms: string;
  policies: string;
}

export interface UIActions {
  setModalVisible: (visible: boolean) => void;
  setAppearanceMode: (mode: AppearanceMode) => void;
  setLanguage: (mode: Language) => void;
  setTerms: (terms: string) => void;
  setPolicies: (policies: string) => void;
}

export type UISlice = UIState & UIActions;

export const createUISlice: StateCreator<UISlice, [], [], UISlice> = (set) => ({
  modalVisible: false,
  appearanceMode: 'system',
  language: 'ar',
  terms: '',
  policies: '',
  setModalVisible: (visible) => set({ modalVisible: visible }),
  setAppearanceMode: (mode) => set({ appearanceMode: mode }),
  setLanguage: (language) => set({ language: language }),
  setTerms: (terms) => set({ terms }),
  setPolicies: (policies) => set({ policies }),
});
