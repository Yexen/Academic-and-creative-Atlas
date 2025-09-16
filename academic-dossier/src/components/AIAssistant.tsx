'use client';

import { useState, useRef, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';

interface AIAssistantProps {
  context: string; // Current page context (resume, portfolio, etc.)
  onContentGenerated: (content: string) => void;
  placeholder?: string;
}

export default function AIAssistant({
  context,
  onContentGenerated,
  placeholder = "Ask AI to help generate or improve content..."
}: AIAssistantProps) {
  // Handle admin context safely for static generation
  let isAdminMode = false;
  try {
    const adminContext = useAdmin();
    isAdminMode = adminContext.isAdminMode;
  } catch (error) {
    isAdminMode = false;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState('');
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError('');
    setGeneratedContent('');

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          context,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error('AI generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseContent = () => {
    onContentGenerated(generatedContent);
    setIsOpen(false);
    setPrompt('');
    setGeneratedContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  if (!isAdminMode) {
    return null;
  }

  return (
    <>
      {/* AI Assistant Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-amber-800 text-white p-2.5 rounded-full shadow-lg hover:bg-amber-900 transition-colors z-50 group"
        title="AI Assistant"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-16.5 3.75H3M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Assistant
        </span>
      </button>

      {/* AI Assistant Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed bg-white rounded-lg shadow-2xl border border-gray-300 w-[600px] max-h-[80vh] overflow-hidden z-50"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isDragging ? 'grabbing' : 'auto'
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 border-b border-amber-200 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
          >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-16.5 3.75H3M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900">AI Assistant</h3>
                <span className="text-sm text-gray-500">• {context}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Prompt Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like me to help you with?
                </label>
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                  placeholder={placeholder}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Press Ctrl+Enter to generate
                </p>
              </div>

              {/* Quick Suggestions */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {context === 'resume' && (
                    <>
                      <button
                        onClick={() => setPrompt('Write a professional summary for a philosophy PhD candidate with technical skills')}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                      >
                        Professional Summary
                      </button>
                      <button
                        onClick={() => setPrompt('Generate bullet points for a research assistant position')}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                      >
                        Experience Bullets
                      </button>
                      <button
                        onClick={() => setPrompt('List technical skills for digital humanities')}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                      >
                        Technical Skills
                      </button>
                    </>
                  )}
                  {context === 'portfolio' && (
                    <>
                      <button
                        onClick={() => setPrompt('Write a project description for a digital humanities project')}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                      >
                        Project Description
                      </button>
                      <button
                        onClick={() => setPrompt('Generate key features for a web application')}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                      >
                        Key Features
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setPrompt('Improve the tone and clarity of this text')}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                  >
                    Improve Writing
                  </button>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Generated Content */}
              {generatedContent && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-amber-800 mb-2">Generated Content:</h4>
                  <div className="bg-white rounded border p-3 mb-3">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{generatedContent}</pre>
                  </div>
                  <button
                    onClick={handleUseContent}
                    className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 transition-colors text-sm"
                  >
                    Use This Content
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-4 border-t border-amber-200">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setPrompt('');
                  setGeneratedContent('');
                  setError('');
                }}
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Generate'
                )}
              </button>
            </div>
        </div>
      )}
    </>
  );
}