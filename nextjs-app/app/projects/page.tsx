import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/live";
import RedNavigationBar from "@/components/RedNavigationBar";
import HeroSection from "@/components/HeroSection";
import ProjectsGrid from "@/components/ProjectsGrid";

// Query for all projects with optional category filtering
const projectsQuery = `
  *[_type == "project"] | order(publicationDate desc) {
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
    description,
    categories,
    status,
    authors[]-> {
      name,
      image
    },
    publicationDate,
    url
  }
`;

const categoriesQuery = `
  *[_type == "project" && defined(categories)] {
    categories
  }
`;

export default async function ProjectsPage() {
  const { data: allProjects } = await sanityFetch({
    query: projectsQuery,
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
    allProjects
      ?.map((project: any) => {
        return project.publicationDate
          ? new Date(project.publicationDate).getFullYear()
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
      <RedNavigationBar currentPage="projects" />

      {/* Projects Grid with Filtering */}
      <Suspense
        fallback={<div className="text-center py-12">Loading projects...</div>}
      >
        <ProjectsGrid
          allProjects={allProjects || []}
          categories={uniqueCategories}
          years={availableYears}
        />
      </Suspense>
    </>
  );
}
