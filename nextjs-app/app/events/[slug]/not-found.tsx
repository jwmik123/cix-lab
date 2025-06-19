import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Event Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The event you&apos;re looking for doesn&apos;t exist or may have
            been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/events"
            className="inline-block bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium"
          >
            Back to Events
          </Link>
          <div>
            <Link
              href="/"
              className="text-red-700 hover:text-red-800 font-medium"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
