export default function Loading() {
  return (
    <>
      {/* Main Content Skeleton */}
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Profile Image Skeleton */}
              <div className="lg:col-span-1">
                <div className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
              </div>

              {/* Person Information Skeleton */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  {/* Name and Role Skeleton */}
                  <div>
                    <div className="h-12 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>

                  {/* Bio Skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  </div>

                  {/* Contact Links Skeleton */}
                  <div className="flex flex-wrap gap-4 pt-6">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
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
