'use client';

import { Mail, Users, MessageSquare, CheckCircle, Archive, Tags, AlertCircle, MoreVertical } from 'lucide-react';

interface SidebarProps {
  selectedFolder?: string;
  onFolderSelect?: (folder: string) => void;
}

export function Sidebar({ selectedFolder = 'inbox', onFolderSelect }: SidebarProps) {
  const folders = [
    { id: 'inbox', label: 'My Inbox', icon: Mail, count: 24 },
    { id: 'all', label: 'All', icon: Users, count: 0 },
    { id: 'unassigned', label: 'Unassigned', icon: MessageSquare, count: 3 },
    { id: 'teams', label: 'Teams', icon: Users, count: 0 },
    { id: 'sales', label: 'Sales', icon: CheckCircle, count: 7 },
  ];

  const otherFolders = [
    { id: 'customer-support', label: 'Customer Support', icon: AlertCircle, count: 16 },
    { id: 'other', label: 'Other', icon: Archive, count: 0 },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-700/50">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h2 className="text-sm font-semibold text-slate-300">Inbox</h2>
      </div>

      {/* Main Folders */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {folders.map(folder => {
          const Icon = folder.icon;
          const isSelected = selectedFolder === folder.id;
          return (
            <button
              key={folder.id}
              onClick={() => onFolderSelect?.(folder.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isSelected
                  ? 'bg-slate-700/50 text-slate-100'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">{folder.label}</span>
              {folder.count > 0 && (
                <span className="text-xs bg-slate-700/50 px-2 py-0.5 rounded text-slate-300">
                  {folder.count}
                </span>
              )}
            </button>
          );
        })}

        {/* Divider */}
        <div className="my-4 border-t border-slate-700/30" />

        {/* Other Sections */}
        <div className="space-y-1">
          {otherFolders.map(folder => {
            const Icon = folder.icon;
            const isSelected = selectedFolder === folder.id;
            return (
              <button
                key={folder.id}
                onClick={() => onFolderSelect?.(folder.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isSelected
                    ? 'bg-slate-700/50 text-slate-100'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{folder.label}</span>
                {folder.count > 0 && (
                  <span className="text-xs bg-slate-700/50 px-2 py-0.5 rounded text-slate-300">
                    {folder.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700/50 space-y-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 text-xs font-medium transition-colors">
          <span>+</span>
          <span>Create</span>
        </button>
      </div>
    </div>
  );
}
