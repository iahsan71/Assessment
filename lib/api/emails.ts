export interface Email {
  id: number;
  name: string;
  email: string;
  subject: string;
  snippet: string;
  timestamp: string;
  body: string;
  unread?: boolean;
  replies?: Reply[];
}

export interface Reply {
  id: number;
  name: string;
  email: string;
  body: string;
  timestamp: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(limit: number = 10) {
  const response = await fetch(`${API_BASE_URL}/posts?_limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export async function fetchComments(limit: number = 20) {
  const response = await fetch(`${API_BASE_URL}/comments?_limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
}

export function mapPostsToEmails(posts: any[], users: User[], comments: any[]): Email[] {
  return posts.map((post: any, index: number) => {
    const author = users[index];
    const postComments = comments.filter((c: any) => c.postId === post.id).slice(0, 2);

    return {
      id: post.id,
      name: author?.name || 'Unknown',
      email: author?.email || 'unknown@example.com',
      subject: post.title,
      snippet: post.body.substring(0, 100) + '...',
      body: post.body,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      unread: Math.random() > 0.6,
      replies: postComments.map((c: any) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        body: c.body,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })
      }))
    };
  });
}
