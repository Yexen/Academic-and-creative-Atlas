'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language, getTranslation } from '@/lib/i18n';
import LanguageToggle from './LanguageToggle';
import { useEffect, useState } from 'react';

interface NavigationProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Navigation({ lang, onLanguageChange }: NavigationProps) {
  const pathname = usePathname();
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    // Check admin mode from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    const adminAuth = localStorage.getItem('admin_authenticated');

    if (adminParam === 'true' && adminAuth === 'true') {
      setIsAdminMode(true);
    } else {
      setIsAdminMode(false);
    }

    // Listen for URL changes
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const adminParam = urlParams.get('admin');
      const adminAuth = localStorage.getItem('admin_authenticated');
      setIsAdminMode(adminParam === 'true' && adminAuth === 'true');
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'resume', href: '/resume' },
    { key: 'portfolio', href: '/portfolio' },
    { key: 'academic', href: '/academic' },
    { key: 'documents', href: '/documents' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-academic-brown hover:text-academic-brown-dark transition-colors">
            Academic and Creative Atlas
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-academic-brown border-b-2 border-academic-brown'
                      : 'text-gray-700 hover:text-academic-brown'
                  }`}
                >
                  {getTranslation(lang, `nav.${item.key}`)}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle currentLang={lang} onLanguageChange={onLanguageChange} />
            {isAdminMode && (
              <Link
                href="/admin/dashboard"
                className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 transition-colors text-sm font-medium border-2 border-amber-700"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-academic-brown bg-academic-brown/10'
                      : 'text-gray-700 hover:text-academic-brown'
                  }`}
                >
                  {getTranslation(lang, `nav.${item.key}`)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}