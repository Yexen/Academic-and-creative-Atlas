'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';

interface Translation {
  [key: string]: any;
}

interface Translations {
  en: Translation;
  fr: Translation;
  fa: Translation;
}

function TranslationEditor() {
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'fr' | 'fa'>('en');

  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      const response = await fetch('/api/admin/translations');
      const data = await response.json();
      setTranslations(data.translations);
    } catch (error) {
      console.error('Error loading translations:', error);
      setMessage('Error loading translations');
    } finally {
      setLoading(false);
    }
  };

  const saveTranslations = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/translations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ translations }),
      });

      if (response.ok) {
        setMessage('Translations saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving translations');
      }
    } catch (error) {
      console.error('Error saving translations:', error);
      setMessage('Error saving translations');
    } finally {
      setSaving(false);
    }
  };

  const updateTranslation = (lang: keyof Translations, path: string, value: string) => {
    if (!translations) return;

    const newTranslations = { ...translations };
    const keys = path.split('.');
    let current = newTranslations[lang];

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setTranslations(newTranslations);
  };

  const renderFields = (obj: any, lang: keyof Translations, prefix = '') => {
    return Object.entries(obj).map(([key, value]) => {
      const fullPath = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={fullPath} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="pl-4 border-l-2 border-gray-200">
              {renderFields(value, lang, fullPath)}
            </div>
          </div>
        );
      }

      return (
        <div key={fullPath} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {fullPath.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <textarea
            value={value || ''}
            onChange={(e) => updateTranslation(lang, fullPath, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 resize-y min-h-[60px]"
            dir={lang === 'fa' ? 'rtl' : 'ltr'}
          />
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading translations...</div>
      </div>
    );
  }

  if (!translations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading translations</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <a href="/admin" className="text-academic-brown hover:text-academic-brown-dark">
                ← Back to Admin
              </a>
              <h1 className="text-xl font-bold text-gray-900">Edit Translations</h1>
            </div>
            <button
              onClick={saveTranslations}
              disabled={saving}
              className="bg-amber-700 text-white px-6 py-2 rounded-md hover:bg-amber-800 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className={`p-4 text-center ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Language Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {Object.keys(translations).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang as 'en' | 'fr' | 'fa')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === lang
                    ? 'border-amber-700 text-amber-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'فارسی'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderFields(translations[activeTab], activeTab)}
        </div>
      </main>
    </div>
  );
}

export default function TranslationsPage() {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Access denied. Please log in.</div>
      </div>
    );
  }

  return <TranslationEditor />;
}