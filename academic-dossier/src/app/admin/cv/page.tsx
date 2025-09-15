'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';

interface CVData {
  [key: string]: any;
}

function CVEditor() {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCVData();
  }, []);

  const loadCVData = async () => {
    try {
      const response = await fetch('/api/admin/cv');
      const data = await response.json();
      setCvData(data.cvData);
    } catch (error) {
      console.error('Error loading CV data:', error);
      setMessage('Error loading CV data');
    } finally {
      setLoading(false);
    }
  };

  const saveCVData = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cvData }),
      });

      if (response.ok) {
        setMessage('CV data saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving CV data');
      }
    } catch (error) {
      console.error('Error saving CV data:', error);
      setMessage('Error saving CV data');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path: string, value: any) => {
    if (!cvData) return;

    const newCvData = { ...cvData };
    const keys = path.split('.');
    let current = newCvData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setCvData(newCvData);
  };

  const addArrayItem = (path: string, newItem: any) => {
    if (!cvData) return;

    const newCvData = { ...cvData };
    const keys = path.split('.');
    let current = newCvData;

    for (const key of keys) {
      if (!current[key]) current[key] = [];
      current = current[key];
    }

    if (Array.isArray(current)) {
      current.push(newItem);
      setCvData(newCvData);
    }
  };

  const removeArrayItem = (path: string, index: number) => {
    if (!cvData) return;

    const newCvData = { ...cvData };
    const keys = path.split('.');
    let current = newCvData;

    for (const key of keys) {
      current = current[key];
    }

    if (Array.isArray(current)) {
      current.splice(index, 1);
      setCvData(newCvData);
    }
  };

  const renderField = (value: any, path: string) => {
    if (Array.isArray(value)) {
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
            {path.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          {value.map((item, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Item {index + 1}</span>
                <button
                  onClick={() => removeArrayItem(path, index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
              {typeof item === 'object' ? (
                Object.entries(item).map(([key, val]) => (
                  <div key={key} className="mb-2">
                    <label className="block text-xs text-gray-600 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {key === 'description' || key === 'details' ? (
                      <textarea
                        value={val as string || ''}
                        onChange={(e) => updateField(`${path}.${index}.${key}`, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
                        rows={3}
                      />
                    ) : (
                      <input
                        type="text"
                        value={val as string || ''}
                        onChange={(e) => updateField(`${path}.${index}.${key}`, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
                      />
                    )}
                  </div>
                ))
              ) : (
                <input
                  type="text"
                  value={item || ''}
                  onChange={(e) => updateField(`${path}.${index}`, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              )}
            </div>
          ))}
          <button
            onClick={() => {
              const sampleItem = value.length > 0 ?
                (typeof value[0] === 'object' ?
                  Object.keys(value[0]).reduce((acc, key) => ({ ...acc, [key]: '' }), {}) :
                  '') :
                '';
              addArrayItem(path, sampleItem);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
          >
            Add Item
          </button>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
            {path.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <div className="pl-4 border-l-2 border-gray-200">
            {Object.entries(value).map(([key, val]) =>
              renderField(val, `${path}.${key}`)
            )}
          </div>
        </div>
      );
    }

    const fieldName = path.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim();
    const isTextArea = fieldName?.toLowerCase().includes('description') ||
                      fieldName?.toLowerCase().includes('summary') ||
                      fieldName?.toLowerCase().includes('details');

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
          {fieldName}
        </label>
        {isTextArea ? (
          <textarea
            value={value || ''}
            onChange={(e) => updateField(path, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 resize-y min-h-[80px]"
            rows={4}
          />
        ) : (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => updateField(path, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading CV data...</div>
      </div>
    );
  }

  if (!cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading CV data</div>
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
              <h1 className="text-xl font-bold text-gray-900">Edit CV Data</h1>
            </div>
            <button
              onClick={saveCVData}
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

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {Object.entries(cvData).map(([key, value]) =>
            renderField(value, key)
          )}
        </div>
      </main>
    </div>
  );
}

export default function CVPage() {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Access denied. Please log in.</div>
      </div>
    );
  }

  return <CVEditor />;
}