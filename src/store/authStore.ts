import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  passError: string | null;
  isPasswordRecovery: boolean;

  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setPassError: (passError: string | null) => void;
  signInWithOAuth: () => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<void>;
  clearError: () => void;
  setIsPasswordRecovery: (isRecovery: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  error: null,
  passError: null,
  isPasswordRecovery: false,

  setSession: (session) => set({ session, user: session?.user || null }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setPassError: (passError) => set({ passError }),
  clearError: () => set({ error: null, passError: null }),
  setIsPasswordRecovery: (isRecovery) => set({ isPasswordRecovery: isRecovery }),

  signInWithOAuth: async () => {
    set({ isLoading: true, error: null, passError: null });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      set({ error: err.message || 'Ocurrió un error al iniciar sesión con Google', isLoading: false });
    }
  },

  signInWithPassword: async (email, password) => {
    set({ isLoading: true, error: null, passError: null });
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      set({ error: err.message || 'Ocurrió un error al iniciar sesión', isLoading: false });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email, password) => {
    set({ isLoading: true, error: null, passError: null });
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (err: any) {
      set({ error: err.message || 'Ocurrió un error en el registro', isLoading: false });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    const { error } = await supabase.auth.signOut();
    if (error) {
      set({ error: error.message, isLoading: false });
    } else {
      set({ user: null, session: null, isLoading: false, error: null });
    }
  },

  updatePassword: async (password: string) => {
    set({ isLoading: true, error: null, passError: null });
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      set({ isPasswordRecovery: false });
    } catch (err: any) {
      set({ error: err.message || 'Ocurrió un error al actualizar la contraseña', isLoading: false });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  resetPasswordForEmail: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/change-password`,
      });
      if (error) throw error;
    } catch (err: any) {
      set({ error: err.message || 'Ocurrió un error al enviar el correo de recuperación', isLoading: false });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  }
}));

export const initializeAuth = () => {
  const setSession = useAuthStore.getState().setSession;
  const setLoading = useAuthStore.getState().setLoading;

  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
    setLoading(false);
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    setSession(session);
    if (event === 'PASSWORD_RECOVERY') {
      useAuthStore.getState().setIsPasswordRecovery(true);
    }
  });

  return subscription;
};
