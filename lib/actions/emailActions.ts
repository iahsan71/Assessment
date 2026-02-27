'use server';

import { fetchPosts, fetchUsers, fetchComments, mapPostsToEmails } from '@/lib/api/emails';

export async function getEmails() {
  try {
    const [posts, users, comments] = await Promise.all([
      fetchPosts(10),
      fetchUsers(),
      fetchComments(20)
    ]);

    const emails = mapPostsToEmails(posts, users, comments);
    
    return {
      success: true,
      data: emails,
      error: null
    };
  } catch (error) {
    console.error('Error fetching emails:', error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch emails'
    };
  }
}

export async function getEmailById(id: number) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch email');
    }
    const post = await response.json();
    
    return {
      success: true,
      data: post,
      error: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch email'
    };
  }
}
