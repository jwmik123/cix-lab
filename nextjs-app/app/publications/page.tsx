import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/live";
import RedNavigationBar from "@/components/RedNavigationBar";
import HeroSection from "@/components/HeroSection";
import PublicationsGrid from "@/components/PublicationsGrid";

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

  // Extract unique years
  const years: number[] =
    allPublications
      ?.map((publication: any) => {
        return publication.publicationDate
          ? new Date(publication.publicationDate).getFullYear()
          : publication.publicationYear;
      })
      .filter((year: number | null): year is number => year !== null) || [];
  const availableYears: number[] = [...new Set(years)].sort(
    (a: number, b: number) => b - a
  );

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
      <RedNavigationBar currentPage="publications" />

      {/* Publications Grid with Filtering */}
      <Suspense
        fallback={
          <div className="text-center py-12">Loading publications...</div>
        }
      >
        <PublicationsGrid
          allPublications={allPublications || []}
          categories={uniqueCategories}
          years={availableYears}
        />
      </Suspense>
    </>
  );
}
