'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';

export default function AdminBar() {
  const {
    isAuthenticated,
    isAdminMode,
    isEditing,
    hasUnsavedChanges,
    login,
    logout,
    toggleAdminMode,
    saveChanges,
    cancelChanges
  } = useAdmin();

  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setShowLogin(false);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid password');
    }
  };

  const handleSave = async () => {
    try {
      await saveChanges();
      // Show success notification
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  if (!isAuthenticated && !showLogin) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowLogin(true)}
          className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm hover:bg-amber-900 transition-colors shadow-lg"
        >
          Admin
        </button>
      </div>
    );
  }

  if (!isAuthenticated && showLogin) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[250px]">
        <form onSubmit={handleLogin} className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">Admin Login</h3>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            autoFocus
          />
          {loginError && (
            <p className="text-red-600 text-xs">{loginError}</p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-amber-800 text-white px-3 py-1 rounded text-xs hover:bg-amber-900 transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setShowLogin(false);
                setPassword('');
                setLoginError('');
              }}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (!isAdminMode) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleAdminMode}
          className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm hover:bg-amber-900 transition-colors shadow-lg"
        >
          Enable Admin Mode
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-amber-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="text-sm font-medium">Admin Mode</span>
            </div>

            {hasUnsavedChanges && (
              <div className="flex items-center gap-1 text-yellow-200">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Unsaved changes</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isEditing && (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </button>
                <button
                  onClick={cancelChanges}
                  className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </>
            )}

            <button
              onClick={toggleAdminMode}
              className="bg-amber-700 text-white px-3 py-1 rounded text-xs hover:bg-amber-600 transition-colors"
            >
              Exit Admin
            </button>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}