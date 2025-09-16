'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

interface AdminContextType {
  isAuthenticated: boolean;
  isAdminMode: boolean;
  isEditing: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  toggleAdminMode: () => void;
  setEditing: (editing: boolean) => void;
  saveChanges: () => Promise<void>;
  cancelChanges: () => void;
  hasUnsavedChanges: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'yekta2025';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for existing authentication
    const adminAuth = localStorage.getItem('admin_authenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }

    // Check for admin mode query parameter
    const adminParam = searchParams?.get('admin');
    if (adminParam === 'true' && isAuthenticated) {
      setIsAdminMode(true);
    }
  }, [searchParams, isAuthenticated]);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdminMode(false);
    setIsEditing(false);
    setHasUnsavedChanges(false);
    localStorage.removeItem('admin_authenticated');
  };

  const toggleAdminMode = () => {
    if (!isAuthenticated) return;

    const newAdminMode = !isAdminMode;
    setIsAdminMode(newAdminMode);
    setIsEditing(false);
    setHasUnsavedChanges(false);

    // Update URL without page refresh
    const url = new URL(window.location.href);
    if (newAdminMode) {
      url.searchParams.set('admin', 'true');
    } else {
      url.searchParams.delete('admin');
    }
    window.history.replaceState({}, '', url.toString());
  };

  const setEditing = (editing: boolean) => {
    setIsEditing(editing);
    if (editing) {
      setHasUnsavedChanges(true);
    }
  };

  const saveChanges = async (): Promise<void> => {
    // This will be implemented with specific save logic for each component
    setHasUnsavedChanges(false);
    setIsEditing(false);

    // Show success notification
    console.log('Changes saved successfully!');
  };

  const cancelChanges = () => {
    setIsEditing(false);
    setHasUnsavedChanges(false);
    // Trigger component refresh to restore original data
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      isAdminMode,
      isEditing,
      login,
      logout,
      toggleAdminMode,
      setEditing,
      saveChanges,
      cancelChanges,
      hasUnsavedChanges
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}