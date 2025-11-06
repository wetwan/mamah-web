export const ShopSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-20 animate-pulse ease-in-out">
    <div className="w-full p-4 space-y-10">
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
      <div className="grid w-full
       grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="animate-pulse shadow-2xl pb-10">
            <div className="w-full h-[350px] bg-gray-200"></div>
            <div className="p-4 text-center">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto my-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto my-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto my-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
