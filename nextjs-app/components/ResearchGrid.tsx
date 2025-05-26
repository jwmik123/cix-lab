"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import ResearchFilter from "@/components/ResearchFilter";

interface ResearchGridProps {
  allResearch: any[];
  categories: string[];
  years: number[];
}

export default function ResearchGrid({
  allResearch,
  categories,
  years,
}: ResearchGridProps) {
  const [filteredResearch, setFilteredResearch] = useState<any[]>(allResearch);

  // Update filtered research when allResearch changes
  useEffect(() => {
    setFilteredResearch(allResearch);
  }, [allResearch]);

  // Filter function
  const handleFilterChange = useCallback(
    (filters: { category: string; year: string }) => {
      let filtered = [...allResearch];

      // Filter by category
      if (filters.category !== "all") {
        filtered = filtered.filter((research) =>
          research.categories?.includes(filters.category)
        );
      }

      // Filter by year
      if (filters.year !== "all") {
        const targetYear = parseInt(filters.year);
        filtered = filtered.filter((research) => {
          if (!research.publicationDate) return false;
          const researchYear = new Date(research.publicationDate).getFullYear();
          return researchYear === targetYear;
        });
      }

      setFilteredResearch(filtered);
    },
    [allResearch]
  );

  return (
    <>
      {/* Filter Component */}
      <ResearchFilter
        categories={categories}
        years={years}
        onFilterChange={handleFilterChange}
      />

      {/* Research Grid Section */}
      <section className="bg-gray-50">
        <div className="">
          {filteredResearch && filteredResearch.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {filteredResearch.map((research: any) => {
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
              <p className="text-gray-600 text-lg">
                No research found matching the selected filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
