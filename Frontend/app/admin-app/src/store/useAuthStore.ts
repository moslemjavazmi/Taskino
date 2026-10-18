
// // src/store/useAuthStore.ts
// import { create } from "zustand";
// export interface AuthUser {
//   sub: string;
//   mobile?: string;
//   roles: string[];
//   permissions: string[];
// }

// type AuthState = {
//   user: AuthUser | null;
//   loading: boolean;
//   initialized: boolean;
//   error: string | null;
//   setUser: (user: AuthUser | null) => void;
//   fetchUser: () => Promise<void>;
//   logout: () => Promise<void>;
//   // hasRole: (role: "admin" | "writer" | "user") => boolean;
// };

// export const useAuthStore = create<AuthState>((set, get) => ({
//   user: null,
//   loading: false,
//   initialized: false,
//   error: null,

//   setUser: (user) => set({ user }),

//   fetchUser: async () => {
//     set({ loading: true });
//     try {
//     const res = await fetch("/api/auth/me", { credentials: "include" });

//       if (!res.ok) {
//         set({ user: null, initialized: true });
//         return;
//       }
//       const data = await res.json();
//       console.log('data',data)
//       // ✅ داده کاربر را به IUser تایپ می‌کنیم
//       set({ user: data.user as AuthUser, initialized: true });
//     } catch (err) {
//       console.error("Fetch user failed:", err);
//       set({ user: null, initialized: true });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   logout: async () => {
//     try {
//       await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
//       // حذف کوکی‌ها
//       document.cookie = "access_token=; path=/; max-age=0";
//       document.cookie = "refresh_token=; path=/; max-age=0";
//       set({ user: null });
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   },

//   // hasRole: (role) => {
//   //   const user = get().user;
//   //   return user ? user.role === role : false;
//   // },
// }
// ));

import axios  from 'axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


export interface User {
  sub: string;
  mobile?: string;
  roles: string[];
  permissions: string[];
}
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
    setUser: (user: User | null) => void;

  login: (email: string, password: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isLoading: false,
        error: null,
  setUser: (user) => set({ user }),

        login: async (mobile: string) => {
          set({ isLoading: true, error: null });
          try {
            const response = await axios.post('http://localhost:8000/api/auth/verify-code', {mobile});
            set({
              user: response.data.user,
              token: response.data.accessToken,
              isLoading: false,
            });
          } catch (error) {

              console.log(error)
          }
        },
        fetchUser: async () => {
        set({ isLoading: true });
        try {
        const res = await fetch("http://localhost:8000/api/auth/me", { credentials: "include" });

          if (!res.ok) {
            set({ user: null });
            return;
          }
          const data = await res.json();
          // ✅ داده کاربر را به IUser تایپ می‌کنیم
          set({ user: data.user  });
        } catch (err) {
          console.error("Fetch user failed:", err);
          set({ user: null});
        } finally {
          set({ isLoading: false });
        }
      },
        logout: async () => {
          set({ isLoading: true });
          try {
            await axios.post('/auth/logout');
          } catch (error) {
              // ignore
              console.log(error)
          } finally {
            set({ user: null, token: null, isLoading: false });
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: 'auth-storage', // نام برای localStorage
        partialize: (state) => ({ user: state.user, token: state.token }), // فقط این موارد ذخیره شوند
      }
    ),
    { name: 'AuthStore' } // نام برای Redux DevTools
  )
);

export default useAuthStore;