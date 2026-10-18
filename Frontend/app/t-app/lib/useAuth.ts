// shared/packages/auth-store/src/useAuth.ts
'use client';

import { useAuthStore, UserRole } from './store';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { authSdk } from '@packages/auth-sdk';
import { apiClient } from '@packages/api-client';
import axios from 'axios';
// import { apiClient } from 'Share/packages/api-client/src/index';

export const useAuth = () => {
  const router = useRouter();
  const store = useAuthStore();
  const login = useCallback(async (mobile: string, code: string) => {
  store.setLoading(true);
  try {
    const { data } = await authSdk.verifyCode({ mobile, code });
    const { accessToken, refreshToken, user: userData } = data;  // user مستقیماً از پاسخ

    const user = {
      id: userData.id,
      mobile: userData.mobile,
      verified: userData.verified,
      roles: userData.roles as UserRole[],
      permissions: userData.permissions || [],
    };
    store.setAuth(user, accessToken, refreshToken);

    // بررسی پروفایل با userApiClient (توکن از localStorage خوانده می‌شود)
    const profileCheck = await apiClient.get('/api/user/profile/exists');
    if (!profileCheck.data.exists) {
      router.push('/setup-profile');
    } else {
      // هدایت بر اساس نقش
      if (user.roles.includes(UserRole.ADMIN)) router.push('/admin/dashboard');
      else if (user.roles.includes(UserRole.SUPPORTER)) router.push('/support/dashboard');
      else if (user.roles.includes(UserRole.TASKER)) router.push('/tasker/dashboard');
      else router.push('/dashboard');
    }
    return { success: true };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: error.response?.data?.message || 'خطا در ورود' };
  } finally {
    store.setLoading(false);
  }
}, [store, router]);
  const logout = useCallback(async () => {
    store.setLoading(true);
    try {
      if (store.refreshToken) await authSdk.logout(store.refreshToken);
    } catch (e) {}
    store.logout();
    router.push('/');
  }, [store, router]);

  return {
    user: store.user,
    token: store.token,
    refreshToken: store.refreshToken,
    isLoading: store.isLoading || !store.isInitialized,
    isAuthenticated: store.isAuthenticated(),
    roles: store.roles,
    permissions: store.permissions,
    hasRole: store.hasRole,
    hasPermission: store.hasPermission,
    login,
    logout,
    updateUser: store.updateUser,
  };
};