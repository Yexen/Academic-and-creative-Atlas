'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';

interface EditableTextProps {
  children: React.ReactNode;
  onSave: (newText: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  inline?: boolean;
}

export default function EditableText({
  children,
  onSave,
  className = '',
  multiline = false,
  placeholder = 'Enter text...',
  inline = false
}: EditableTextProps) {
  // Handle admin context safely for static generation
  let isAdminMode = false;
  let setEditing = (editing: boolean) => {};
  try {
    const adminContext = useAdmin();
    isAdminMode = adminContext.isAdminMode;
    setEditing = adminContext.setEditing;
  } catch (error) {
    // Admin context not available during static generation
    isAdminMode = false;
    setEditing = (editing: boolean) => {};
  }

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    // Extract text from children - handle React elements by getting their text content
    let currentText = '';
    if (typeof children === 'string') {
      currentText = children;
    } else if (React.isValidElement(children)) {
      // Get text content from React element
      const extractText = (element: any): string => {
        if (typeof element === 'string') return element;
        if (typeof element === 'number') return element.toString();
        if (React.isValidElement(element) && (element.props as any).children) {
          if (typeof (element.props as any).children === 'string') {
            return (element.props as any).children;
          }
          if (Array.isArray((element.props as any).children)) {
            return (element.props as any).children.map(extractText).join('');
          }
          return extractText((element.props as any).children);
        }
        return '';
      };
      currentText = extractText(children);
    }
    setText(currentText);
    setIsEditing(true);
    setEditing(true);
  };

  const handleSave = () => {
    onSave(text);
    setIsEditing(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      handleSave();
    }
  };

  if (!isAdminMode) {
    return <>{children}</>;
  }

  if (isEditing) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} border-2 border-blue-500 bg-white p-2 rounded resize-y min-h-[100px] w-full`}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} border-2 border-blue-500 bg-white p-2 rounded w-full`}
            placeholder={placeholder}
          />
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {multiline ? 'Press Ctrl+Enter to save, Esc to cancel' : 'Press Enter to save, Esc to cancel'}
        </p>
      </div>
    );
  }

  const WrapperElement = inline ? 'span' : 'div';

  return (
    <WrapperElement
      className="relative group cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-200 rounded p-1 transition-colors"
      onClick={handleEdit}
      title={isAdminMode ? 'Click to edit' : ''}
    >
      {children}
      {isAdminMode && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Edit
        </span>
      )}
    </WrapperElement>
  );
}