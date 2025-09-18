'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface DashboardAIAssistantProps {
  onPDFProcessed?: (result: any) => void;
}

export default function DashboardAIAssistant({ onPDFProcessed }: DashboardAIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your Dashboard AI Assistant. I have comprehensive access to your knowledge base and can help you with:

📚 **Knowledge Base Management:**
• Update personal, education, creative, research, and technical sections
• Add new categories and sections dynamically
• Reorganize and restructure information

📄 **Document Processing:**
• Upload and process PDFs automatically
• Extract information and categorize content
• Create documents and update knowledge base from files

🤖 **AI-Powered Features:**
• Answer questions about your background and work
• Generate content based on your profile
• Suggest improvements and new sections
• Help organize and structure information

You can also drag and drop PDFs here, and I'll automatically process them and organize the information into the appropriate sections!

How can I help you manage your academic and creative information today?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // In a real implementation, this would call your AI API with knowledge base context
      await new Promise(resolve => setTimeout(resolve, 1500));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking: "${userMessage.content}"

Based on your comprehensive profile in the knowledge base, I can provide detailed information about:

**Your Background:**
- Multilingual philosopher (Persian, English, French)
- Currently pursuing Master's in Philosophy at Université Paris 8
- Background in Archaeology from University of Tehran
- Specialized in aesthetic theory and cultural transmission

**Your Current Work:**
- Yexen Jewelry Brand (poetry-inspired collections)
- Aesthetic Engagement Protocols for AI Interaction research
- Artist Assistant with Sepand Danesh
- Application development (Shadowline, Mémoire en Livres)

**Technical Skills:**
- Programming (C, AI-assisted development)
- Digital content creation and UX/UI design
- Professional translation capabilities
- Woodworking and craftsmanship

*Note: This is currently a demo response. In the full implementation, I would analyze your specific question against the knowledge base and provide targeted, actionable responses, including the ability to update information and process new content.*

Is there a specific aspect you'd like me to help you with or update?`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (files: FileList) => {
    const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');
    if (pdfFiles.length > 0) {
      processPDFs(pdfFiles);
    }
  };

  const processPDFs = async (files: File[]) => {
    setIsLoading(true);

    const processingMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `🔄 **Processing ${files.length} PDF file(s):**\n${files.map(f => `• ${f.name}`).join('\n')}\n\nI'm analyzing the content and will automatically:\n1. Extract text and information\n2. Categorize content appropriately\n3. Update knowledge base sections\n4. Create new documents\n5. Suggest new categories if needed\n\nThis may take a few moments...`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, processingMessage]);

    try {
      // Create FormData to send files to API
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/admin/process-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process PDFs');
      }

      const result = await response.json();

      const successMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `✅ **PDF Processing Complete!**\n\n**Files Processed:**\n${result.results.processedFiles.map((f: string) => `• ${f}`).join('\n')}\n\n**Knowledge Base Updates:**\n${result.results.knowledgeBaseUpdates.map((update: string) => `• ${update}`).join('\n')}\n\n**Documents Created:**\n${result.results.documentsCreated.map((doc: string) => `• ${doc}`).join('\n')}\n\n${result.results.errors.length > 0 ? `**Errors:**\n${result.results.errors.map((error: string) => `• ${error}`).join('\n')}\n\n` : ''}The information has been automatically organized and integrated into your knowledge base and document library. You can now access this content through the other dashboard tabs.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, successMessage]);

      // Notify parent component if callback provided
      if (onPDFProcessed) {
        onPDFProcessed({ files, processed: true, result });
      }

    } catch (error) {
      console.error('PDF processing error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: `❌ **Error processing PDFs:**\n\n${files.map(f => `• ${f.name} - Failed to process`).join('\n')}\n\nPlease try again or contact support if the issue persists.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  return (
    <div className="flex flex-col h-[700px] bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Dashboard AI Assistant</h3>
            <p className="text-sm text-gray-600">Knowledge Base & Document Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 font-medium">Ready</span>
        </div>
      </div>

      {/* Messages */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDragOver ? 'bg-amber-50 border-2 border-dashed border-amber-300' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragOver && (
          <div className="fixed inset-0 bg-amber-100 bg-opacity-90 flex items-center justify-center z-10">
            <div className="text-center">
              <svg className="w-16 h-16 text-amber-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-xl font-semibold text-amber-800">Drop PDFs to Process</p>
              <p className="text-amber-600">I'll automatically extract and organize the information</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-amber-600 text-white ml-4'
                  : 'bg-gray-50 text-gray-900 mr-4 border border-gray-100'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content}
              </div>
              <div
                className={`text-xs mt-3 ${
                  message.role === 'user' ? 'text-amber-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-50 text-gray-900 p-4 rounded-lg mr-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-700">AI is processing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        {/* File Upload Area */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Upload PDFs</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-colors"
          >
            Click to upload PDFs or drag and drop them anywhere in the chat
          </button>
        </div>

        {/* Text Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about the knowledge base, or request updates..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}