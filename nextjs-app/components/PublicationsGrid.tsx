"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import ContentFilter from "@/components/ContentFilter";

interface PublicationsGridProps {
  allPublications: any[];
  categories: string[];
  years: number[];
}

export default function PublicationsGrid({
  allPublications,
  categories,
  years,
}: PublicationsGridProps) {
  const [filteredPublications, setFilteredPublications] =
    useState<any[]>(allPublications);

  // Update filtered publications when allPublications changes
  useEffect(() => {
    setFilteredPublications(allPublications);
  }, [allPublications]);

  // Filter function
  const handleFilterChange = useCallback(
    (filters: { category: string; year: string }) => {
      let filtered = [...allPublications];

      // Filter by category
      if (filters.category !== "all") {
        filtered = filtered.filter((publication) =>
          publication.categories?.includes(filters.category)
        );
      }

      // Filter by year
      if (filters.year !== "all") {
        const targetYear = parseInt(filters.year);
        filtered = filtered.filter((publication) => {
          const publicationYear = publication.publicationDate
            ? new Date(publication.publicationDate).getFullYear()
            : publication.publicationYear;
          return publicationYear === targetYear;
        });
      }

      setFilteredPublications(filtered);
    },
    [allPublications]
  );

  return (
    <>
      {/* Filter Component */}
      <ContentFilter
        categories={categories}
        years={years}
        onFilterChange={handleFilterChange}
      />

      {/* Publications List Section */}
      <section className="bg-gray-50">
        <div className="">
          <div className="container mx-auto px-4 pb-16">
            {filteredPublications && filteredPublications.length > 0 ? (
              <div className="max-w-4xl mx-auto space-y-6">
                {filteredPublications.map((publication: any) => {
                  const publicationYear = publication.publicationDate
                    ? new Date(publication.publicationDate).getFullYear()
                    : publication.publicationYear;

                  return (
                    <article
                      key={publication._id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start justify-between">
                          <h2 className="font-raleway font-bold text-xl text-gray-900 leading-tight group-hover:text-red-700 transition-colors flex-1">
                            {publication.url ? (
                              <Link
                                href={publication.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-red-700 transition-colors"
                              >
                                {publication.title}
                              </Link>
                            ) : publication.slug?.current ? (
                              <Link
                                href={`/publications/${publication.slug.current}`}
                                className="hover:text-red-700 transition-colors"
                              >
                                {publication.title}
                              </Link>
                            ) : (
                              publication.title
                            )}
                          </h2>
                          {publicationYear && (
                            <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full ml-4">
                              {publicationYear}
                            </span>
                          )}
                        </div>

                        {/* Journal and DOI */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pt-3 border-t border-gray-100">
                          {publication.journal && (
                            <span className="font-medium">
                              {publication.journal}
                            </span>
                          )}
                          {publication.doi && (
                            <Link
                              href={`https://doi.org/${publication.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:text-red-800 underline font-medium"
                            >
                              DOI: {publication.doi}
                            </Link>
                          )}
                          {publication.categories &&
                            publication.categories.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {publication.categories.map(
                                  (category: string) => (
                                    <span
                                      key={category}
                                      className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium capitalize"
                                    >
                                      {category.replace("-", " ")}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No publications found matching the selected filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
