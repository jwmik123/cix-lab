export default function Loading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="relative">
        <div className="aspect-[21/9] bg-gray-200 animate-pulse" />
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
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Project Info Skeleton */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-1/2" />
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                    </div>
                  </div>

                  {/* External Resources Skeleton */}
                  <div className="bg-red-50 rounded-lg p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-1/2" />
                    <div className="h-10 bg-gray-200 rounded animate-pulse w-32" />
                  </div>

                  {/* Team Members Skeleton */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-1/2" />
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-3/4" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                          </div>
                        </div>
                      ))}
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
