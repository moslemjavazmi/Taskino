// frontend/app/admin-app/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // اگر از Turbopack استفاده می‌کنید
    turbo: {
      // تنظیمات Turbopack
    },
  },
  // تنظیم برای رفع مشکل CORS در محیط توسعه
  allowedDevOrigins: ['localhost', '172.18.128.1'],
  // برای اطمینان از اینکه ماژول‌های پکیج به درستی import می‌شوند
  transpilePackages: ['@packages/ui-kit'],
};

module.exports = nextConfig;