'use client';

import { Search, ChevronDown } from 'lucide-react';
import { Email } from '@/lib/api/emails';

interface EmailListProps {
  emails: Email[];
  selectedEmailId?: number;
  onEmailSelect?: (email: Email) => void;
  isLoading?: boolean;
  error?: string | null;
}

const avatarColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-red-500',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(id: number): string {
  return avatarColors[id % avatarColors.length];
}

export function EmailList({ emails, selectedEmailId, onEmailSelect, isLoading, error }: EmailListProps) {
  if (error) {
    return (
      <div className="w-full h-full flex flex-col bg-white rounded-r-[8px] overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-slate-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col bg-white">
        <div className="p-4 border-b border-slate-200">
          <div className="h-9 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="flex-1 p-3 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-32" />
                <div className="h-2 bg-slate-100 rounded w-full" />
                <div className="h-2 bg-slate-100 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-r-[8px] overflow-hidden">
      <div className="p-4 border-b border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Michael Johnson
          </h2>
          <button className="p-1.5 hover:bg-slate-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Chat"
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border-0 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-200"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1.5 text-sm font-medium text-slate-900">
            Open
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1.5 text-sm font-medium text-slate-900">
            Newest
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p>No emails found</p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {emails.map(email => {
              const isSelected = selectedEmailId === email.id;
              const bgColor = getAvatarColor(email.id);
              return (
                <button
                  key={email.id}
                  onClick={() => onEmailSelect?.(email)}
                  className={`w-full px-3 py-3 flex items-start gap-3 transition-colors rounded-xl ${
                    isSelected
                      ? 'bg-slate-50'
                      : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white text-sm font-semibold`}>
                    {getInitials(email.name)}
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 text-sm truncate">
                        {email.name}
                      </h3>
                      <span className="text-xs text-slate-400 flex-shrink-0">{email.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-500 truncate">
                      {email.snippet}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
