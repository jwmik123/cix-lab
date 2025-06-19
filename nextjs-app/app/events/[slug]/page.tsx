import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/live";
import { urlForImage } from "@/sanity/lib/utils";
import CustomPortableText from "@/app/components/PortableText";
import { client } from "@/sanity/lib/client";

// Query for individual event
const eventQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    image {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    date,
    location,
    isUpcoming
  }
`;

// Query for static generation
const eventSlugsQuery = `
  *[_type == "event" && defined(slug.current)]{"slug": slug.current}
`;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: event } = await sanityFetch({
    query: eventQuery,
    params: { slug },
  });

  if (!event) {
    notFound();
  }

  const imageUrl = event.image?.asset?.url
    ? urlForImage(event.image)?.width(1200).height(600).url()
    : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEventStatus = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();

    if (eventDate > now) {
      return "upcoming";
    } else if (eventDate < now) {
      return "past";
    } else {
      return "ongoing";
    }
  };

  const status = getEventStatus(event.date);
  const statusColor =
    status === "upcoming"
      ? "bg-green-100 text-green-800"
      : status === "ongoing"
        ? "bg-blue-100 text-blue-800"
        : "bg-gray-100 text-gray-800";

  return (
    <>
      {/* Hero Section with Image */}
      <section className="relative">
        {imageUrl ? (
          <div className="aspect-[21/9] relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={event.image?.alt || event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="bg-gray-100 py-16 lg:pt-24">
            <div className="container mx-auto px-4">
              <h1 className="font-raleway font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
                {event.title}
              </h1>
              {event.description && (
                <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
                  {event.description}
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
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
                  >
                    {status === "upcoming"
                      ? "Upcoming"
                      : status === "ongoing"
                        ? "Ongoing"
                        : "Past"}
                  </span>
                </div>
                <h1 className="font-raleway font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 leading-tight">
                  {event.title}
                </h1>
                {event.description && (
                  <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
                    {event.description}
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
                {/* Event Details */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-3 mt-1 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Date & Time
                        </h3>
                        <p className="text-gray-700">
                          {formatDate(event.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-3 mt-1 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Location
                        </h3>
                        <p className="text-gray-700">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                {event.content && (
                  <div className="prose prose-lg max-w-none mb-12">
                    <CustomPortableText value={event.content} />
                  </div>
                )}

                {/* Back to Events */}
                <div className="border-t border-gray-200 pt-8">
                  <Link
                    href="/events"
                    className="inline-flex items-center text-red-700 hover:text-red-800 font-medium"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Events
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-raleway font-semibold text-lg mb-4 text-gray-900">
                      Event Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          Status
                        </span>
                        <div className="mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
                          >
                            {status === "upcoming"
                              ? "Upcoming"
                              : status === "ongoing"
                                ? "Ongoing"
                                : "Past"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          Date
                        </span>
                        <p className="text-sm text-gray-900 mt-1">
                          {formatDate(event.date)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          Location
                        </span>
                        <p className="text-sm text-gray-900 mt-1">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const { data: event } = await sanityFetch({
    query: eventQuery,
    params: { slug },
  });

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export async function generateStaticParams() {
  const events = await client.fetch(eventSlugsQuery);

  return (
    events?.map((event: any) => ({
      slug: event.slug,
    })) || []
  );
}
