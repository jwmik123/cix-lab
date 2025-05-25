import Link from "next/link";

export default function ResearchNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <h1 className="font-raleway font-bold text-4xl text-gray-900 mb-4">
          Research Not Found
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The research article you&apos;re looking for doesn&apos;t exist or may
          have been moved.
        </p>

        <div className="space-x-4">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 bg-primary-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
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
            Back to Research
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
