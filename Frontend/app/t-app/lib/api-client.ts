

// import axios from 'axios';

// const getTokenFromStorage = (): string | null => {
//   try {
//     const authStorage = localStorage.getItem(
//       'auth-storage',
//     );

//     if (authStorage) {
//       const parsed = JSON.parse(authStorage);

//       return parsed.state?.token || null;
//     }
//   } catch (e) {}

//   return null;
// };

// export const apiClient = axios.create({
//   baseURL: 'http://localhost:9000',
//   withCredentials: true,
// });

// apiClient.interceptors.request.use((config) => {
//   const token = getTokenFromStorage();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });
import axios from 'axios';

const getTokenFromStorage = (): string | null => {
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      return parsed.state?.token || null;
    }
  } catch (e) {}
  return null;
};

const getUserIdFromStorage = (): string | null => {
  try {
    return localStorage.getItem('userId');
  } catch (e) {
    return null;
  }
};

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000',
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  // اضافه کردن توکن (اگر نیاز باشد)
  const token = getTokenFromStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // اضافه کردن x-user-id (مهم برای بک‌اند)
  const userId = getUserIdFromStorage();
  if (userId) {
    config.headers['x-user-id'] = userId;
  }

  return config;
});