import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/live";
import { urlForImage } from "@/sanity/lib/utils";
import CustomPortableText from "@/app/components/PortableText";
import { client } from "@/sanity/lib/client";

// Query for individual research item
const researchQuery = `
  *[_type == "research" && slug.current == $slug][0] {
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
    featured
  }
`;

// Query for static generation
const researchSlugsQuery = `
  *[_type == "research" && defined(slug.current)]{"slug": slug.current}
`;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: research } = await sanityFetch({
    query: researchQuery,
    params: { slug },
  });

  if (!research) {
    notFound();
  }

  const imageUrl = research.thumbnail?.asset?.url
    ? urlForImage(research.thumbnail)?.width(1200).height(600).url()
    : null;

  const publicationYear = research.publicationDate
    ? new Date(research.publicationDate).getFullYear()
    : null;

  const publicationDate = research.publicationDate
    ? new Date(research.publicationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      {/* Main Content */}
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-7xl mx-auto">
            <h1 className="font-raleway font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
              {research.title}
            </h1>

            {/* Publication Date */}
            {publicationDate && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 font-medium">
                  Published: {publicationYear}
                </p>
              </div>
            )}

            {/* Authors as text */}
            {research.authors && research.authors.length > 0 && (
              <div className="mb-8">
                <p className="text-gray-700">
                  <span className="font-medium">Authors: </span>
                  {research.authors
                    .map((author: any) => author.name)
                    .join(", ")}
                </p>
              </div>
            )}

            {/* Body Text */}
            {research.bodyText && (
              <div className="prose prose-lg max-w-none mb-12">
                <CustomPortableText value={research.bodyText} />
              </div>
            )}

            {research.url && (
              <Link
                href={research.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white font-medium px-4 py-2 rounded-lg mb-6 hover:bg-red-700 transition-colors duration-200"
              >
                <span>View Publication</span>
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
            )}

            {/* Authors with Profile Pictures */}
            {research.authors && research.authors.length > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="font-raleway font-semibold text-lg mb-6 text-gray-900">
                  Related people
                </h3>
                <div className="space-y-6">
                  {research.authors.map((author: any, index: number) => {
                    // Try direct URL first
                    const directImageUrl = author.image?.asset?.url;

                    // Try urlForImage approach
                    const urlForImageResult = author.image?.asset
                      ? urlForImage(author.image)?.width(96).height(96).url()
                      : null;

                    // Use direct URL first, fallback to urlForImage
                    const finalImageUrl = directImageUrl || urlForImageResult;

                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <Link
                          href={`/people/${author.slug?.current}`}
                          className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 font-semibold flex-shrink-0 hover:ring-2 hover:ring-red-500 transition-all duration-200"
                        >
                          {finalImageUrl ? (
                            <Image
                              src={finalImageUrl}
                              alt={author.name || "Author"}
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
                            <p className="text-gray-600 mt-1">{author.role}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Back to Research */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Research
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const { data: research } = await sanityFetch({
    query: researchQuery,
    params: { slug },
    // Metadata should never contain stega
    stega: false,
  });

  if (!research) {
    return {
      title: "Research Not Found",
    };
  }

  return {
    title: research.title,
    description: research.summary,
    openGraph: {
      title: research.title,
      description: research.summary,
      type: "article",
      ...(research.thumbnail?.asset?.url && {
        images: [
          {
            url: urlForImage(research.thumbnail)?.width(1200).height(630).url(),
            width: 1200,
            height: 630,
            alt: research.thumbnail?.alt || research.title,
          },
        ],
      }),
    },
  };
}

// Generate static params for build optimization
export async function generateStaticParams() {
  const data = await client.fetch(researchSlugsQuery);

  return data || [];
}
