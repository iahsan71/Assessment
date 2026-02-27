'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Email } from '@/lib/api/emails';

interface EmailStoreState {
  emails: Email[];
  selectedEmail: Email | null;
  selectedFolder: string;
  isLoading: boolean;
  error: string | null;
}

interface EmailStoreActions {
  setEmails: (emails: Email[]) => void;
  setSelectedEmail: (email: Email | null) => void;
  setSelectedFolder: (folder: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type EmailStore = EmailStoreState & EmailStoreActions;

const EmailStoreContext = createContext<EmailStore | undefined>(undefined);

export function EmailStoreProvider({ children }: { children: ReactNode }) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const value: EmailStore = {
    emails,
    selectedEmail,
    selectedFolder,
    isLoading,
    error,
    setEmails,
    setSelectedEmail,
    setSelectedFolder,
    setIsLoading,
    setError,
    clearError,
  };

  return (
    <EmailStoreContext.Provider value={value}>
      {children}
    </EmailStoreContext.Provider>
  );
}

export function useEmailStore(): EmailStore {
  const context = useContext(EmailStoreContext);
  if (context === undefined) {
    throw new Error('useEmailStore must be used within EmailStoreProvider');
  }
  return context;
}
