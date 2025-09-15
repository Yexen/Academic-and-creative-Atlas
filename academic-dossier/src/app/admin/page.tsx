'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-academic-brown">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-academic-brown"
              required
            />
          </div>
          {error && (
            <div className="mb-4 text-red-600 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Hint: The password is "yekta2025"</p>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { logout } = useAdmin();

  return (
    <div className="min-h-screen">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-academic-brown">
              Academic Atlas - Admin Panel
            </h1>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Translations Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Translations
            </h2>
            <p className="text-gray-600 mb-4">
              Update content in English, French, and Persian
            </p>
            <a
              href="/admin/translations"
              className="inline-block bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors"
            >
              Edit Content
            </a>
          </div>

          {/* CV Data Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Resume/CV
            </h2>
            <p className="text-gray-600 mb-4">
              Update education, experience, and skills
            </p>
            <a
              href="/admin/cv"
              className="inline-block bg-orange-700 text-white px-4 py-2 rounded-md hover:bg-orange-800 transition-colors"
            >
              Edit CV
            </a>
          </div>

          {/* Portfolio Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Portfolio
            </h2>
            <p className="text-gray-600 mb-4">
              Manage portfolio projects and descriptions
            </p>
            <a
              href="/admin/portfolio"
              className="inline-block bg-stone-700 text-white px-4 py-2 rounded-md hover:bg-stone-800 transition-colors"
            >
              Edit Portfolio
            </a>
          </div>

          {/* Site Settings Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Site Settings
            </h2>
            <p className="text-gray-600 mb-4">
              Update site title, contact info, and metadata
            </p>
            <a
              href="/admin/settings"
              className="inline-block bg-yellow-700 text-white px-4 py-2 rounded-md hover:bg-yellow-800 transition-colors"
            >
              Edit Settings
            </a>
          </div>

          {/* Preview Site Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Preview Site
            </h2>
            <p className="text-gray-600 mb-4">
              View your site as visitors see it
            </p>
            <a
              href="/"
              target="_blank"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Open Site
            </a>
          </div>

          {/* Help Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Help & Tips
            </h2>
            <p className="text-gray-600 mb-4">
              Quick guide on using the admin panel
            </p>
            <div className="text-sm text-gray-600">
              <ul className="list-disc list-inside space-y-1">
                <li>Changes save automatically</li>
                <li>Use the preview to check changes</li>
                <li>Translations support HTML</li>
                <li>Remember to deploy after major changes</li>
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const { isAuthenticated } = useAdmin();

  return isAuthenticated ? <AdminDashboard /> : <LoginForm />;
}