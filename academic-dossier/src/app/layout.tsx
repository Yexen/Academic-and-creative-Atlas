'use client';

import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import Navigation from '@/components/Navigation';
import AdminBar from '@/components/AdminBar';
import './globals.css';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { currentLang, setCurrentLang } = useLanguage();
  const { isAdminMode } = useAdmin();

  return (
    <html lang={currentLang} dir={currentLang === 'fa' ? 'rtl' : 'ltr'}>
      <head>
        <title>Yekta Jokar - Academic Dossier</title>
        <meta name="description" content="Interdisciplinary researcher bridging philosophy, archaeology, and AI interaction design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-times">
        <AdminBar />
        <div className={isAdminMode ? 'pt-12' : ''}>
          <Navigation lang={currentLang} onLanguageChange={setCurrentLang} />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-600 academic-text">
                © 2025 Yekta Jokar. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Philosopher | AI Interaction Designer | Interdisciplinary Researcher
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <AdminProvider>
        <LayoutContent>{children}</LayoutContent>
      </AdminProvider>
    </LanguageProvider>
  );
}
