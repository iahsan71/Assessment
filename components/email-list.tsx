'use client';

import Image from 'next/image';
import { Search, Star, Pin } from 'lucide-react';
import { LoadingSkeletons } from './loading-skeletons';

interface Email {
  id: number;
  name: string;
  email: string;
  subject: string;
  snippet: string;
  timestamp: string;
  avatar?: string;
  unread?: boolean;
}

interface EmailListProps {
  emails: Email[];
  selectedEmailId?: number;
  onEmailSelect?: (email: Email) => void;
  isLoading?: boolean;
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

export function EmailList({ emails, selectedEmailId, onEmailSelect, isLoading }: EmailListProps) {
  if (isLoading) {
    return <LoadingSkeletons />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-slate-900/50 border-r border-slate-700/50">
      {/* Search Bar */}
      <div className="p-4 border-b border-slate-700/50 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search Chat"
            className="w-full pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700/30 rounded-md text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p>No emails found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700/30">
            {emails.map(email => {
              const isSelected = selectedEmailId === email.id;
              const bgColor = getAvatarColor(email.id);
              return (
                <button
                  key={email.id}
                  onClick={() => onEmailSelect?.(email)}
                  className={`w-full px-4 py-3 flex items-start gap-3 transition-colors hover:bg-slate-800/30 border-l-2 ${
                    isSelected
                      ? 'bg-slate-800/50 border-l-cyan-500'
                      : 'border-l-transparent'
                  }`}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white text-xs font-semibold`}>
                    {getInitials(email.name)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-slate-100 text-sm truncate">
                        {email.name}
                      </h3>
                      {email.unread && (
                        <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate mb-2">
                      {email.email}
                    </p>
                    <p className="text-sm text-slate-300 truncate">
                      {email.subject}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-1">
                      {email.snippet}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <span className="text-xs text-slate-500">{email.timestamp}</span>
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
