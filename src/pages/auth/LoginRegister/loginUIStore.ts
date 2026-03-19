import { create } from 'zustand';

interface LoginUIState {
  isLogin: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  
  setIsLogin: (isLogin: boolean) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  resetForm: () => void;
  toggleMode: () => void;
}

export const useLoginUIStore = create<LoginUIState>((set) => ({
  isLogin: true,
  email: '',
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,

  setIsLogin: (isLogin) => set({ isLogin }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  
  toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
  toggleShowConfirmPassword: () => set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),

  resetForm: () => set({ email: '', password: '', confirmPassword: '' }),
  toggleMode: () => set((state) => ({ 
    isLogin: !state.isLogin, 
    password: '', 
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  })),
}));
