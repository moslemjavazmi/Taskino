
// shared/packages/auth-store/src/withAuth.tsx
'use client';

import { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, UserRole } from './index';

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: { roles?: UserRole[]; permissions?: string[]; redirectTo?: string } = {}
) {
  return function (props: P) {
    const router = useRouter();
    const { isAuthenticated, isLoading, hasRole, hasPermission } = useAuthStore();
    const { roles, permissions, redirectTo = '/' } = options;

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated()) {
          router.replace(`${redirectTo}?redirect=${encodeURIComponent(window.location.pathname)}`);
        } else if (roles && !hasRole(roles)) {
          router.replace('/unauthorized');
        } else if (permissions && !hasPermission(permissions)) {
          router.replace('/unauthorized');
        }
      }
    }, [isLoading, isAuthenticated, router, redirectTo, roles, permissions, hasRole, hasPermission]);

    if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (!isAuthenticated()) return null;
    if (roles && !hasRole(roles)) return null;
    if (permissions && !hasPermission(permissions)) return null;

    return <WrappedComponent {...props} />;
  };
}