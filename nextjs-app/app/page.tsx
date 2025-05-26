import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/live";
import { urlForImage } from "@/sanity/lib/utils";

// Queries for CCI Lab content
const featuredResearchQuery = `
  *[_type == "research" && featured == true] | order(publicationDate desc)[0...12] {
    _id,
    title,
    slug,
    thumbnail {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    summary,
    authors[]-> {
      name,
      image
    },
    publicationDate
  }
`;

export default async function HomePage() {
  const { data: featuredResearch } = await sanityFetch({
    query: featuredResearchQuery,
  });

  // Debug the entire response
  console.log(
    "Full featuredResearch data:",
    JSON.stringify(featuredResearch, null, 2)
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center  overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/header-loop.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative container z-10 text-left text-white px-4">
          <div className="">
            <p className="font-raleway text-lg mb-4 text-white/80">
              University of Amsterdam
            </p>
            <h1 className="font-raleway font-medium text-5xl sm:text-6xl md:text-7xl  mb-8 leading-tight">
              Creative and Cultural
              <br />
              Industries
            </h1>
            <div className="max-w-2xl mb-10">
              <p className="text-lg sm:text-xl leading-relaxed text-white/90">
                The CI/X: Lab is an interdisciplinary research lab that welcomes
                academics, students, and industry professionals to collaborate
                on research projects and business initiatives that focus on the
                creative and cultural industries from a business-science
                perspective.
              </p>
            </div>
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 bg-red-600 text-white font-raleway font-semibold px-8 py-4 rounded text-lg hover:bg-red-700 transition-colors duration-300"
            >
              Research
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div></div> {/* Empty left column on desktop */}
            <div>
              <h2 className="font-raleway font-bold text-2xl mb-8 text-gray-900">
                Our Mission
              </h2>
              <div className="prose prose-xl max-w-none">
                <p className="text-gray-700 text-xl leading-relaxed">
                  To advance knowledge and sustainable practices in
                  entrepreneurship, innovation, and other business disciplines
                  in the highly competitive and dynamic fields of the arts,
                  fashion, design, as well as entertainment industries like
                  music, film, gaming, publishing, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research Section */}
      <section className="bg-gray-50">
        <div className="">
          {/* Debug information */}
          {featuredResearch && featuredResearch.length === 0 && (
            <div className="text-center p-8 bg-yellow-50 border border-yellow-200 mb-8">
              <p className="text-yellow-800">
                No featured research found. Make sure you have research items
                marked as &quot;featured&quot; in Sanity.
              </p>
            </div>
          )}

          <Suspense
            fallback={<div className="text-center">Loading research...</div>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {featuredResearch?.map((research: any, index: number) => {
                // Debug each research item
                console.log(`Research ${index}:`, research);
                console.log(`Research ${index} thumbnail:`, research.thumbnail);
                console.log(
                  `Research ${index} thumbnail asset:`,
                  research.thumbnail?.asset
                );

                const imageUrl = research.thumbnail?.asset?.url || null;

                // Also try urlForImage approach
                const urlForImageResult = research.thumbnail?.asset
                  ? urlForImage(research.thumbnail)
                      ?.width(600)
                      .height(400)
                      .url()
                  : null;

                console.log(`Research ${index} direct URL:`, imageUrl);
                console.log(
                  `Research ${index} urlForImage URL:`,
                  urlForImageResult
                );

                const publicationYear = research.publicationDate
                  ? new Date(research.publicationDate).getFullYear()
                  : null;

                // Use direct URL first, fallback to urlForImage
                const finalImageUrl = imageUrl || urlForImageResult;

                return (
                  <Link
                    key={research._id}
                    href={`/research/${research.slug?.current}`}
                    className="group block bg-white overflow-hidden transition-all duration-300"
                  >
                    {/* Always show image container */}
                    <div className="aspect-[3/2] overflow-hidden bg-gray-100 relative">
                      {finalImageUrl ? (
                        <>
                          <Image
                            src={finalImageUrl}
                            alt={research.thumbnail?.alt || research.title}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full bg-red-500 flex items-center justify-center">
                          <div className="text-center bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg">
                            <svg
                              className="w-16 h-16 text-white mx-auto mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-sm font-medium">No Image</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-raleway font-bold text-xl mb-2 text-gray-900 group-hover:text-red-700 transition-colors leading-tight">
                        {research.title}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        {publicationYear && (
                          <span className="text-sm font-medium text-red-600 ">
                            {publicationYear}
                          </span>
                        )}
                      </div>
                      {research.summary && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                          {research.summary}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Suspense>

          <div className="text-center p-8">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 bg-red-600 text-white font-raleway font-semibold px-8 py-4 rounded-lg hover:bg-red-700 transition-colors duration-300 "
            >
              View All Research
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
