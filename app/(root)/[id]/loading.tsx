const Loading = () => {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="w-full py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64 px-4">
        <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
      </div>

      {/* Main content layout */}
      <div className="md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 flex flex-col lg:flex-row gap-10 my-20">
        
        {/* Image skeleton */}
        <div className="lg:w-1/2 w-full">
          <div className="h-[500px] w-full bg-gray-200 rounded-md"></div>
          <div className="flex gap-3 mt-6">
            <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Right section skeleton */}
        <div className="lg:w-1/2 w-full flex flex-col gap-6">
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>

          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
          </div>

          <div className="h-8 w-1/3 bg-gray-300 rounded-md"></div>

          <div className="h-12 w-40 bg-gray-300 rounded-full mt-6"></div>
        </div>
      </div>

      {/* Related products skeleton */}
      <div className="my-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <div className="h-8 w-48 bg-gray-200 mx-auto mb-10 rounded"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="space-y-4">
              <div className="h-56 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
