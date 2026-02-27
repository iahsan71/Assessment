'use client';

import { DetailSkeleton } from './loading-skeletons';
import { MoreVertical, Share2, Printer, Copy } from 'lucide-react';

interface EmailDetailProps {
  email?: {
    id: number;
    name: string;
    email: string;
    subject: string;
    body: string;
    timestamp: string;
    replies?: {
      id: number;
      name: string;
      email: string;
      body: string;
      timestamp: string;
    }[];
  } | null;
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

export function EmailDetail({ email, isLoading }: EmailDetailProps) {
  if (isLoading) {
    return (
      <div className="w-full h-full bg-slate-900/50 p-6 overflow-y-auto">
        <DetailSkeleton />
      </div>
    );
  }

  if (!email) {
    return (
      <div className="w-full h-full bg-slate-900/50 flex items-center justify-center text-slate-500">
        <p>Select an email to view details</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-slate-900/50 flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-700/50 p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold text-slate-100">{email.subject}</h2>
          <button className="p-2 hover:bg-slate-800/50 rounded-md transition-colors">
            <MoreVertical className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Sender Info */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full ${getAvatarColor(email.id)} flex items-center justify-center text-white font-semibold`}>
              {getInitials(email.name)}
            </div>
            <div>
              <p className="font-medium text-slate-100">{email.name}</p>
              <p className="text-sm text-slate-400">{email.email}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">{email.timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Original Message */}
        <div className="space-y-3">
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
            {email.body}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/30" />

        {/* Replies */}
        {email.replies && email.replies.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-100">Responses</h3>
            {email.replies.map(reply => (
              <div key={reply.id} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getAvatarColor(reply.id)} flex items-center justify-center text-white text-xs font-semibold`}>
                      {getInitials(reply.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-100">{reply.name}</p>
                      <p className="text-xs text-slate-500">{reply.email}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{reply.timestamp}</p>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {reply.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-slate-700/50 p-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-slate-800/50 rounded-md transition-colors" title="Share">
            <Share2 className="w-4 h-4 text-slate-400 hover:text-slate-300" />
          </button>
          <button className="p-2 hover:bg-slate-800/50 rounded-md transition-colors" title="Print">
            <Printer className="w-4 h-4 text-slate-400 hover:text-slate-300" />
          </button>
          <button className="p-2 hover:bg-slate-800/50 rounded-md transition-colors" title="Copy">
            <Copy className="w-4 h-4 text-slate-400 hover:text-slate-300" />
          </button>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-md transition-colors">
          Reply
        </button>
      </div>
    </div>
  );
}
