'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language, getTranslation } from '@/lib/i18n';
import LanguageToggle from './LanguageToggle';

interface NavigationProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Navigation({ lang, onLanguageChange }: NavigationProps) {
  const pathname = usePathname();

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

          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="flex items-center space-x-2 text-gray-600 hover:text-academic-brown transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50"
              title="Admin Console"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="hidden sm:inline">Admin</span>
            </Link>
            <LanguageToggle currentLang={lang} onLanguageChange={onLanguageChange} />
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
            <Link
              href="/admin"
              className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-academic-brown transition-colors border-t border-gray-200 mt-2 pt-4"
            >
              Admin Console
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}