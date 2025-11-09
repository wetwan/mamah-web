export default function Loading() {
  return (
    <section className="w-full p-4">
      {/* Top bar skeleton */}

      <div className="flex mt-10 gap-6">
        {/* Left Sidebar Skeleton */}
        <div className="lg:w-[250px] w-full space-y-8 animate-pulse">
          {/* Category */}
          <div className="p-5 border shadow rounded space-y-4">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="space-y-3">
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
            </div>
          </div>

          {/* Price */}
          <div className="p-5 border shadow rounded space-y-4">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="space-y-3">
              <div className="h-10 w-32 bg-gray-200 rounded-full" />
              <div className="h-10 w-32 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>

        {/* Product grid skeleton */}
        <div className="w-full p-4">
          {" "}
          <div className="flex justify-between items-center lg:flex-row flex-col gap-4">
            <div>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-48 mt-2 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="flex gap-4">
              <div className="h-9 w-[200px] bg-gray-200 rounded animate-pulse" />
              <div className="h-9 w-[200px] bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-md p-4 flex flex-col gap-3 animate-pulse"
              >
                <div className="aspect-square bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-6 w-full bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
