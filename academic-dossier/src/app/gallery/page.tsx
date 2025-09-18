'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import QAAssistant from '@/components/QAAssistant';
import AIAssistant from '@/components/AIAssistant';
import { useAdmin } from '@/contexts/AdminContext';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle admin context safely
  let isAdminMode = false;
  try {
    const adminContext = useAdmin();
    isAdminMode = adminContext.isAdminMode;
  } catch (error) {
    isAdminMode = false;
  }

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory, activeTab]);

  const fetchGallery = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (activeTab !== 'all') params.append('type', activeTab);

      const response = await fetch(`/api/gallery?${params}`);
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

  const categories = [...new Set(gallery.map(item => item.category))];

  const filteredGallery = gallery.filter(item => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    return true;
  });

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-academic-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-academic-brown font-medium">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
              <p className="text-gray-700 mt-1">Visual documentation of creative and academic work</p>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-academic-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search gallery..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-academic-brown bg-white/90"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Main Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              {
                key: 'all',
                label: 'All',
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                )
              },
              {
                key: 'image',
                label: 'Images',
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                )
              },
              {
                key: 'video',
                label: 'Videos',
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                )
              },
              {
                key: 'audio',
                label: 'Audios',
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553Z" />
                  </svg>
                )
              }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-900 hover:text-white border border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="mt-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-academic-brown bg-white/90"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredGallery.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p className="text-gray-600 text-lg">No gallery items found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <div className="relative aspect-video overflow-hidden">
                  {item.type === 'image' ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : item.type === 'video' ? (
                    <div className="relative">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-full flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-16 h-16 text-purple-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                        <p className="text-purple-700 text-sm font-medium">Audio File</p>
                      </div>
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.type === 'image'
                        ? 'bg-blue-100 text-blue-800'
                        : item.type === 'video'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-academic-brown rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-academic-brown group-hover:text-academic-brown transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-academic-brown-dark rounded">
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-academic-brown-dark rounded">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mt-2">
                    {formatDate(item.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="max-w-6xl max-h-full w-full bg-white rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{selectedItem.title}</h2>
              <button
                onClick={closeLightbox}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Media */}
              <div className="flex-1 bg-gray-100 flex items-center justify-center min-h-96">
                {selectedItem.type === 'image' ? (
                  <Image
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.url}
                    controls
                    className="max-w-full max-h-full"
                    style={{ maxHeight: '70vh' }}
                  >
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <div className="w-full max-w-md p-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="text-center mb-4">
                        <svg className="w-20 h-20 text-purple-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedItem.title}</h3>
                      </div>
                      <audio
                        src={selectedItem.url}
                        controls
                        className="w-full"
                      >
                        Your browser does not support audio playback.
                      </audio>
                    </div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="lg:w-80 p-6 bg-gray-50">
                {selectedItem.description && (
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 text-sm">{selectedItem.description}</p>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="text-gray-900 capitalize">{selectedItem.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="text-gray-900 capitalize">{selectedItem.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="text-gray-900">{formatDate(selectedItem.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {selectedItem.tags.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedItem.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-academic-brown rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QA Assistant */}
      <QAAssistant context="gallery" />

      {/* AI Assistant (admin only) */}
      {isAdminMode && (
        <AIAssistant
          context="gallery"
          onContentGenerated={(content) => {
            // Handle AI-generated content for gallery
            console.log('AI generated content for gallery:', content);
          }}
        />
      )}
    </div>
  );
}