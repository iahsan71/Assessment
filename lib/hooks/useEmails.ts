'use client';

import { useState, useEffect } from 'react';
import { Email, fetchPosts, fetchUsers, fetchComments, mapPostsToEmails } from '@/lib/api/emails';

interface UseEmailsReturn {
  emails: Email[];
  users: any[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEmails(): UseEmailsReturn {
  const [emails, setEmails] = useState<Email[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Add delay for skeleton loader visibility (5 seconds)
      await new Promise(resolve => setTimeout(resolve, 5000));

      const [posts, usersData, comments] = await Promise.all([
        fetchPosts(10),
        fetchUsers(),
        fetchComments(20)
      ]);

      setUsers(usersData);
      const emailsData = mapPostsToEmails(posts, usersData, comments);
      setEmails(emailsData);
    } catch (err) {
      console.error('Failed to fetch emails:', err);
      setError('Failed to load emails. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return {
    emails,
    users,
    isLoading,
    error,
    refetch: fetchEmails
  };
}
