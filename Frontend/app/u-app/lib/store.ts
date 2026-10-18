
// shared/packages/auth-store/src/index.ts
import { create } from 'zustand';
import { persist,devtools } from 'zustand/middleware';
import Cookies from 'js-cookie';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPPORTER = 'SUPPORT',
  TASKER = 'TASKER',
}

export enum Permission {
  TASK_CREATE = 'task.create',
  TASK_VIEW = 'task.view',
  TASK_ACCEPT = 'task.accept',
  TASK_COMPLETE = 'task.complete',
  USER_VERIFY = 'user.verify',
}

// نقشه دسترسی‌های پیش‌فرض (در صورت نیاز)
export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: Object.values(Permission),
  [UserRole.USER]: [Permission.TASK_VIEW, Permission.TASK_CREATE],
  [UserRole.SUPPORTER]: [Permission.TASK_VIEW, Permission.USER_VERIFY],
  [UserRole.TASKER]: [Permission.TASK_VIEW, Permission.TASK_ACCEPT, Permission.TASK_COMPLETE],
};

export interface User {
  id: string;
  mobile: string;
  verified: boolean;
  roles: UserRole[];
  permissions?: Permission[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isInitialized: boolean;
  roles: UserRole[];
  permissions: Permission[];

  setAuth: (user: User | null, token?: string | null, refreshToken?: string | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  updateUser: (user: User) => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  hasPermission: (permission: Permission | Permission[]) => boolean;
  isAuthenticated: () => boolean;
}

const setCookie = (name: string, value: string | null, days: number) => {
  if (value) {
    Cookies.set(name, value, { expires: days, sameSite: 'lax', path: '/' });
  } else {
    Cookies.remove(name, { path: '/' });
  }
};

const extractRolesAndPermissions = (user: User | null) => {
  if (!user) return { roles: [], permissions: [] };
  const roles = user.roles;
  let permissions = user.permissions || [];
  // اگر مجوز از نقش استخراج نشده بود، از نقشه پیش‌فرض بگیر
  if (permissions.length === 0 && roles.length) {
    roles.forEach(role => {
      if (RolePermissions[role]) permissions.push(...RolePermissions[role]);
    });
    permissions = [...new Set(permissions)];
  }
  return { roles, permissions };
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      isInitialized: false,
      roles: [],
      permissions: [],

      setAuth: (user, token, refreshToken) => {
        const { roles, permissions } = extractRolesAndPermissions(user);
        set({ user, token: token ?? null, refreshToken: refreshToken ?? null, roles, permissions });
        if (token) setCookie('token', token, 7);
        if (refreshToken) setCookie('refreshToken', refreshToken, 30);
      },

      logout: () => {
        set({ user: null, token: null, refreshToken: null, roles: [], permissions: [] });
        setCookie('token', null, 0);
        setCookie('refreshToken', null, 0);
        localStorage.removeItem('auth-storage');
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setInitialized: (initialized) => set({ isInitialized: initialized }),

      updateUser: (user) => {
        const { roles, permissions } = extractRolesAndPermissions(user);
        set({ user, roles, permissions });
      },

      hasRole: (role) => {
        const state = get();
        if (!state.user) return false;
        const roles = Array.isArray(role) ? role : [role];
        return roles.some(r => state.roles.includes(r));
      },

      hasPermission: (permission) => {
        const state = get();
        if (!state.user) return false;
        const perms = Array.isArray(permission) ? permission : [permission];
        return perms.some(p => state.permissions.includes(p));
      },

      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        roles: state.roles,
        permissions: state.permissions,
      }),
    }
    ),
     { name: 'AuthStore' } // نام برای Redux DevTools
  )
    
);
