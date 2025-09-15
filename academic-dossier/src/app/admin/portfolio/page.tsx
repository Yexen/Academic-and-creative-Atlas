'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';

interface PortfolioProject {
  title: string;
  subtitle: string;
  period: string;
  type: string;
  image: string;
  description: string;
  features: string[];
  significance: string;
  technologies: string[];
  links: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

interface PortfolioData {
  [key: string]: PortfolioProject;
}

function PortfolioEditor() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeProject, setActiveProject] = useState<string>('');

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const response = await fetch('/api/admin/portfolio');
      const data = await response.json();
      setPortfolioData(data.portfolioData);
      if (data.portfolioData) {
        setActiveProject(Object.keys(data.portfolioData)[0]);
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      setMessage('Error loading portfolio data');
    } finally {
      setLoading(false);
    }
  };

  const savePortfolioData = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ portfolioData }),
      });

      if (response.ok) {
        setMessage('Portfolio data saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving portfolio data');
      }
    } catch (error) {
      console.error('Error saving portfolio data:', error);
      setMessage('Error saving portfolio data');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (projectKey: string, field: string, value: any) => {
    if (!portfolioData) return;

    const newPortfolioData = { ...portfolioData };
    newPortfolioData[projectKey] = { ...newPortfolioData[projectKey], [field]: value };
    setPortfolioData(newPortfolioData);
  };

  const updateArrayField = (projectKey: string, field: string, index: number, value: string) => {
    if (!portfolioData) return;

    const newPortfolioData = { ...portfolioData };
    const newArray = [...newPortfolioData[projectKey][field as keyof PortfolioProject] as string[]];
    newArray[index] = value;
    newPortfolioData[projectKey] = { ...newPortfolioData[projectKey], [field]: newArray };
    setPortfolioData(newPortfolioData);
  };

  const addArrayItem = (projectKey: string, field: string) => {
    if (!portfolioData) return;

    const newPortfolioData = { ...portfolioData };
    const currentArray = newPortfolioData[projectKey][field as keyof PortfolioProject] as any[];

    if (field === 'links') {
      newPortfolioData[projectKey] = {
        ...newPortfolioData[projectKey],
        [field]: [...currentArray, { name: '', url: '', type: '' }]
      };
    } else {
      newPortfolioData[projectKey] = {
        ...newPortfolioData[projectKey],
        [field]: [...currentArray, '']
      };
    }
    setPortfolioData(newPortfolioData);
  };

  const removeArrayItem = (projectKey: string, field: string, index: number) => {
    if (!portfolioData) return;

    const newPortfolioData = { ...portfolioData };
    const currentArray = [...newPortfolioData[projectKey][field as keyof PortfolioProject] as any[]];
    currentArray.splice(index, 1);
    newPortfolioData[projectKey] = { ...newPortfolioData[projectKey], [field]: currentArray };
    setPortfolioData(newPortfolioData);
  };

  const updateLinkField = (projectKey: string, linkIndex: number, linkField: string, value: string) => {
    if (!portfolioData) return;

    const newPortfolioData = { ...portfolioData };
    const newLinks = [...newPortfolioData[projectKey].links];
    newLinks[linkIndex] = { ...newLinks[linkIndex], [linkField]: value };
    newPortfolioData[projectKey] = { ...newPortfolioData[projectKey], links: newLinks };
    setPortfolioData(newPortfolioData);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading portfolio data...</div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading portfolio data</div>
      </div>
    );
  }

  const currentProject = portfolioData[activeProject];

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
              <h1 className="text-xl font-bold text-gray-900">Edit Portfolio</h1>
            </div>
            <button
              onClick={savePortfolioData}
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

      {/* Project Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {Object.keys(portfolioData).map((projectKey) => (
              <button
                key={projectKey}
                onClick={() => setActiveProject(projectKey)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeProject === projectKey
                    ? 'border-amber-700 text-amber-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {portfolioData[projectKey].title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {currentProject && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={currentProject.title}
                    onChange={(e) => updateField(activeProject, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={currentProject.subtitle}
                    onChange={(e) => updateField(activeProject, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                  <input
                    type="text"
                    value={currentProject.period}
                    onChange={(e) => updateField(activeProject, 'period', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <input
                    type="text"
                    value={currentProject.type}
                    onChange={(e) => updateField(activeProject, 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image Path</label>
                <input
                  type="text"
                  value={currentProject.image}
                  onChange={(e) => updateField(activeProject, 'image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={currentProject.description}
                  onChange={(e) => updateField(activeProject, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 resize-y min-h-[100px]"
                  rows={5}
                />
              </div>

              {/* Features */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Features</label>
                  <button
                    onClick={() => addArrayItem(activeProject, 'features')}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
                  >
                    Add Feature
                  </button>
                </div>
                {currentProject.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <textarea
                      value={feature}
                      onChange={(e) => updateArrayField(activeProject, 'features', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 resize-y min-h-[60px]"
                      rows={2}
                    />
                    <button
                      onClick={() => removeArrayItem(activeProject, 'features', index)}
                      className="text-red-600 hover:text-red-800 px-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Significance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Significance</label>
                <textarea
                  value={currentProject.significance}
                  onChange={(e) => updateField(activeProject, 'significance', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 resize-y min-h-[100px]"
                  rows={5}
                />
              </div>

              {/* Technologies */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Technologies</label>
                  <button
                    onClick={() => addArrayItem(activeProject, 'technologies')}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
                  >
                    Add Technology
                  </button>
                </div>
                {currentProject.technologies.map((tech, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => updateArrayField(activeProject, 'technologies', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                    <button
                      onClick={() => removeArrayItem(activeProject, 'technologies', index)}
                      className="text-red-600 hover:text-red-800 px-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Links</label>
                  <button
                    onClick={() => addArrayItem(activeProject, 'links')}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
                  >
                    Add Link
                  </button>
                </div>
                {currentProject.links.map((link, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">Link {index + 1}</span>
                      <button
                        onClick={() => removeArrayItem(activeProject, 'links', index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Name"
                        value={link.name}
                        onChange={(e) => updateLinkField(activeProject, index, 'name', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => updateLinkField(activeProject, index, 'url', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Type"
                        value={link.type}
                        onChange={(e) => updateLinkField(activeProject, index, 'type', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function PortfolioPage() {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Access denied. Please log in.</div>
      </div>
    );
  }

  return <PortfolioEditor />;
}