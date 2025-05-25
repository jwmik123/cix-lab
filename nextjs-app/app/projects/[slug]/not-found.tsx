import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>
          <h1 className="font-raleway font-bold text-3xl text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The project you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-red-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </Link>
          <div>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
