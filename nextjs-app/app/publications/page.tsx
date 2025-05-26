import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/live";
import RedNavigationBar from "@/components/RedNavigationBar";

// Query for all publications with optional category filtering
const publicationsQuery = `
  *[_type == "publication"] | order(publicationDate desc) {
    _id,
    title,
    slug,
    authors[]-> {
      name
    },
    journal,
    publicationYear,
    publicationDate,
    doi,
    url,
    categories
  }
`;

const categoriesQuery = `
  *[_type == "publication" && defined(categories)] {
    categories
  }
`;

export default async function PublicationsPage() {
  const { data: allPublications } = await sanityFetch({
    query: publicationsQuery,
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
      <section className="relative h-[50vh]">
        <div className="absolute inset-0">
          <Image
            src="/uva.jpeg"
            alt="UvA background"
            fill
            className="object-cover"
            style={{
              objectPosition: "center -200px",
              filter:
                "grayscale(100%) brightness(1.2) contrast(0.8) sepia(18%)",
            }}
            priority
          />
        </div>
      </section>

      {/* Red Navigation Bar */}
      <RedNavigationBar currentPage="publications" />

      {/* Publications List Section */}
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

          <div className="container mx-auto px-4 pb-16">
            <Suspense
              fallback={
                <div className="text-center">Loading publications...</div>
              }
            >
              {allPublications && allPublications.length > 0 ? (
                <div className="max-w-4xl mx-auto space-y-6">
                  {allPublications.map((publication: any) => {
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
                    No publications found.
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
