"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import ContentFilter from "@/components/ContentFilter";

interface ProjectsGridProps {
  allProjects: any[];
  categories: string[];
  years: number[];
}

export default function ProjectsGrid({
  allProjects,
  categories,
  years,
}: ProjectsGridProps) {
  const [filteredProjects, setFilteredProjects] = useState<any[]>(allProjects);

  // Update filtered projects when allProjects changes
  useEffect(() => {
    setFilteredProjects(allProjects);
  }, [allProjects]);

  // Filter function
  const handleFilterChange = useCallback(
    (filters: { category: string; year: string }) => {
      let filtered = [...allProjects];

      // Filter by category
      if (filters.category !== "all") {
        filtered = filtered.filter((project) =>
          project.categories?.includes(filters.category)
        );
      }

      // Filter by year
      if (filters.year !== "all") {
        const targetYear = parseInt(filters.year);
        filtered = filtered.filter((project) => {
          if (!project.publicationDate) return false;
          const projectYear = new Date(project.publicationDate).getFullYear();
          return projectYear === targetYear;
        });
      }

      setFilteredProjects(filtered);
    },
    [allProjects]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-red-100 text-red-800";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Filter Component */}
      <ContentFilter
        categories={categories}
        years={years}
        onFilterChange={handleFilterChange}
      />

      {/* Projects Grid Section */}
      <section className="bg-gray-50">
        <div className="">
          {filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {filteredProjects.map((project: any) => {
                const imageUrl = project.thumbnail?.asset?.url || null;

                // Also try urlForImage approach
                const urlForImageResult = project.thumbnail?.asset
                  ? urlForImage(project.thumbnail)?.width(600).height(400).url()
                  : null;

                const publicationYear = project.publicationDate
                  ? new Date(project.publicationDate).getFullYear()
                  : null;

                // Use direct URL first, fallback to urlForImage
                const finalImageUrl = imageUrl || urlForImageResult;

                return (
                  <Link
                    key={project._id}
                    href={project.url || `/projects/${project.slug?.current}`}
                    target={project.url ? "_blank" : undefined}
                    rel={project.url ? "noopener noreferrer" : undefined}
                    className="group block bg-white overflow-hidden transition-all duration-300"
                  >
                    {/* Always show image container */}
                    <div className="aspect-[3/2] overflow-hidden bg-gray-100 relative">
                      {finalImageUrl ? (
                        <>
                          <Image
                            src={finalImageUrl}
                            alt={project.thumbnail?.alt || project.title}
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
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-sm font-medium">No Image</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-raleway font-bold text-xl text-gray-900 group-hover:text-red-700 transition-colors leading-tight flex-1">
                          {project.title}
                        </h3>
                        {project.status && (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full capitalize ml-3 ${getStatusColor(project.status)}`}
                          >
                            {project.status}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        {publicationYear && (
                          <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                            {publicationYear}
                          </span>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                          {project.description}
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
                No projects found matching the selected filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
