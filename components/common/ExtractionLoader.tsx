'use client';

import { useEffect, useState } from 'react';
import { Users, Mail, Inbox, FileText } from 'lucide-react';

interface User {
  id: number;
  name: string;
  avatar?: string;
  initials?: string;
}

interface ExtractionLoaderProps {
  isLoading: boolean;
  users?: User[];
}

export function ExtractionLoader({ isLoading, users = [] }: ExtractionLoaderProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  const selectedUsers = users.slice(0, 2);

  // Honeycomb icon positions - increased count
  const honeycombIcons = [
    { Icon: Users, top: '15%', left: '20%', delay: 0 },
    { Icon: Mail, top: '25%', right: '15%', delay: 0.5 },
    { Icon: Inbox, bottom: '30%', left: '15%', delay: 1 },
    { Icon: FileText, bottom: '20%', right: '25%', delay: 1.5 },
    { Icon: Users, top: '10%', left: '35%', delay: 0.8 },
    { Icon: Mail, top: '40%', left: '10%', delay: 1.2 },
    { Icon: Inbox, top: '35%', right: '20%', delay: 0.3 },
    { Icon: FileText, bottom: '35%', right: '10%', delay: 1.8 },
    { Icon: Users, bottom: '15%', left: '30%', delay: 0.6 },
    { Icon: Mail, top: '20%', right: '30%', delay: 1.4 },
    { Icon: Inbox, bottom: '25%', right: '35%', delay: 0.9 },
    { Icon: FileText, top: '30%', left: '25%', delay: 1.1 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-8">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Honeycomb floating icons */}
      {honeycombIcons.map(({ Icon, top, left, right, bottom, delay }, idx) => (
        <div
          key={idx}
          className="absolute w-12 h-12 rounded-lg bg-slate-800/50 border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm"
          style={{
            top,
            left,
            right,
            bottom,
            animation: `float 3s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon className="w-6 h-6 text-cyan-400/70" />
        </div>
      ))}

      {/* Main content area */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex flex-col items-center justify-center">
        {/* Circular loader section */}
        <div className="relative flex flex-col items-center justify-center mb-8">
          <div className="relative">
            {/* Outer glowing rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="absolute w-[400px] h-[400px] rounded-full border-2 border-blue-500/20"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: 'none',
                }}
              />
              <div 
                className="absolute w-[450px] h-[450px] rounded-full border border-cyan-400/10"
                style={{
                  transform: `rotate(${-rotation}deg)`,
                  transition: 'none',
                }}
              />
            </div>

            {/* Glowing background effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/30 blur-3xl animate-pulse" />
            </div>

            {/* Main circle */}
            <div className="relative w-64 h-64 rounded-full border-[3px] border-blue-500 flex items-center justify-center bg-gradient-to-br from-slate-900/80 to-blue-950/80 backdrop-blur-sm shadow-2xl shadow-blue-500/50">
              {/* Inner glowing ring */}
              <div className="absolute inset-4 rounded-full border border-cyan-400/40" />

              {/* User avatars inside circle */}
              <div className="relative z-10 flex items-center justify-center">
                {selectedUsers.length > 0 ? (
                  <div className="flex items-center gap-2">
                    {selectedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="relative w-16 h-16 rounded-full border-2 border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-cyan-500/50"
                      >
                        {user.initials || user.name.substring(0, 2).toUpperCase()}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 animate-pulse" />
                )}
              </div>

              {/* Rotating border animation */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from ${rotation}deg, transparent 0deg, rgba(34, 211, 238, 0.5) 90deg, transparent 180deg)`,
                  transition: 'none',
                }}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="relative z-20 mt-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Extracting Information...
            </h2>
            <p className="text-slate-300 text-lg max-w-lg mx-auto leading-relaxed">
              We are extracting information from the above honey combs to your system
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Preview at bottom */}
      <div className="relative w-full max-w-5xl mx-auto mt-auto">
        <div className="relative bg-slate-100 rounded-t-xl shadow-2xl border-4 border-cyan-400/50 overflow-hidden p-1" style={{ height: '200px' }}>
          {/* Navbar */}
          <div className="bg-white rounded-lg px-2 py-0.5 mb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '9px' }} className="font-bold text-cyan-600">BOXpod</span>
              <div className="flex items-center gap-0.5">
                <button className="flex items-center gap-0.5 px-1 py-0.5 font-medium text-slate-900 bg-slate-50 rounded" style={{ fontSize: '8px' }}>
                  <span style={{ fontSize: '7px' }}>📧</span>
                  <span>Inbox</span>
                </button>
                <button className="flex items-center gap-0.5 px-1 py-0.5 text-slate-600" style={{ fontSize: '8px' }}>
                  <span style={{ fontSize: '7px' }}>👥</span>
                  <span>Contacts</span>
                </button>
                <button className="flex items-center gap-0.5 px-1 py-0.5 text-slate-600" style={{ fontSize: '8px' }}>
                  <span style={{ fontSize: '7px' }}>🤖</span>
                  <span>AI Employees</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button style={{ fontSize: '8px' }} className="text-slate-400">⚙️</button>
              <div className="flex items-center gap-0.5 bg-slate-50 rounded px-1 py-0.5">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold" style={{ fontSize: '7px' }}>
                  MJ
                </div>
                <span style={{ fontSize: '8px' }} className="font-medium text-slate-900">Michael Johnson</span>
              </div>
            </div>
          </div>

          {/* Mock Dashboard Content */}
          <div className="flex h-[calc(100%-32px)] gap-1">
            {/* Sidebar */}
            <div className="w-32 bg-white rounded-l-lg p-1.5">
              <div className="space-y-0.5">
                <div className="mb-1">
                  <span style={{ fontSize: '9px' }} className="font-bold text-slate-900">Inbox</span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 px-1 py-0.5 bg-slate-100 rounded text-slate-900" style={{ fontSize: '8px' }}>
                    <span style={{ fontSize: '7px' }}>👤</span>
                    <span>My Inbox</span>
                    <span className="ml-auto text-slate-500">26</span>
                  </div>
                  <div className="flex items-center gap-1 px-1 py-0.5 text-slate-700" style={{ fontSize: '8px' }}>
                    <span style={{ fontSize: '7px' }}>👥</span>
                    <span>All</span>
                    <span className="ml-auto text-slate-400">26</span>
                  </div>
                  <div className="flex items-center gap-1 px-1 py-0.5 text-slate-700" style={{ fontSize: '8px' }}>
                    <span style={{ fontSize: '7px' }}>⚽</span>
                    <span>Unassigned</span>
                    <span className="ml-auto text-slate-400">5</span>
                  </div>
                  <div className="mt-1 pt-0.5 border-t border-slate-200">
                    <div style={{ fontSize: '9px' }} className="font-bold text-slate-900 px-1 mb-0.5">Teams</div>
                    <div className="flex items-center gap-1 px-1 py-0.5 text-slate-700" style={{ fontSize: '8px' }}>
                      <span style={{ fontSize: '7px' }}>🎯</span>
                      <span>Sales</span>
                      <span className="ml-auto text-slate-400">7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email List */}
            <div className="w-44 bg-white rounded-r-lg p-1.5">
              <div className="mb-1">
                <div className="flex items-center gap-1 mb-1">
                  <svg className="w-2 h-2 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <h3 style={{ fontSize: '9px' }} className="font-bold text-slate-900">Michael Johnson</h3>
                </div>
                <div className="mb-1 relative">
                  <input 
                    type="text" 
                    placeholder="Search Chat" 
                    className="w-full px-1.5 py-0.5 bg-slate-50 rounded border-0"
                    style={{ fontSize: '8px' }}
                  />
                </div>
                <div className="flex gap-1.5 mb-1">
                  <button className="font-medium text-slate-900" style={{ fontSize: '8px' }}>Open ▼</button>
                  <button className="font-medium text-slate-900" style={{ fontSize: '8px' }}>Newest ▼</button>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-start gap-1 p-1 bg-slate-50 rounded-lg">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ fontSize: '7px' }}>
                    O
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span style={{ fontSize: '8px' }} className="font-semibold text-slate-900 truncate">Olivia Mckinsey</span>
                      <span style={{ fontSize: '7px' }} className="text-slate-400">23:23</span>
                    </div>
                    <p style={{ fontSize: '7px' }} className="text-slate-500 truncate">Oh my god 😍...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white rounded-lg p-1.5 flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1">
                <h3 style={{ fontSize: '9px' }} className="font-bold text-slate-900">Olivia Mckinsey</h3>
                <div className="flex items-center gap-0.5">
                  <button className="w-3 h-3 rounded flex items-center justify-center text-slate-400" style={{ fontSize: '7px' }}>⋮</button>
                  <button className="w-3 h-3 rounded bg-slate-900 flex items-center justify-center text-white" style={{ fontSize: '6px' }}>🌙</button>
                  <button className="w-3 h-3 rounded bg-slate-900 flex items-center justify-center text-white" style={{ fontSize: '6px' }}>📦</button>
                </div>
              </div>
              
              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="text-center">
                  <span style={{ fontSize: '7px' }} className="text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded-full">28 August 2025</span>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-slate-200 rounded-lg p-1 text-slate-700 max-w-[70%]" style={{ fontSize: '7px' }}>
                    Hi, I recently joined FitLife...
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-indigo-100 rounded-lg p-1 text-slate-700 max-w-[70%]" style={{ fontSize: '7px' }}>
                    Hello Olivia 👋 I'm Michael...
                  </div>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="w-44 bg-white rounded-lg p-1.5 overflow-y-auto">
              <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-200">
                <h3 style={{ fontSize: '9px' }} className="font-bold text-slate-900">Details</h3>
                <button style={{ fontSize: '8px' }} className="text-slate-400">☰</button>
              </div>
              
              <div className="space-y-1">
                <div>
                  <div style={{ fontSize: '8px' }} className="font-bold text-slate-900 mb-0.5">Chat Data</div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between" style={{ fontSize: '7px' }}>
                      <span className="text-slate-400">Assignee</span>
                      <div className="flex items-center gap-0.5">
                        <span style={{ fontSize: '6px' }}>👤</span>
                        <span className="text-slate-900 font-medium">James West</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-200">
                  <div style={{ fontSize: '8px' }} className="font-bold text-slate-900 mb-0.5">Contact Data</div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between" style={{ fontSize: '7px' }}>
                      <span className="text-slate-400">First Name</span>
                      <span className="text-slate-900 font-medium">Olivia</span>
                    </div>
                    <div className="flex justify-between" style={{ fontSize: '7px' }}>
                      <span className="text-slate-400">Phone</span>
                      <span className="text-slate-900 font-medium">+1 (312) 555-0134</span>
                    </div>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-200">
                  <div style={{ fontSize: '8px' }} className="font-bold text-slate-900 mb-0.5">Contact Labels</div>
                  <div className="flex flex-wrap gap-0.5">
                    <span className="px-1.5 py-0.5 bg-white text-blue-600 rounded-full border border-blue-500" style={{ fontSize: '7px' }}>
                      ⭐ Closed Won
                    </span>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-200">
                  <div style={{ fontSize: '8px' }} className="font-bold text-slate-900 mb-0.5">Notes</div>
                  <div className="p-1 bg-yellow-100 rounded text-slate-900" style={{ fontSize: '7px' }}>
                    Strong potential
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
