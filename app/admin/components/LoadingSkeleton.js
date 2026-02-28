export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="skeleton w-10 h-10 rounded-lg" />
        <div className="flex-1">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text w-3/4" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text w-5/6" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div className="skeleton w-10 h-10 rounded-lg" />
        <div className="skeleton w-4 h-4 rounded" />
      </div>
      <div className="skeleton w-20 h-8 mb-2" />
      <div className="skeleton skeleton-text w-24" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <div className="flex items-center gap-4">
        <div className="skeleton w-16 h-16 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton skeleton-title w-1/3" />
          <div className="skeleton skeleton-text w-2/3" />
          <div className="flex gap-2">
            <div className="skeleton w-16 h-6 rounded-full" />
            <div className="skeleton w-16 h-6 rounded-full" />
            <div className="skeleton w-16 h-6 rounded-full" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="skeleton w-20 h-8 rounded-md" />
          <div className="skeleton w-20 h-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="skeleton skeleton-title w-1/4 mb-6" />
        <div className="space-y-4">
          <div>
            <div className="skeleton skeleton-text w-20 mb-2" />
            <div className="skeleton h-10 rounded-md" />
          </div>
          <div>
            <div className="skeleton skeleton-text w-20 mb-2" />
            <div className="skeleton h-10 rounded-md" />
          </div>
          <div>
            <div className="skeleton skeleton-text w-20 mb-2" />
            <div className="skeleton h-32 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <div className="skeleton skeleton-title w-1/4 mb-2" />
        <div className="skeleton skeleton-text w-1/2" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <div>
        <div className="skeleton skeleton-title w-1/6 mb-4" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>

      <div>
        <div className="skeleton skeleton-title w-1/6 mb-4" />
        <div className="space-y-4">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </div>
      </div>
    </div>
  );
}
