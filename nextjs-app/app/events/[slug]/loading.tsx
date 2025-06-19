export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="aspect-[21/9] bg-gray-200"></div>

      {/* Title Section Skeleton */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-gray-200 rounded-lg p-6 mb-8 h-32"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-200 rounded-lg p-6 h-64"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
