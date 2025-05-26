import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/live";
import { urlForImage } from "@/sanity/lib/utils";
import HeroSection from "@/components/HeroSection";
import RedNavigationBar from "@/components/RedNavigationBar";

// Query for all research with optional category filtering
const researchQuery = `
  *[_type == "research"] | order(publicationDate desc) {
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
    categories,
    authors[]-> {
      name,
      image
    },
    publicationDate
  }
`;

const categoriesQuery = `
  *[_type == "research" && defined(categories)] {
    categories
  }
`;

export default async function ResearchPage() {
  const { data: allResearch } = await sanityFetch({
    query: researchQuery,
  });

  const { data: categoryData } = await sanityFetch({
    query: categoriesQuery,
  });

  // Extract unique categories
  const allCategories =
    categoryData?.flatMap((item: any) => item.categories || []) || [];
  const filteredCategories = allCategories.filter(
    (cat: unknown): cat is string => typeof cat === "string"
  );
  const uniqueCategories = [...new Set(filteredCategories)] as string[];

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        objectPosition={{
          mobile: "center 0",
          desktop: "center -200px",
        }}
      />

      {/* Red Navigation Bar */}
      <RedNavigationBar currentPage="research" />

      {/* Research Grid Section */}
      <section className="bg-gray-50">
        <div className="">
          {/* Category Filter */}
          {uniqueCategories.length > 0 && (
            <div className="py-12">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300 transition-colors">
                    All Categories
                  </button>
                  {uniqueCategories.map((category: string) => (
                    <button
                      key={category}
                      className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300 transition-colors capitalize"
                    >
                      {category.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Suspense
            fallback={<div className="text-center">Loading research...</div>}
          >
            {allResearch && allResearch.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {allResearch.map((research: any) => {
                  const imageUrl = research.thumbnail?.asset?.url || null;

                  // Also try urlForImage approach
                  const urlForImageResult = research.thumbnail?.asset
                    ? urlForImage(research.thumbnail)
                        ?.width(600)
                        .height(400)
                        .url()
                    : null;

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
                        <h3 className="font-raleway font-bold text-xl mb-3 text-gray-900 group-hover:text-red-700 transition-colors leading-tight">
                          {research.title}
                        </h3>
                        <div className="flex items-center justify-between mb-3">
                          {publicationYear && (
                            <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                              {publicationYear}
                            </span>
                          )}
                        </div>
                        {research.summary && (
                          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {research.summary}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No research found.</p>
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </>
  );
}
