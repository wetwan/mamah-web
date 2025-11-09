export default function Loading() {
  return (
    <div className="min-h-screen font-sans animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="w-full py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:px-32 2xl:px-64 px-4">
        <div className="h-4 w-40 bg-gray-200 rounded"></div>
      </div>

      <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">

        {/* Header Skeleton */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-3 w-40 bg-gray-200 rounded"></div>
            <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Timeline Skeleton */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-gray-300"></div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  <div className="h-3 w-36 bg-gray-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Sections */}
          <div className="lg:col-span-2 space-y-8">
            {/* Financial Summary Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded"></div>
              ))}
            </div>

            {/* Shipping Details Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-3 w-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Items List Skeleton */}
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-3 w-24 bg-gray-100 rounded"></div>
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
