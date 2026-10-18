// // shared/packages/types/src/auth.ts

// export type Role = "USER" | "TASKER" | "ADMIN";

// export interface User {
//   id: string;
//   mobile: string;
//   roles: Role[];
//   permissions: string[];
// }
// export interface SendCodeRequest {
//   mobile: string;
// }

// export interface VerifyCodeRequest {
//   mobile: string;
//   code: string;
// }
// export interface VerifyOtpResponse {
//   accessToken: string;
//   refreshToken: string;
//   user: User;
//   redirectTo?: string;
//   // requiresRoleSelection?: boolean;
//   roles?: Role[];
// }

// export interface RefreshResponse {
//   accessToken: string;
//   user: User;
// }
// export interface LogoutResponse {
//   message: string;
// }

// export interface ApiError {
//   message: string;
//   statusCode: number;
// }


export interface User {
  id: string;
  mobile: string;
  roles: string[];
  permissions: string[];
}

// درخواست ارسال کد OTP
export interface SendCodeRequest {
  mobile: string;
}

// درخواست تایید کد OTP
export interface VerifyCodeRequest {
  mobile: string;
  code: string;
}

// پاسخ موفقیت‌آمیز احراز هویت
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User; // معمولاً بعد از تایید OTP اطلاعات کاربر هم برمی‌گردد
}

// درخواست رفرش توکن
export interface RefreshRequest {
  refreshToken: string;
}

// پاسخ خروج
export interface LogoutResponse {
  message: string;
}

// می‌توانید تایپ‌های خطا را هم تعریف کنید
export interface ApiError {
  message: string;
  statusCode: number;
}