import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer: React.FC<AuthInitializerProps> = ({
  children,
}) => {
  const {
    initializeAuth,
    isLoading,
    isAuthenticated,
    user,
    token,
    setLoading,
  } = useAuthStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (
      isAuthenticated &&
      user &&
      token &&
      isLoading &&
      !hasInitialized.current
    ) {
      setLoading(false);
      hasInitialized.current = true;
    }
  }, [isAuthenticated, user, token, isLoading, setLoading]);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;

      if (isAuthenticated && user && token) {
        setLoading(false);
        return;
      }

      initializeAuth();
    }
  }, [initializeAuth, isAuthenticated, user, token, setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white text-lg">Iniciando aplicación...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
