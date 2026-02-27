'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Moon, Archive, ChevronDown } from 'lucide-react';
import { Email } from '@/lib/api/emails';

interface EmailDetailProps {
  email?: Email | null;
  isLoading?: boolean;
}

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isUser: boolean;
}

export function EmailDetail({ email, isLoading }: EmailDetailProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      timestamp,
      isUser: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="flex gap-2 w-full h-full">
        <div className="flex-1 bg-slate-50 p-6 rounded-[8px] flex items-center justify-center">
          <div className="text-slate-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex gap-2 w-full h-full">
        <div className="flex-1 bg-slate-50 flex items-center justify-center text-slate-500 rounded-[8px]">
          <p>Select an email to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 w-full h-full">
      <div className="flex-1 bg-white flex flex-col rounded-[8px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">{email.name}</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg bg-slate-900 text-white">
                <Moon className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg bg-slate-900 text-white">
                <Archive className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          <div className="flex items-center justify-center">
            <span className="text-xs text-slate-500 bg-slate-200 px-4 py-1.5 rounded-full">
              28 August 2025
            </span>
          </div>

          <div className="flex flex-col items-end">
            <div className="max-w-md bg-slate-200 rounded-2xl px-4 py-3">
              <p className="text-sm text-slate-700">{email.body}</p>
            </div>
            <span className="text-xs text-slate-400 mt-1 mr-2">23:08</span>
          </div>

          {email.replies && email.replies.length > 0 && (
            <>
              <div className="flex flex-col items-start">
                <div className="max-w-md bg-indigo-100 rounded-2xl px-4 py-3">
                  <p className="text-sm text-slate-700">{email.replies[0].body}</p>
                </div>
                <span className="text-xs text-slate-400 mt-1 ml-2">23:08</span>
              </div>

              <div className="flex flex-col items-end">
                <div className="max-w-md bg-slate-200 rounded-2xl px-4 py-3">
                  <p className="text-sm text-slate-700">Yes, it's {email.email}</p>
                </div>
                <span className="text-xs text-slate-400 mt-1 mr-2">23:16</span>
              </div>

              <div className="flex flex-col items-start">
                <div className="max-w-md bg-indigo-100 rounded-2xl px-4 py-3">
                  <p className="text-sm text-slate-700">Thanks! Looks like your reset wasn't completed. I've sent you a new reset link - please check your inbox.</p>
                </div>
                <span className="text-xs text-slate-400 mt-1 ml-2">23:16</span>
              </div>

              <div className="flex flex-col items-end">
                <div className="max-w-md bg-slate-200 rounded-2xl px-4 py-3">
                  <p className="text-sm text-slate-700">I see it, resetting now...</p>
                </div>
                <span className="text-xs text-slate-400 mt-1 mr-2">23:17</span>
              </div>

              <div className="flex flex-col items-end">
                <div className="max-w-md bg-slate-200 rounded-2xl px-4 py-3">
                  <p className="text-sm text-slate-700">Done! I'm logged in. Thanks!</p>
                </div>
                <span className="text-xs text-slate-400 mt-1 mr-2">23:20</span>
              </div>

              <div className="flex flex-col items-start">
                <div className="max-w-md bg-indigo-100 rounded-2xl px-4 py-3">
                  <p className="text-sm text-slate-700">Perfect! 🎉 Your plan is ready under "My Programs". Since you're starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👉 www.Fit4Life.com/Premium</p>
                </div>
                <span className="text-xs text-slate-400 mt-1 ml-2">23:20</span>
              </div>

              <div className="flex flex-col items-end">
                <div className="max-w-md bg-slate-200 rounded-2xl px-4 py-3">
                  <p className="text-sm text-slate-700">Oh my god 😍 I'll try it ASAP, thank you so much!!</p>
                </div>
                <span className="text-xs text-slate-400 mt-1 mr-2">23:23</span>
              </div>
            </>
          )}

          {messages.map((message) => (
            <div key={message.id} className="flex flex-col items-end">
              <div className="max-w-md bg-slate-200 rounded-2xl px-4 py-3">
                <p className="text-sm text-slate-700">{message.text}</p>
              </div>
              <span className="text-xs text-slate-400 mt-1 mr-2">{message.timestamp}</span>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white p-4">
          <form onSubmit={handleSendMessage}>
            <div className="bg-slate-50 rounded-2xl px-4 py-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type something...."
                className="w-full bg-transparent border-0 text-sm focus:outline-none text-slate-900 placeholder-slate-300 mb-3"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button type="button" className="p-0 hover:opacity-70">
                    <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button type="button" className="p-0 hover:opacity-70">
                    <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button type="button" className="p-0 hover:opacity-70">
                    <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                  <button type="button" className="p-0 hover:opacity-70">
                    <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="15.5" cy="9.5" r="1.5"/>
                      <circle cx="8.5" cy="9.5" r="1.5"/>
                      <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                  </button>
                  <button type="button" className="p-0 hover:opacity-70">
                    <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" className="p-0 hover:opacity-70">
                    <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </button>
                  <button type="button" className="p-0 hover:opacity-70">
                    <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="w-80 bg-white rounded-[8px] overflow-y-auto shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Details</h3>
            <button className="p-1.5 hover:bg-slate-100 rounded">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div>
            <button className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-900">
              <span>Chat Data</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Assignee</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">
                    👤
                  </div>
                  <span className="text-slate-900 font-medium">James West</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Team</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs">
                    👥
                  </div>
                  <span className="text-slate-900 font-medium">Sales Team</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <button className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-900">
              <span>Contact Data</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="mt-3 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">First Name</span>
                <span className="text-slate-900 font-medium">Olivia</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Last Name</span>
                <span className="text-slate-900 font-medium">Mckinsey</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Phone number</span>
                <span className="text-slate-900 font-medium">+1 (312) 555-0134</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Email</span>
                <span className="text-slate-900 font-medium text-xs break-all">olivia.Mckinsey@gmail.com</span>
              </div>
              <button className="text-sm text-slate-900 font-medium hover:underline">
                See all
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <button className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-900">
              <span>Contact Labels</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1.5 bg-white text-blue-600 text-xs font-medium rounded-full border-2 border-blue-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Closed Won
              </span>
              <span className="px-3 py-1.5 bg-white text-blue-600 text-xs font-medium rounded-full border-2 border-blue-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Chicago
              </span>
              <button className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center hover:border-slate-400 text-slate-400 hover:text-slate-600">
                <span className="text-lg">+</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <button className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-900">
              <span>Notes</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="mt-3 space-y-2">
              <div className="p-3 bg-yellow-100 rounded-lg text-xs text-slate-600">
                Add a note
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <p className="text-xs text-slate-900 font-medium">Strong potential for future upgrades</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <button className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-900">
              <span>Other Chats</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="mt-3">
              <div className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">Fit4Life</h4>
                    <span className="text-xs text-slate-400">08/08/25</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">On my way!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
