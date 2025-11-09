export default function Loading() {
  return (
    <div className="md:px-8 lg:px-16 xl:px-32 2xl:px-64 px-4 py-10 animate-pulse">
      <div className="h-6 w-40 bg-gray-200 rounded mb-8" />

      <div className="overflow-hidden rounded-md border">
        {/* Table Header */}
        <div className="bg-gray-50 border-b">
          <div className="grid grid-cols-8 gap-4 py-4 px-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-3 w-full bg-gray-200 rounded" />
            ))}
          </div>
        </div>

        {/* Table Rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-8 gap-4 py-4 px-3 border-b border-gray-100"
          >
            {Array.from({ length: 8 }).map((_, j) => (
              <div key={j} className="h-3 w-full bg-gray-200 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
