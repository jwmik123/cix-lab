import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/live";
import { urlForImage } from "@/sanity/lib/utils";
import CustomPortableText from "@/app/components/PortableText";
import { client } from "@/sanity/lib/client";

// Query for individual project item
const projectQuery = `
  *[_type == "project" && slug.current == $slug][0] {
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
    bodyText,
    url,
    authors[]-> {
      name,
      slug,
      role,
      image {
        asset-> {
          _id,
          url
        },
        alt,
        hotspot,
        crop
      }
    },
    publicationDate,
    categories,
    status,
    featured
  }
`;

// Query for static generation
const projectSlugsQuery = `
  *[_type == "project" && defined(slug.current)]{"slug": slug.current}
`;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: project } = await sanityFetch({
    query: projectQuery,
    params: { slug },
  });

  if (!project) {
    notFound();
  }

  const imageUrl = project.thumbnail?.asset?.url
    ? urlForImage(project.thumbnail)?.width(1200).height(600).url()
    : null;

  const publicationYear = project.publicationDate
    ? new Date(project.publicationDate).getFullYear()
    : null;

  const publicationDate = project.publicationDate
    ? new Date(project.publicationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

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
      {/* Hero Section with Image */}
      <section className="relative">
        {imageUrl ? (
          <div className="aspect-[21/9] relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={project.thumbnail?.alt || project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="bg-gray-100 py-16 lg:pt-24">
            <div className="container mx-auto px-4">
              <h1 className="font-raleway font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
                {project.title}
              </h1>
              {project.description && (
                <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Title overlay for when image exists */}
        {imageUrl && (
          <div className="bg-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <h1 className="font-raleway font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 leading-tight">
                  {project.title}
                </h1>
                {project.description && (
                  <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Publication Date */}
                {publicationDate && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 font-medium">
                      Project Date: {publicationDate}
                    </p>
                  </div>
                )}

                {/* Authors as text */}
                {project.authors && project.authors.length > 0 && (
                  <div className="mb-8">
                    <p className="text-gray-700">
                      <span className="font-medium">Team Members: </span>
                      {project.authors
                        .map((author: any) => author.name)
                        .join(", ")}
                    </p>
                  </div>
                )}

                {/* Body Text */}
                {project.bodyText && (
                  <div className="prose prose-lg max-w-none mb-12">
                    <CustomPortableText value={project.bodyText} />
                  </div>
                )}

                {/* Authors with Profile Pictures */}
                {project.authors && project.authors.length > 0 && (
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="font-raleway font-semibold text-lg mb-6 text-gray-900">
                      About the Team
                    </h3>
                    <div className="space-y-6">
                      {project.authors.map((author: any, index: number) => {
                        // Try direct URL first
                        const directImageUrl = author.image?.asset?.url;

                        // Try urlForImage approach
                        const urlForImageResult = author.image?.asset
                          ? urlForImage(author.image)
                              ?.width(96)
                              .height(96)
                              .url()
                          : null;

                        // Use direct URL first, fallback to urlForImage
                        const finalImageUrl =
                          directImageUrl || urlForImageResult;

                        console.log("=== Project Author Debug ===");
                        console.log("Author name:", author.name);
                        console.log("Full author object:", author);
                        console.log("Direct image URL:", directImageUrl);
                        console.log("urlForImage result:", urlForImageResult);
                        console.log("Final image URL:", finalImageUrl);
                        console.log("============================");

                        return (
                          <div
                            key={index}
                            className="flex items-start space-x-4"
                          >
                            <Link
                              href={`/people/${author.slug?.current}`}
                              className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 font-semibold flex-shrink-0 hover:ring-2 hover:ring-red-500 transition-all duration-200"
                            >
                              {finalImageUrl ? (
                                <Image
                                  src={finalImageUrl}
                                  alt={author.name || "Team member"}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-lg">
                                  {author.name
                                    ? author.name.charAt(0).toUpperCase()
                                    : "?"}
                                </span>
                              )}
                            </Link>
                            <div>
                              <Link
                                href={`/people/${author.slug?.current}`}
                                className="hover:text-red-600 transition-colors"
                              >
                                <h4 className="font-medium text-gray-900 text-lg">
                                  {author.name}
                                </h4>
                              </Link>
                              {author.role && (
                                <p className="text-gray-600 mt-1">
                                  {author.role}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Project Info */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-raleway font-semibold text-lg mb-4 text-gray-900">
                      Project Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      {project.status && (
                        <div>
                          <span className="font-medium text-gray-600">
                            Status:
                          </span>
                          <span
                            className={`ml-2 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(project.status)}`}
                          >
                            {project.status}
                          </span>
                        </div>
                      )}
                      {publicationYear && (
                        <div>
                          <span className="font-medium text-gray-600">
                            Year:
                          </span>
                          <span className="ml-2 text-gray-900">
                            {publicationYear}
                          </span>
                        </div>
                      )}
                      {project.categories && project.categories.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-600">
                            Categories:
                          </span>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {project.categories.map((category: string) => (
                              <span
                                key={category}
                                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium capitalize"
                              >
                                {category.replace("-", " ")}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Link */}
                  {project.url && (
                    <div className="bg-red-50 rounded-lg p-6">
                      <h3 className="font-raleway font-semibold text-lg mb-4 text-gray-900">
                        External Resources
                      </h3>
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        <span>View Project</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Back to Projects */}
      <section className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            <svg
              className="w-4 h-4"
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
            Back to Projects
          </Link>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const { data: project } = await sanityFetch({
    query: projectQuery,
    params: { slug },
  });

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const projects = await client.fetch(projectSlugsQuery);

  return (
    projects?.map((project: any) => ({
      slug: project.slug,
    })) || []
  );
}
