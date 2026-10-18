
// shared/packages/auth-store/src/provider.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore, User, UserRole } from './index';
import { apiClient } from '@packages/api-client';

export const AuthProvider = ({ children, apiBaseUrl }: { children: React.ReactNode; apiBaseUrl?: string }) => {
  const { setInitialized, setAuth, token, isLoading, isInitialized } = useAuthStore();

  // useEffect(() => {
  //   if (apiBaseUrl) setApiBaseUrl(apiBaseUrl);
  // }, [apiBaseUrl]);

  useEffect(() => {
    const initAuth = async () => {
      // اگر توکن در استور هست، اعتبار آن را با سرور چک کن
      if (token) {
        try {
          const response = await apiClient.get('/api/auth/me');
          const userData = response.data;
          // تبدیل نقش‌ها به enum (بک‌اند حروف بزرگ می‌فرستد)
          const user: User = {
            id: userData.id,
            mobile: userData.mobile,
            verified: userData.verified,
            roles: userData.roles as UserRole[],
            permissions: userData.permissions,
          };
          setAuth(user, token, useAuthStore.getState().refreshToken);
        } catch (error) {
          console.error('Token validation failed', error);
          useAuthStore.getState().logout();
        }
      }
      setInitialized(true);
    };
    if (!isInitialized && !isLoading) initAuth();
  }, [token, isInitialized, isLoading, setAuth, setInitialized]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  return <>{children}</>;
};