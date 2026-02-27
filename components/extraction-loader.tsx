'use client';

import { useEffect, useState } from 'react';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-auto px-4">
        {/* Animated background circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-80 h-80 rounded-full border-2 border-cyan-400/30 animate-pulse" />
          <div
            className="absolute w-96 h-96 rounded-full border-2 border-blue-500/20"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'none',
            }}
          />
        </div>

        {/* Main circular container with glowing effect */}
        <div className="relative flex flex-col items-center justify-center py-20">
          <div className="relative">
            {/* Outer glowing ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-600/20 blur-2xl" />

            {/* Main circle */}
            <div className="relative w-56 h-56 rounded-full border-4 border-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">
              {/* Inner glowing effect */}
              <div className="absolute inset-2 rounded-full border border-cyan-400/30 blur-sm" />

              {/* User avatars inside circle */}
              <div className="relative z-10 flex items-center justify-center">
                {selectedUsers.length > 0 ? (
                  <div className="flex -space-x-4">
                    {selectedUsers.map((user, idx) => (
                      <div
                        key={user.id}
                        className="relative w-16 h-16 rounded-full border-2 border-cyan-400 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg"
                        style={{
                          transform: `rotate(${(idx * 180) % 360}deg) translateY(-20px)`,
                        }}
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
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-blue-500"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: 'none',
                }}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="relative z-20 mt-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Extracting Information...</h2>
            <p className="text-slate-300 text-base max-w-md">
              We are extracting information from the above honey combs to your system
            </p>
          </div>

          {/* Animated dots */}
          <div className="relative z-20 mt-8 flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-cyan-400"
                style={{
                  animation: `pulse 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
