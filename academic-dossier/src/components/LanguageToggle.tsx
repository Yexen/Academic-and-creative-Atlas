'use client';

import { useState } from 'react';
import { Language, languages } from '@/lib/i18n';

interface LanguageToggleProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageToggle({ currentLang, onLanguageChange }: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-academic-brown hover:text-academic-brown-dark transition-colors"
      >
        <span className="font-medium">{languages[currentLang]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 py-1 min-w-[120px] z-50">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                onLanguageChange(code as Language);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                code === currentLang ? 'bg-academic-brown/10 text-academic-brown font-medium' : 'text-gray-700'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}