'use client';

import { Inbox, Send, FileText, Archive, Trash2, Star } from 'lucide-react';

interface InboxSidebarProps {
  selectedFolder: string;
  onFolderSelect: (folder: string) => void;
}

export function InboxSidebar({ selectedFolder, onFolderSelect }: InboxSidebarProps) {
  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 12 },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'drafts', label: 'Drafts', icon: FileText, count: 3 },
    { id: 'starred', label: 'Starred', icon: Star },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-sm font-bold text-slate-900 mb-4">Folders</h2>
      <nav className="space-y-1">
        {folders.map((folder) => {
          const Icon = folder.icon;
          const isSelected = selectedFolder === folder.id;
          
          return (
            <button
              key={folder.id}
              onClick={() => onFolderSelect(folder.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                isSelected
                  ? 'bg-cyan-50 text-cyan-600 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{folder.label}</span>
              </div>
              {folder.count && (
                <span className={`text-xs ${isSelected ? 'text-cyan-600' : 'text-slate-400'}`}>
                  {folder.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
