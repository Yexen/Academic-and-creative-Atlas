'use client';

import { AdminProvider } from '@/contexts/AdminContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-100">
        {children}
      </div>
    </AdminProvider>
  );
}