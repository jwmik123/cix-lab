import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import HeroSection from "@/components/HeroSection";
import RedNavigationBar from "@/components/RedNavigationBar";
import ResearchGrid from "@/components/ResearchGrid";

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

  // Extract unique years
  const years: number[] =
    allResearch
      ?.map((research: any) => {
        return research.publicationDate
          ? new Date(research.publicationDate).getFullYear()
          : null;
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
      <RedNavigationBar currentPage="research" />

      {/* Research Grid with Filtering */}
      <Suspense
        fallback={<div className="text-center py-12">Loading research...</div>}
      >
        <ResearchGrid
          allResearch={allResearch || []}
          categories={uniqueCategories}
          years={availableYears}
        />
      </Suspense>
    </>
  );
}
