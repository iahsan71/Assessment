'use client';

import { useEffect, useState } from 'react';
import { Mail, Users } from 'lucide-react';
import { InboxSidebar } from '@/components/layout/InboxSidebar';
import { EmailList } from './EmailList';
import { EmailDetail } from './EmailDetail';
import { ExtractionLoader } from '@/components/common/ExtractionLoader';
import { useEmails } from '@/lib/hooks/useEmails';
import { Email } from '@/lib/api/emails';

export function InboxDashboard() {
  const { emails, users, isLoading, error } = useEmails();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [showExtractionLoader, setShowExtractionLoader] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExtractionLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (emails.length > 0 && !selectedEmail) {
      setSelectedEmail(emails[0]);
    }
  }, [emails, selectedEmail]);

  const loaderUsers = users.slice(0, 2).map((u) => ({
    id: u.id,
    name: u.name,
    initials: u.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)
  }));

  return (
    <div className="w-full h-screen bg-slate-100 text-slate-900 overflow-hidden">
      {error && !showExtractionLoader && (
        <div className="w-full h-screen flex items-center justify-center bg-slate-100">
          <div className="text-center space-y-4 p-8 bg-white rounded-xl shadow-lg max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Oops! Something went wrong</h2>
            <p className="text-slate-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      
      {!error && <ExtractionLoader isLoading={showExtractionLoader} users={loaderUsers} />}
      
      {!error && !showExtractionLoader && isLoading && (
        <div className="w-full h-screen bg-slate-100">
          <div className="bg-slate-100 px-1.5 py-1.5">
            <div className="bg-white rounded-[11px] px-3 py-1.5 flex items-center gap-1.5 justify-between shadow-sm">
              <div className="flex items-center gap-6">
                <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
                <div className="hidden md:flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-100 rounded-lg animate-pulse" />
                <div className="h-8 w-32 bg-slate-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>

          <div className="w-full h-[calc(100vh-56px)] flex gap-2 px-2 pb-2">
            <div className="w-44 h-full bg-white rounded-l-[11px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-4">
              <div className="space-y-3">
                <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-8 bg-slate-100 rounded animate-pulse" />
                ))}
              </div>
            </div>

            <div className="w-80 h-full bg-white rounded-r-[8px] border-l border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-4">
              <div className="space-y-3 mb-4">
                <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-10 bg-slate-100 rounded-lg animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-slate-100 rounded animate-pulse" />
                  <div className="h-6 w-16 bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-32" />
                      <div className="h-2 bg-slate-100 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 h-full bg-white rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-4">
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded animate-pulse" />
                    <div className="w-8 h-8 bg-slate-900 rounded animate-pulse" />
                    <div className="w-8 h-8 bg-slate-900 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex-1 space-y-3 overflow-hidden">
                  <div className="text-center">
                    <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto animate-pulse" />
                  </div>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <div className={`h-16 w-2/3 ${i % 2 === 0 ? 'bg-slate-200' : 'bg-indigo-100'} rounded-xl animate-pulse`} />
                    </div>
                  ))}
                </div>
                <div className="h-12 bg-slate-100 rounded-2xl animate-pulse" />
              </div>
            </div>

            <div className="w-80 h-full bg-white rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
                  <div className="w-6 h-6 bg-slate-100 rounded animate-pulse" />
                </div>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2 border-b border-slate-200 pb-3">
                    <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 bg-slate-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!error && !showExtractionLoader && !isLoading && (
        <>
          <div className="bg-slate-100 px-1.5 py-1.5">
        <div className="bg-white rounded-[11px] px-3 py-1.5 flex items-center gap-1.5 justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <h1 className="text-base font-bold text-cyan-600">
              BoxPod
            </h1>
            
            <nav className="hidden md:flex items-center gap-0.5">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-900 bg-slate-50 rounded-lg transition-colors">
                <Mail className="w-4 h-4" />
                <span>Inbox</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Users className="w-4 h-4" />
                <span>Contacts</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Users className="w-4 h-4" />
                <span>AI Employees</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <span>🔄</span>
                <span>Workflows</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <span>📢</span>
                <span>Campaigns</span>
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2 py-1">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-xs font-semibold">
                MJ
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-900 pr-1">Michael Johnson</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-56px)] flex gap-2 px-2 pb-2">
        <div className={`${
          showSidebar ? 'block' : 'hidden'
        } lg:block w-full sm:w-44 h-full bg-white rounded-l-[11px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]`}>
          <InboxSidebar
            selectedFolder={selectedFolder}
            onFolderSelect={setSelectedFolder}
          />
        </div>

        <div className={`${
          !showSidebar && !selectedEmail ? 'block' : 'hidden'
        } md:block md:w-64 lg:w-80 h-full bg-white rounded-r-[8px] border-l border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.12)]`}>
          <EmailList
            emails={emails}
            selectedEmailId={selectedEmail?.id}
            onEmailSelect={(email) => {
              setSelectedEmail(email);
              setShowSidebar(false);
            }}
            isLoading={isLoading}
            error={error}
          />
        </div>

        <div className={`${
          selectedEmail && showSidebar ? 'flex' : 'hidden'
        } md:flex flex-1 h-full gap-2`}>
          <div className="flex-1 overflow-hidden bg-white rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
            <EmailDetail
              email={selectedEmail}
              isLoading={isLoading}
            />
          </div>
        </div>

        {!selectedEmail && (
          <div className="hidden md:flex flex-1 h-full items-center justify-center bg-white rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                <Mail className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-600 text-lg font-medium">Select an email to view details</p>
              <p className="text-slate-400 text-sm">Choose an email from the list to get started</p>
            </div>
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
}
