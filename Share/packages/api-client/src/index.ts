

// // // // // shared/packages/api-client/src/index.ts

// // // import axios from 'axios';

// // // const getTokenFromStorage = (): string | null => {
// // //   try {
// // //     const authStorage = localStorage.getItem('auth-storage');
// // //     if (authStorage) {
// // //       const parsed = JSON.parse(authStorage);
// // //       return parsed.state?.token || null;
// // //     }
// // //   } catch (e) {}
// // //   return null;
// // // };

// // // export const apiClient = axios.create({
// // //   baseURL: 'http://localhost:9000',
// // //   withCredentials: true,
// // // });

// // // apiClient.interceptors.request.use((config) => {
// // //   const token = getTokenFromStorage();
// // //   if (token) {
// // //     config.headers.Authorization = `Bearer ${token}`;
// // //   }
// // //   return config;
// // // });

// // import axios from 'axios';

// // const getTokenFromStorage = (): string | null => {
// //   try {
// //     const authStorage = localStorage.getItem('auth-storage');

// //     if (authStorage) {
// //       const parsed = JSON.parse(authStorage);

// //       return parsed.state?.token || null;
// //     }
// //   } catch (e) {}

// //   return null;
// // };

// // export const apiClient = axios.create({
// //   baseURL: 'http://localhost:9000',
// //   withCredentials: true,
// // });

// // apiClient.interceptors.request.use((config) => {
// //   const token = getTokenFromStorage();

// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }

// //   return config;
// // });



// import axios from 'axios';

// const getTokenFromStorage = (): string | null => {
//   try {
//     const authStorage = localStorage.getItem('auth-storage');

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

//   console.log('TOKEN =>', token);

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

import axios from 'axios';

const getTokenFromStorage = (): string | null => {
  try {
    const authStorage = localStorage.getItem(
      'auth-storage',
    );

    if (authStorage) {
      const parsed = JSON.parse(authStorage);

      return parsed.state?.token || null;
    }
  } catch (e) {}

  return null;
};

export const apiClient = axios.create({
  baseURL: 'http://localhost:9000',
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getTokenFromStorage();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});