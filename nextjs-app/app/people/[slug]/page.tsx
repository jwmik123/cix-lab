import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/live";
import { urlForImage } from "@/sanity/lib/utils";
import CustomPortableText from "@/app/components/PortableText";
import { client } from "@/sanity/lib/client";

// Query for individual person
const personQuery = `
  *[_type == "person" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    role,
    bio,
    email,
    linkedin,
    twitter,
    website,
    uvaLink,
    department,
    featured
  }
`;

// Query for static generation
const personSlugsQuery = `
  *[_type == "person" && defined(slug.current)]{"slug": slug.current}
`;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PersonDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: person } = await sanityFetch({
    query: personQuery,
    params: { slug },
  });

  if (!person) {
    notFound();
  }

  const imageUrl = person.image?.asset?.url
    ? urlForImage(person.image)?.width(600).height(600).url()
    : null;

  // Debug logging for image issues
  console.log("=== People Page Image Debug ===");
  console.log("Person name:", person.name);
  console.log("Person image object:", person.image);
  console.log("Asset URL:", person.image?.asset?.url);
  console.log("Generated imageUrl:", imageUrl);
  console.log("==============================");

  // Try both approaches like in research page
  const directImageUrl = person.image?.asset?.url;
  const urlForImageResult = person.image?.asset
    ? urlForImage(person.image)?.width(320).height(320).url()
    : null;
  const finalImageUrl = directImageUrl || urlForImageResult;

  console.log("=== Alternative Image URLs ===");
  console.log("Direct image URL:", directImageUrl);
  console.log("urlForImage result:", urlForImageResult);
  console.log("Final image URL:", finalImageUrl);
  console.log("==============================");

  return (
    <>
      {/* Main Content */}
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Name, Role and Image Section */}
            <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
              {/* Profile Image */}
              <div className="w-80 h-80 flex-shrink-0">
                <div className="w-full h-full overflow-hidden bg-gray-200 rounded-lg">
                  {finalImageUrl ? (
                    <Image
                      src={finalImageUrl}
                      alt={person.image?.alt || person.name}
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-red-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-8xl font-bold">
                        {person.name
                          ? person.name.charAt(0).toUpperCase()
                          : "?"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Name and Role */}
              <div className="flex-1 ">
                <h1 className="font-raleway font-bold text-4xl lg:text-5xl text-gray-900 mb-4 leading-tight">
                  {person.name}
                </h1>
                {person.role && (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {person.role}
                  </p>
                )}
              </div>
            </div>

            {/* Bio - Full Width */}
            {person.bio && (
              <div className="w-full mb-8">
                <CustomPortableText
                  value={person.bio}
                  className="max-w-none prose-lg text-gray-700"
                />
              </div>
            )}

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4">
              {person.email && (
                <Link
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email
                </Link>
              )}

              {person.linkedin && (
                <Link
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  LinkedIn
                </Link>
              )}

              {person.website && (
                <Link
                  href={person.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Website
                </Link>
              )}

              {person.uvaLink && (
                <Link
                  href={person.uvaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  University of Amsterdam
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Back to People */}
      <section className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <Link
            href="/people"
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
            Back to People
          </Link>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const { data: person } = await sanityFetch({
    query: personQuery,
    params: { slug },
  });

  if (!person) {
    return {
      title: "Person Not Found",
    };
  }

  return {
    title: person.name,
    description: person.role,
  };
}

export async function generateStaticParams() {
  const people = await client.fetch(personSlugsQuery);

  return (
    people?.map((person: any) => ({
      slug: person.slug,
    })) || []
  );
}
