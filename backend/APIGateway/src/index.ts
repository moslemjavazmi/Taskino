
// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// const jwt = require('jsonwebtoken');

// const app = express();
// const PORT = process.env.PORT || 9000;

// // CORS
// app.use((req, res, next) => {
//   const origin = req.headers.origin;

//   if (origin) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   res.header('Access-Control-Allow-Credentials', 'true');

//   res.header(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, OPTIONS',
//   );

//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, X-Requested-With',
//   );

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   next();
// });

// const JWT_SECRET = process.env.JWT_ACCESS_SECRET!;
// const JWT_AUDIENCE = process.env.JWT_AUDIENCE!;
// const JWT_ISSUER = process.env.JWT_ISSUER!;

// function authenticate(
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) {
//   const authHeader = req.headers.authorization;

//   console.log('AUTH HEADER =>', authHeader);

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({
//       message: 'Unauthorized',
//     });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET, {
//       audience: JWT_AUDIENCE,
//       issuer: JWT_ISSUER,
//     }) as any;

//     console.log('JWT OK =>', decoded);

//     req.headers['x-user-id'] = decoded.sub;

//     req.headers['x-user-roles'] = JSON.stringify(
//       decoded.roles || [],
//     );

//     next();
//   } catch (err: any) {
//     console.error('JWT verification failed:', err.message);

//     return res.status(401).json({
//       message: 'Invalid or expired token',
//     });
//   }
// }

// // AUTH
// app.use(
//   '/api/auth',
//   createProxyMiddleware({
//     target: 'http://localhost:8000',
//     changeOrigin: true,
//   }),
// );

// // USER
// app.use(
//   '/api/user',
//   authenticate,
//   createProxyMiddleware({
//     target: 'http://localhost:8100',
//     changeOrigin: true,
//   }),
// );

// //Offer
// app.use(
//   '/api/tasks/:taskId/offers',
//   authenticate,
//   createProxyMiddleware({
//     target: 'http://localhost:8501',
//     changeOrigin: true,
//     proxyTimeout: 10000, // ۱۰ ثانیه
//     timeout: 10000,
//   })
// );


// // TASK
// app.use(
//   '/api/tasks',
//   authenticate,
//   createProxyMiddleware({
//     target: 'http://localhost:8200',
//     changeOrigin: true,
//   }),
// );
// // app.use(
// //   '/api/search',
// //   createProxyMiddleware({
// //     target: 'http://localhost:8300',
// //     changeOrigin: true,
// //   }),
// // );
// app.use(
//   '/api/search',
//   authenticate,
//   createProxyMiddleware({
//     target: 'http://localhost:8300',
//     changeOrigin: true,
//   }),
// );
// app.use(
//   '/api/matching',
//   authenticate,
//   createProxyMiddleware({
//     target: 'http://localhost:8300',
//     changeOrigin: true,
//   }),
// );
// app.listen(PORT, () => {
//   console.log(
//     `🚀 API Gateway running on http://localhost:${PORT}`,
//   );
// });
// backend/Api-Gateway/src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 9000;

// CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With',
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const JWT_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE!;
const JWT_ISSUER = process.env.JWT_ISSUER!;

function authenticate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      audience: JWT_AUDIENCE,
      issuer: JWT_ISSUER,
    }) as any;
    req.headers['x-user-id'] = decoded.sub;
    req.headers['x-user-roles'] = JSON.stringify(decoded.roles || []);
    console.log('✅ Authenticated user:', decoded.sub);
    next();
  } catch (err: any) {
    console.error('❌ JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// ========== مسیرهای عمومی ==========
app.use(
  '/api/auth',
  createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true,
    logLevel: 'debug',
  })
);

// ========== مسیرهای محافظت‌شده ==========

// ۱. مسیرهای آفر (برای دریافت پیشنهادات یک تسک)
//    باید قبل از /api/tasks بیاید تا اولویت داشته باشد
app.use(
  '/api/tasks/:taskId/offers',
  authenticate,
  createProxyMiddleware({
    target: 'http://localhost:8501',
    changeOrigin: true,
    logLevel: 'debug',          // لاگ دقیق
    proxyTimeout: 10000,
    timeout: 10000,
    // در صورت نیاز pathRewrite
    // pathRewrite: { '^/api': '' }, // اگر سرویس آفر پیشوند /api نداشت
    onProxyReq: (proxyReq, req, res) => {
      console.log(`🔁 Proxying to Offer Service: ${req.method} ${req.url}`);
    },
    onError: (err, req, res) => {
      console.error('❌ Proxy error:', err.message);
      res.status(504).json({ message: 'Gateway timeout' });
    },
  })
);

// ۲. مسیرهای عمومی آفر (برای ویرایش و پذیرش پیشنهاد)
app.use(
  '/api/offers',
  authenticate,
  createProxyMiddleware({
    target: 'http://localhost:8501',
    changeOrigin: true,
    logLevel: 'debug',
    proxyTimeout: 10000,
    timeout: 10000,
    onProxyReq: (proxyReq, req, res) => {
      console.log(`🔁 Proxying to Offer Service (offers): ${req.method} ${req.url}`);
    },
  })
);

// ۳. مسیرهای تسک (بقیه درخواست‌های /api/tasks)
app.use(
  '/api/tasks',
  authenticate,
  createProxyMiddleware({
    target: 'http://localhost:8200',
    changeOrigin: true,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
      console.log(`🔁 Proxying to Task Service: ${req.method} ${req.url}`);
    },
  })
);

// ۴. سایر سرویس‌ها
app.use(
  '/api/user',
  authenticate,
  createProxyMiddleware({
    target: 'http://localhost:8100',
    changeOrigin: true,
    logLevel: 'debug',
  })
);

app.use(
  '/api/search',
  authenticate,
  createProxyMiddleware({
    target: 'http://localhost:8300',
    changeOrigin: true,
    logLevel: 'debug',
  })
);

app.use(
  '/api/matching',
  authenticate,
  createProxyMiddleware({
    target: 'http://localhost:8300',
    changeOrigin: true,
    logLevel: 'debug',
  })
);

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});