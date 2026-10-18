// app/admin/layout.tsx (or wherever your admin root layout is)
"use client";

import AdminLayout from "@packages/ui-kit/src/admin/layouts/AdminLayout";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}