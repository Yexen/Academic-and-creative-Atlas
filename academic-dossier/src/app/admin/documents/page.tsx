'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Document {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  wordCount: number;
}

interface DocumentsData {
  documents: Document[];
  categories: string[];
}

export default function DocumentsManager() {
  const [documentsData, setDocumentsData] = useState<DocumentsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formTags, setFormTags] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/documents');
      if (response.ok) {
        const data = await response.json();
        // API returns array directly, wrap it in expected structure
        setDocumentsData({
          documents: Array.isArray(data) ? data : [],
          categories: ['Research', 'Creative Writing', 'Academic Notes', 'Ideas', 'References']
        });
      } else {
        // Initialize empty structure if not found
        setDocumentsData({
          documents: [],
          categories: ['Research', 'Creative Writing', 'Academic Notes', 'Ideas', 'References']
        });
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      setDocumentsData({
        documents: [],
        categories: ['Research', 'Creative Writing', 'Academic Notes', 'Ideas', 'References']
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveDocuments = async () => {
    if (!documentsData) return;

    try {
      setIsSaving(true);
      const response = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentsData),
      });

      if (response.ok) {
        setSaveMessage('✅ Documents saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('❌ Failed to save documents');
      }
    } catch (error) {
      console.error('Failed to save documents:', error);
      setSaveMessage('❌ Error saving documents');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateDocument = () => {
    setEditingDocument(null);
    setFormTitle('');
    setFormContent('');
    setFormCategory('');
    setFormTags('');
    setShowEditor(true);
  };

  const handleEditDocument = (doc: Document) => {
    setEditingDocument(doc);
    setFormTitle(doc.title);
    setFormContent(doc.content);
    setFormCategory(doc.category);
    setFormTags(doc.tags.join(', '));
    setShowEditor(true);
  };

  const handleSaveDocument = () => {
    if (!documentsData || !formTitle.trim() || !formContent.trim()) return;

    const now = new Date().toISOString();
    const wordCount = formContent.trim().split(/\s+/).length;
    const tags = formTags.split(',').map(tag => tag.trim()).filter(tag => tag);

    if (editingDocument) {
      // Update existing document
      const updatedDocuments = documentsData.documents.map(doc =>
        doc.id === editingDocument.id
          ? {
              ...doc,
              title: formTitle,
              content: formContent,
              category: formCategory || 'Uncategorized',
              tags,
              updatedAt: now,
              wordCount
            }
          : doc
      );
      setDocumentsData({
        ...documentsData,
        documents: updatedDocuments
      });
    } else {
      // Create new document
      const newDocument: Document = {
        id: Date.now().toString(),
        title: formTitle,
        content: formContent,
        category: formCategory || 'Uncategorized',
        tags,
        createdAt: now,
        updatedAt: now,
        wordCount
      };

      setDocumentsData({
        ...documentsData,
        documents: [newDocument, ...documentsData.documents],
        categories: formCategory && !documentsData.categories.includes(formCategory)
          ? [...documentsData.categories, formCategory]
          : documentsData.categories
      });
    }

    setShowEditor(false);
    setEditingDocument(null);
  };

  const handleDeleteDocument = (docId: string) => {
    if (!documentsData || !confirm('Are you sure you want to delete this document?')) return;

    const updatedDocuments = documentsData.documents.filter(doc => doc.id !== docId);
    setDocumentsData({
      ...documentsData,
      documents: updatedDocuments
    });
  };

  const filteredDocuments = documentsData?.documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/admin" className="text-blue-600 hover:text-blue-700 mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">AI Knowledge Documents</h1>
            </div>
            <div className="flex items-center space-x-3">
              {saveMessage && (
                <span className="text-sm font-medium">{saveMessage}</span>
              )}
              <button
                onClick={handleCreateDocument}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                + New Document
              </button>
              <button
                onClick={saveDocuments}
                disabled={isSaving}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save All'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Documents</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, content, or tags..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Categories</option>
                {documentsData?.categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Document Editor Modal */}
        {showEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingDocument ? 'Edit Document' : 'Create New Document'}
                  </h2>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Document title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      placeholder="e.g., Research, Ideas, References..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="philosophy, ai, research, etc..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Drop your text here... This content will be available to your AI assistant."
                    rows={15}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Word count: {formContent.trim().split(/\s+/).length}
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowEditor(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDocument}
                    disabled={!formTitle.trim() || !formContent.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {editingDocument ? 'Update' : 'Create'} Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{doc.title}</h3>
                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={() => handleEditDocument(doc)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Edit document"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete document"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {doc.category}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {doc.content.substring(0, 120)}...
              </p>

              {doc.tags.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {doc.tags.length > 3 && (
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        +{doc.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-500 border-t pt-3">
                <div className="flex justify-between">
                  <span>{doc.wordCount} words</span>
                  <span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first document.'
              }
            </p>
            {(!searchTerm && selectedCategory === 'all') && (
              <div className="mt-6">
                <button
                  onClick={handleCreateDocument}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  + Create your first document
                </button>
              </div>
            )}
          </div>
        )}

        {/* Info Panel */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <div className="flex items-start">
            <svg className="h-6 w-6 text-blue-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">AI Knowledge Integration</h3>
              <p className="text-blue-800 mb-3">
                Documents stored here become part of your AI assistant's knowledge base. Your AI can reference, quote, and discuss the content of these documents when answering questions.
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Organize:</strong> Use categories and tags to structure your knowledge</li>
                <li>• <strong>Search:</strong> Find documents quickly by title, content, or tags</li>
                <li>• <strong>Access:</strong> Your AI can access all saved documents during conversations</li>
                <li>• <strong>Update:</strong> Edit documents anytime - changes are immediately available to your AI</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}