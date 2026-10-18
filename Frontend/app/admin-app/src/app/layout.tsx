

// frontend/app/admin-app/src/app/layout.tsx
'use client';
import "./globals.css";
import { AuthProvider } from '@packages/auth-store/src/provider';

export default function RootLayout({ children }) {
  return (
    <html dir="ltr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}