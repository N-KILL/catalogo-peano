import { create } from 'zustand';

interface ChangePasswordUIState {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;

  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  resetForm: () => void;
}

export const useChangePasswordStore = create<ChangePasswordUIState>((set) => ({
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,

  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),

  toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
  toggleShowConfirmPassword: () => set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),

  resetForm: () => set({ password: '', confirmPassword: '' }),
}));
