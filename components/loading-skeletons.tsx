'use client';

export function LoadingSkeletons() {
  return (
    <div className="space-y-4 w-full">
      {/* Email List Skeleton */}
      <div className="space-y-3 w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-slate-700/50" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-700/50 rounded w-32" />
              <div className="h-3 bg-slate-700/30 rounded w-full max-w-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse">
      <div className="space-y-2">
        <div className="h-8 bg-slate-700/50 rounded w-48" />
        <div className="h-4 bg-slate-700/30 rounded w-32" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-700/30 rounded w-full" />
        <div className="h-4 bg-slate-700/30 rounded w-full" />
        <div className="h-4 bg-slate-700/30 rounded w-3/4" />
      </div>
    </div>
  );
}
