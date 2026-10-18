

// // shared/packages/auth-sdk/src/index.ts

import { apiClient } from '@packages/api-client';
import type { SendCodeRequest, VerifyCodeRequest, AuthResponse, RefreshRequest } from '@packages/types/src/auth';

export const authSdk = {
  // ارسال کد OTP به شماره موبایل
  sendCode: (data: SendCodeRequest) => 
    apiClient.post<{ message: string }>('/api/auth/send-code', data),

  // تایید کد و دریافت توکن‌ها
  verifyCode: (data: VerifyCodeRequest) => 
    apiClient.post<AuthResponse>('/api/auth/verify-code', data),

  // رفرش توکن (در صورت نیاز به صورت مستقیم)
  refresh: (data: RefreshRequest) => 
    apiClient.post<AuthResponse>('/api/auth/refresh', data),
me: () => apiClient.get('/api/auth/me'),

  // خروج از دستگاه فعلی
  logout: (refreshToken: string) => 
    apiClient.post<{ message: string }>('/api/auth/logout', { refreshToken }),

  // خروج از تمام دستگاه‌ها
  logoutAll: () => 
    apiClient.post<{ message: string }>('/api/auth/logout-all'),
};