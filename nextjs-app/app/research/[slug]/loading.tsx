export default function ResearchDetailLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="relative">
        <div className="aspect-[21/9] bg-gray-200 animate-pulse" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <div className="h-16 bg-white/20 rounded animate-pulse mb-4" />
              <div className="h-6 bg-white/20 rounded animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content Skeleton */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  {/* Publication Details */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    </div>
                  </div>

                  {/* Authors */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
