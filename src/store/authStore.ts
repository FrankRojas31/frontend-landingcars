import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authService } from '../services/api.service';
import type { User, LoginCredentials } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  lastAuthCheck: number | null;
  lastLoginTime: number | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
  clearAuthState: () => void;
}

const AUTH_CACHE_TTL = 30 * 60 * 1000;

let isInitializing = false;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      token: null,
      lastAuthCheck: null,
      lastLoginTime: null,

      setUser: (user: User | null) => {
        const token = user ? get().token : null;
        set({ 
          user, 
          isAuthenticated: !!user,
          token,
          lastAuthCheck: user ? Date.now() : null
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      clearAuthState: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          lastAuthCheck: null,
          lastLoginTime: null,
          isLoading: false
        });
      },

      initializeAuth: async () => {
        if (isInitializing) {
          return;
        }
        
        isInitializing = true;
        set({ isLoading: true });
        
        try {
          const state = get();
          
          if (state.token && state.user) {
            const cacheValid = state.lastAuthCheck && 
              (Date.now() - state.lastAuthCheck) < AUTH_CACHE_TTL;
            
            const isRecentLogin = state.lastLoginTime && 
              (Date.now() - state.lastLoginTime) < 60000;
            
            if (cacheValid || isRecentLogin) {
              authService.setInternalToken(state.token);
              set({ isLoading: false });
              return;
            }
            
            try {
              authService.setInternalToken(state.token);
              const currentUser = await authService.getCurrentUser();
              if (currentUser) {
                set({ 
                  user: currentUser, 
                  isAuthenticated: true,
                  token: state.token,
                  lastAuthCheck: Date.now(),
                  isLoading: false 
                });
                return;
              } else {
                set({ 
                  isLoading: false,
                  lastAuthCheck: Date.now()
                });
                return;
              }
            } catch (tokenError) {
              if (tokenError && typeof tokenError === 'object' && 'status' in tokenError) {
                const apiError = tokenError as { status: number };
                if (apiError.status === 401 || apiError.status === 403) {
                  get().clearAuthState();
                  authService.clearInternalToken();
                  set({ isLoading: false });
                  return;
                }
              }
              set({ isLoading: false });
              return;
            }
          }
          
          get().clearAuthState();
          authService.clearInternalToken();
          set({ isLoading: false });
        } catch (error) {
          console.error('Error initializing auth:', error);
          get().clearAuthState();
          authService.clearInternalToken();
          set({ isLoading: false });
        } finally {
          isInitializing = false;
        }
      },

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true });
          const response = await authService.login(credentials);
          
          if (response.success && response.data.user && response.data.token) {
            authService.setInternalToken(response.data.token);
            
            const now = Date.now();
            
            set({ 
              user: response.data.user, 
              isAuthenticated: true,
              token: response.data.token,
              lastAuthCheck: now,
              lastLoginTime: now,
              isLoading: false 
            });
            
          } else {
            set({ isLoading: false });
            throw new Error(response.message || 'Error en el login');
          }
        } catch (error) {
          console.error('Login failed:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          const state = get();
          if (state.token) {
            await authService.logout();
          }
        } catch (error) {
          console.error('Logout failed:', error);
        } finally {
          // Limpiar estado
          get().clearAuthState();
          authService.clearInternalToken();
        }
      },

      refreshUser: async () => {
        try {
          const state = get();
          if (!state.token) {
            get().clearAuthState();
            authService.clearInternalToken();
            return;
          }
          
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            set({ 
              user: currentUser, 
              isAuthenticated: true,
              token: state.token,
              lastAuthCheck: Date.now()
            });
          } else {
            set({ lastAuthCheck: Date.now() });
          }
        } catch (error) {
          console.error('Failed to refresh user:', error);
          if (error && typeof error === 'object' && 'status' in error) {
            const apiError = error as { status: number };
            if (apiError.status === 401 || apiError.status === 403) {
              await get().logout();
              return;
            }
          }
        }
      },
    }),
    {
      name: 'titan-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        lastAuthCheck: state.lastAuthCheck,
        lastLoginTime: state.lastLoginTime
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Error rehydrating auth state:', error);
          return;
        }
        
        if (state) {
          if (state.token) {
            authService.setInternalToken(state.token);
          }
        }
      },
      skipHydration: false,
      version: 2,
    }
  )
);
