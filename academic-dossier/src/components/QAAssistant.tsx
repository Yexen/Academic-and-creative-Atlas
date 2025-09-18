'use client';

import { useState, useRef, useEffect } from 'react';

interface QAAssistantProps {
  context?: string;
}

export default function QAAssistant({ context = "academic portfolio" }: QAAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversation, setConversation] = useState<Array<{type: 'question' | 'answer', content: string, timestamp: Date}>>([]);
  const [error, setError] = useState('');
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation]);

  // Drag handlers (disabled on mobile)
  const handleMouseDown = (e: React.MouseEvent) => {
    // Disable dragging on mobile/touch devices
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

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

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    // Add question to conversation
    const newQuestion = {
      type: 'question' as const,
      content: question.trim(),
      timestamp: new Date()
    };

    setConversation(prev => [...prev, newQuestion]);
    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/qa-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          context,
          conversationHistory: conversation
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response statusText:', response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();

      // Add answer to conversation
      const newAnswer = {
        type: 'answer' as const,
        content: data.answer,
        timestamp: new Date()
      };

      setConversation(prev => [...prev, newAnswer]);
      setQuestion('');
    } catch (err) {
      console.error('Q&A error details:', err);
      console.error('Error type:', typeof err);
      console.error('Error message:', err instanceof Error ? err.message : String(err));
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  const clearConversation = () => {
    setConversation([]);
    setError('');
  };

  const suggestedQuestions = [
    "What is Yekta's research focus?",
    "Tell me about the philosophy projects",
    "What technical skills does Yekta have?",
    "What is the Shadowline project?",
    "Describe Yekta's academic background",
    "What programming languages does Yekta know?"
  ];

  return (
    <>
      {/* Q&A Assistant Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 sm:bottom-4 sm:left-4 bg-amber-800 text-white px-4 py-3 sm:px-3 sm:py-2 rounded-lg shadow-lg hover:bg-amber-900 active:bg-amber-900 transition-colors z-50 flex items-center gap-2 group"
        title="Ask about Yekta's work"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
        <span className="text-sm font-medium academic-text hidden sm:inline">Ask Questions</span>
        <span className="text-sm font-medium academic-text sm:hidden">Ask</span>
      </button>

      {/* Q&A Assistant Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed bg-white rounded-lg shadow-2xl border border-gray-300 w-[95vw] h-[85vh] sm:w-[90vw] sm:h-[80vh] md:w-[650px] md:h-[600px] flex flex-col z-50"
          style={{
            left: typeof window !== 'undefined' && window.innerWidth < 768 ? '2.5vw' : `${position.x}px`,
            top: typeof window !== 'undefined' && window.innerWidth < 768 ? '7.5vh' : `${position.y}px`,
            cursor: isDragging ? 'grabbing' : 'auto'
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 border-b border-amber-200 md:cursor-grab md:active:cursor-grabbing select-none flex-shrink-0 touch-manipulation"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-academic-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Ask About Yekta's Work</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearConversation}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                title="Clear conversation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversation.length === 0 && (
                <div className="text-center text-gray-500">
                  <p className="mb-4">Hi! I can answer questions about Yekta's academic work, research, and projects.</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Try asking:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {suggestedQuestions.slice(0, 3).map((q, index) => (
                        <button
                          key={index}
                          onClick={() => setQuestion(q)}
                          className="text-xs bg-amber-800 hover:bg-amber-900 text-white px-3 py-2 rounded transition-colors border border-amber-800 font-medium"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'question'
                        ? 'bg-amber-800 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin text-academic-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="mx-4 mb-2 bg-red-50 border border-red-200 rounded-lg p-2">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-gray-200 p-3 sm:p-4 flex-shrink-0">
              <div className="flex gap-2 sm:gap-2">
                <textarea
                  ref={textareaRef}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 resize-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
                  placeholder="Ask me anything about Yekta's work..."
                  rows={2}
                />
                <button
                  onClick={handleAskQuestion}
                  disabled={!question.trim() || isGenerating}
                  className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm self-end"
                >
                  Ask
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}