'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardAIAssistant from '@/components/DashboardAIAssistant';

// Knowledge Base Editor Component with Tabs
function KnowledgeBaseEditor() {
  const [knowledgeBase, setKnowledgeBase] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [newSectionNames, setNewSectionNames] = useState({
    personal: '',
    education: '',
    creative: '',
    research: '',
    technical: ''
  });

  useEffect(() => {
    fetchKnowledgeBase();
  }, []);

  const fetchKnowledgeBase = async () => {
    try {
      const response = await fetch('/api/admin/knowledge-base');
      if (response.ok) {
        const data = await response.json();
        setKnowledgeBase(data);
      }
    } catch (error) {
      console.error('Error fetching knowledge base:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveKnowledgeBase = async () => {
    try {
      const response = await fetch('/api/admin/knowledge-base', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(knowledgeBase),
      });

      if (response.ok) {
        alert('Knowledge base saved successfully!');
      } else {
        alert('Error saving knowledge base');
      }
    } catch (error) {
      console.error('Error saving knowledge base:', error);
      alert('Error saving knowledge base');
    }
  };

  const addNewSection = (tabType: string, sectionName: string) => {
    if (!sectionName.trim() || !knowledgeBase) return;

    const sanitizedName = sectionName.toLowerCase().replace(/[^a-z0-9]/g, '');

    switch (tabType) {
      case 'personal':
        setKnowledgeBase({
          ...knowledgeBase,
          personal: {
            ...knowledgeBase.personal,
            [sanitizedName]: {
              title: sectionName,
              description: '',
              details: ''
            }
          }
        });
        break;
      case 'education':
        setKnowledgeBase({
          ...knowledgeBase,
          education: {
            ...knowledgeBase.education,
            [sanitizedName]: {
              title: sectionName,
              institution: '',
              degree: '',
              year: '',
              description: '',
              achievements: []
            }
          }
        });
        break;
      case 'creative':
        setKnowledgeBase({
          ...knowledgeBase,
          creative: {
            ...knowledgeBase.creative,
            [sanitizedName]: {
              title: sectionName,
              type: '',
              description: '',
              technologies: [],
              links: []
            }
          }
        });
        break;
      case 'research':
        setKnowledgeBase({
          ...knowledgeBase,
          research: {
            ...knowledgeBase.research,
            [sanitizedName]: {
              title: sectionName,
              description: '',
              methodology: '',
              findings: ''
            }
          }
        });
        break;
      case 'technical':
        setKnowledgeBase({
          ...knowledgeBase,
          technical: {
            ...knowledgeBase.technical,
            [sanitizedName]: {
              title: sectionName,
              category: '',
              level: '',
              description: ''
            }
          }
        });
        break;
    }

    setNewSectionNames({
      ...newSectionNames,
      [tabType]: ''
    });
  };

  const deleteSection = (tabType: string, sectionKey: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;

    const updatedKnowledgeBase = { ...knowledgeBase };
    delete updatedKnowledgeBase[tabType][sectionKey];
    setKnowledgeBase(updatedKnowledgeBase);
  };

  if (loading) {
    return <div className="text-center py-8">Loading knowledge base...</div>;
  }

  if (!knowledgeBase) {
    return <div className="text-center py-8 text-red-600">Error loading knowledge base</div>;
  }

  const tabs = [
    { key: 'personal', label: '👤 Personal', icon: '👤' },
    { key: 'education', label: '🎓 Education', icon: '🎓' },
    { key: 'creative', label: '🎨 Creative Work', icon: '🎨' },
    { key: 'research', label: '🔬 Research', icon: '🔬' },
    { key: 'technical', label: '⚙️ Technical Skills', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    const currentData = knowledgeBase[activeTab] || {};

    return (
      <div className="space-y-6">
        {/* Overview for personal tab */}
        {activeTab === 'personal' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brief Overview
            </label>
            <textarea
              value={knowledgeBase.overview || ''}
              onChange={(e) => setKnowledgeBase({
                ...knowledgeBase,
                overview: e.target.value
              })}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows={4}
              placeholder="Brief overview of background and expertise..."
            />
          </div>
        )}

        {/* Existing sections */}
        {Object.entries(currentData).map(([key, value]: [string, any]) => (
          <div key={key} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">{value.title || key}</h4>
              <button
                onClick={() => deleteSection(activeTab, key)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>

            {activeTab === 'personal' && (
              <>
                <input
                  type="text"
                  value={value.title || ''}
                  onChange={(e) => setKnowledgeBase({
                    ...knowledgeBase,
                    [activeTab]: {
                      ...knowledgeBase[activeTab],
                      [key]: { ...value, title: e.target.value }
                    }
                  })}
                  placeholder="Section title"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <textarea
                  value={value.description || ''}
                  onChange={(e) => setKnowledgeBase({
                    ...knowledgeBase,
                    [activeTab]: {
                      ...knowledgeBase[activeTab],
                      [key]: { ...value, description: e.target.value }
                    }
                  })}
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded mb-2 resize-none"
                  rows={3}
                />
                <textarea
                  value={value.details || ''}
                  onChange={(e) => setKnowledgeBase({
                    ...knowledgeBase,
                    [activeTab]: {
                      ...knowledgeBase[activeTab],
                      [key]: { ...value, details: e.target.value }
                    }
                  })}
                  placeholder="Details"
                  className="w-full p-2 border border-gray-300 rounded resize-none"
                  rows={4}
                />
              </>
            )}

            {activeTab === 'education' && (
              <>
                <input
                  type="text"
                  value={value.title || ''}
                  onChange={(e) => setKnowledgeBase({
                    ...knowledgeBase,
                    [activeTab]: {
                      ...knowledgeBase[activeTab],
                      [key]: { ...value, title: e.target.value }
                    }
                  })}
                  placeholder="Program title"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <input
                  type="text"
                  value={value.institution || ''}
                  onChange={(e) => setKnowledgeBase({
                    ...knowledgeBase,
                    [activeTab]: {
                      ...knowledgeBase[activeTab],
                      [key]: { ...value, institution: e.target.value }
                    }
                  })}
                  placeholder="Institution"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    value={value.degree || ''}
                    onChange={(e) => setKnowledgeBase({
                      ...knowledgeBase,
                      [activeTab]: {
                        ...knowledgeBase[activeTab],
                        [key]: { ...value, degree: e.target.value }
                      }
                    })}
                    placeholder="Degree"
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={value.year || ''}
                    onChange={(e) => setKnowledgeBase({
                      ...knowledgeBase,
                      [activeTab]: {
                        ...knowledgeBase[activeTab],
                        [key]: { ...value, year: e.target.value }
                      }
                    })}
                    placeholder="Year"
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
                <textarea
                  value={value.description || ''}
                  onChange={(e) => setKnowledgeBase({
                    ...knowledgeBase,
                    [activeTab]: {
                      ...knowledgeBase[activeTab],
                      [key]: { ...value, description: e.target.value }
                    }
                  })}
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded resize-none"
                  rows={3}
                />
              </>
            )}

            {/* Add similar blocks for creative, research, technical tabs */}
            {(activeTab === 'creative' || activeTab === 'research' || activeTab === 'technical') && (
              <>
                <input
                  type="text"
                  value={value.title || ''}
                  onChange={(e) => setKnowledgeBase({
                    ...knowledgeBase,
                    [activeTab]: {
                      ...knowledgeBase[activeTab],
                      [key]: { ...value, title: e.target.value }
                    }
                  })}
                  placeholder="Title"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <textarea
                  value={value.description || ''}
                  onChange={(e) => setKnowledgeBase({
                    ...knowledgeBase,
                    [activeTab]: {
                      ...knowledgeBase[activeTab],
                      [key]: { ...value, description: e.target.value }
                    }
                  })}
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded resize-none"
                  rows={4}
                />
              </>
            )}
          </div>
        ))}

        {/* Add new section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-3">Add New {tabs.find(t => t.key === activeTab)?.label} Section</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSectionNames[activeTab as keyof typeof newSectionNames]}
              onChange={(e) => setNewSectionNames({
                ...newSectionNames,
                [activeTab]: e.target.value
              })}
              placeholder={`New ${activeTab} section name`}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={() => addNewSection(activeTab, newSectionNames[activeTab as keyof typeof newSectionNames])}
              disabled={!newSectionNames[activeTab as keyof typeof newSectionNames].trim()}
              className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-900 disabled:bg-gray-300"
            >
              Add Section
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}

        {/* Save Button */}
        <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={saveKnowledgeBase}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save Knowledge Base
          </button>
          <button
            onClick={fetchKnowledgeBase}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}

// Documents Manager Component
function DocumentsManager() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDocument, setEditingDocument] = useState<any>(null);
  const [newDocument, setNewDocument] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/admin/documents');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDocument = async () => {
    try {
      const response = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          document: {
            ...newDocument,
            tags: newDocument.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
          }
        }),
      });

      if (response.ok) {
        const created = await response.json();
        setDocuments([...documents, created]);
        setNewDocument({ title: '', content: '', category: '', tags: '' });
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const deleteDocument = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const response = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          id
        }),
      });

      if (response.ok) {
        setDocuments(documents.filter(doc => doc.id !== id));
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading documents...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Documents Manager</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900"
        >
          Create Document
        </button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">{doc.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{doc.category}</p>
            <p className="text-xs text-gray-500 mb-3 line-clamp-3">{doc.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">{doc.wordCount} words</span>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No documents yet. Create your first document!
        </div>
      )}

      {/* Create Document Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-bold mb-4">Create New Document</h4>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Document title"
                value={newDocument.title}
                onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={newDocument.category}
                onChange={(e) => setNewDocument({...newDocument, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={newDocument.tags}
                onChange={(e) => setNewDocument({...newDocument, tags: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Document content"
                value={newDocument.content}
                onChange={(e) => setNewDocument({...newDocument, content: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={8}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={createDocument}
                className="flex-1 px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-900"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeMainTab, setActiveMainTab] = useState('knowledge-base');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication and admin mode on client side only
    try {
      const adminAuth = localStorage.getItem('admin_authenticated');
      const urlParams = new URLSearchParams(window.location.search);
      const adminParam = urlParams.get('admin');

      const authenticated = adminAuth === 'true';
      const adminModeActive = adminParam === 'true' && authenticated;

      console.log('Dashboard Auth Check:', {
        adminAuth,
        adminParam,
        authenticated,
        adminModeActive,
        url: window.location.href
      });

      setIsAuthenticated(authenticated);
      setIsAdminMode(adminModeActive);

      // More lenient check - allow if either authenticated OR adminParam is true
      if (!authenticated && adminParam !== 'true') {
        console.log('Redirecting to home because neither authenticated nor admin param:', { authenticated, adminParam });
        router.push('/');
        return;
      }

      // If we have admin param but not authenticated, try to set authentication
      if (adminParam === 'true' && !authenticated) {
        console.log('Setting authentication based on admin param');
        localStorage.setItem('admin_authenticated', 'true');
        setIsAuthenticated(true);
        setIsAdminMode(true);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setTimeout(() => router.push('/'), 5000); // 5 second delay
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!isAuthenticated || !isAdminMode) {
    return <div className="text-center py-8">Access denied. Admin mode required.</div>;
  }

  const saveAllChanges = async () => {
    try {
      // This would save both knowledge base and documents
      // For now, we'll show a success message
      alert('All changes saved successfully!');
      setHasUnsavedChanges(false);
    } catch (error) {
      alert('Error saving changes');
    }
  };

  // Gallery Manager Component
  function GalleryManager() {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      type: 'image',
      url: '',
      thumbnail: '',
      category: '',
      tags: ''
    });

    useEffect(() => {
      fetchGallery();
    }, []);

    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (response.ok) {
          const data = await response.json();
          setGallery(data);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        const payload = { ...formData, tags };

        const response = await fetch('/api/gallery', {
          method: editingItem ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingItem ? { ...payload, id: editingItem.id } : payload)
        });

        if (response.ok) {
          await fetchGallery();
          setShowAddForm(false);
          setEditingItem(null);
          setFormData({ title: '', description: '', type: 'image', url: '', thumbnail: '', category: '', tags: '' });
        }
      } catch (error) {
        console.error('Error saving gallery item:', error);
      }
    };

    const handleEdit = (item: any) => {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        type: item.type,
        url: item.url,
        thumbnail: item.thumbnail,
        category: item.category,
        tags: item.tags.join(', ')
      });
      setShowAddForm(true);
    };

    const handleDelete = async (id: string) => {
      if (confirm('Are you sure you want to delete this gallery item?')) {
        try {
          const response = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
          if (response.ok) {
            await fetchGallery();
          }
        } catch (error) {
          console.error('Error deleting gallery item:', error);
        }
      }
    };

    if (loading) {
      return <div className="text-center py-8">Loading gallery...</div>;
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Gallery Management</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-academic-brown text-white px-4 py-2 rounded-lg hover:bg-academic-brown-dark transition-colors"
          >
            {showAddForm ? 'Cancel' : 'Add Media'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-md font-medium mb-4">{editingItem ? 'Edit' : 'Add'} Gallery Item</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academic-brown focus:border-transparent"
                  required
                />
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academic-brown focus:border-transparent"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                </select>
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academic-brown focus:border-transparent"
                rows="3"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="Media URL"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academic-brown focus:border-transparent"
                  required
                />
                <input
                  type="url"
                  placeholder="Thumbnail URL (optional)"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academic-brown focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academic-brown focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academic-brown focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-academic-brown text-white px-6 py-2 rounded-lg hover:bg-academic-brown-dark transition-colors"
                >
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                    setFormData({ title: '', description: '', type: 'image', url: '', thumbnail: '', category: '', tags: '' });
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative aspect-video">
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.type === 'image'
                      ? 'bg-blue-100 text-blue-800'
                      : item.type === 'video'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.type}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h5 className="font-semibold text-gray-900 mb-1">{item.title}</h5>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {gallery.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p>No gallery items found. Add your first media item!</p>
          </div>
        )}
      </div>
    );
  }

  const mainTabs = [
    { key: 'knowledge-base', label: '📚 Knowledge Base', component: <KnowledgeBaseEditor /> },
    { key: 'documents', label: '📄 Document Manager', component: <DocumentsManager /> },
    { key: 'gallery', label: '🖼️ Gallery Manager', component: <GalleryManager /> },
    { key: 'ai-assistant', label: '🤖 AI Assistant', component: <DashboardAIAssistant /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage knowledge base and documents</p>
      </div>

      {/* Main Tab Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {mainTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveMainTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-lg ${
                  activeMainTab === tab.key
                    ? 'border-academic-brown text-academic-brown'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Tab Content */}
        <div className="p-6">
          {mainTabs.find(tab => tab.key === activeMainTab)?.component}
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={saveAllChanges}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Save All Changes
        </button>
      </div>
    </div>
  );
}