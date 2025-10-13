export const ShopSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-20 animate-pulse">
    <div className="lg:w-[250px] w-full p-4 space-y-10">
      <div className="p-5 border shadow rounded w-full space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="p-5 border shadow rounded w-full space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded-full w-full"></div>
        <div className="h-10 bg-gray-200 rounded-full w-full"></div>
      </div>
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded w-48"></div>
          <div className="h-10 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
