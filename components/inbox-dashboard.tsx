'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from './sidebar';
import { EmailList } from './email-list';
import { EmailDetail } from './email-detail';
import { ExtractionLoader } from './extraction-loader';
import { Mail } from 'lucide-react';

interface Email {
  id: number;
  name: string;
  email: string;
  subject: string;
  snippet: string;
  timestamp: string;
  body: string;
  unread?: boolean;
  replies?: {
    id: number;
    name: string;
    email: string;
    body: string;
    timestamp: string;
  }[];
}

export function InboxDashboard() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  // Fetch emails from JSONPlaceholder API
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setIsLoading(true);
        
        // Fetch posts as emails
        const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        const posts = await postsRes.json();

        // Fetch users for author info
        const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersRes.json();
        setUsers(usersData);

        // Fetch comments for replies
        const commentsRes = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=20');
        const comments = await commentsRes.json();

        // Map posts to emails
        const emailsData: Email[] = posts.map((post: any) => {
          const author = usersData.find((u: any) => u.id === post.userId);
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

        setEmails(emailsData);
        setSelectedEmail(emailsData[0] || null);
      } catch (error) {
        console.error('Failed to fetch emails:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const loaderUsers = users.slice(0, 2).map((u) => ({
    id: u.id,
    name: u.name,
    initials: u.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)
  }));

  return (
    <div className="w-full h-screen bg-slate-900 text-slate-100 overflow-hidden">
      <ExtractionLoader isLoading={isLoading} users={loaderUsers} />
      {/* Header */}
      <div className="h-16 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-b border-slate-700/50 flex items-center px-6 gap-4 justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-slate-800/50 rounded-md lg:hidden transition-colors"
          >
            <Mail className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              RoxJpod
            </span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/30 border border-slate-700/30">
            <span className="text-xs text-slate-400">Static</span>
            <span className="text-xs text-slate-500">|</span>
            <span className="text-xs font-medium text-cyan-400">Hover</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
            MJ
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-[calc(100vh-64px)] flex gap-0">
        {/* Sidebar - Hidden on mobile, visible on lg */}
        <div className={`${
          showSidebar ? 'block' : 'hidden'
        } lg:block w-full sm:w-64 h-full border-r border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-950`}>
          <Sidebar
            selectedFolder={selectedFolder}
            onFolderSelect={setSelectedFolder}
          />
        </div>

        {/* Email List - Hidden on mobile, visible on md+ */}
        <div className={`${
          !showSidebar && !selectedEmail ? 'block' : 'hidden'
        } md:block md:w-80 lg:w-96 h-full border-r border-slate-700/50`}>
          <EmailList
            emails={emails}
            selectedEmailId={selectedEmail?.id}
            onEmailSelect={(email) => {
              setSelectedEmail(email);
              setShowSidebar(false);
            }}
            isLoading={isLoading}
          />
        </div>

        {/* Email Detail */}
        <div className={`${
          selectedEmail && showSidebar ? 'block' : 'hidden'
        } md:flex md:flex-1 h-full overflow-hidden`}>
          <EmailDetail
            email={selectedEmail}
            isLoading={isLoading}
          />
        </div>

        {/* Empty State */}
        {!selectedEmail && (
          <div className="hidden md:flex flex-1 h-full items-center justify-center bg-gradient-bg">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto">
                <Mail className="w-10 h-10 text-slate-600" />
              </div>
              <p className="text-slate-400 text-lg font-medium">Select an email to view details</p>
              <p className="text-slate-500 text-sm">Choose an email from the list to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
