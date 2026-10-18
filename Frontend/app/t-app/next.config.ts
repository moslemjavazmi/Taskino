// import type { NextConfig } from "next";

// const nextConfig = {
//   experimental: {
//     // اگر از Turbopack استفاده می‌کنید
//     turbo: {
//       // تنظیمات Turbopack
      
//     },
//   },
//   // تنظیم برای رفع مشکل CORS در محیط توسعه
//   allowedDevOrigins: ['localhost', '172.18.128.1'],
//   // برای اطمینان از اینکه ماژول‌های پکیج به درستی import می‌شوند
//   transpilePackages: ['@packages/ui-kit'],
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost'],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:9000/api/:path*",
      },
    ];
  },

};

export default nextConfig;