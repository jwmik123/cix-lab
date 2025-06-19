"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
    hotspot: any;
    crop: any;
  };
  date: string;
  location: string;
  isUpcoming: boolean;
}

interface EventsGridProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export default function EventsGrid({
  upcomingEvents,
  pastEvents,
}: EventsGridProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

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

  const renderEventCard = (event: Event) => {
    const imageUrl = event.image?.asset?.url
      ? urlForImage(event.image)?.width(400).height(300).url()
      : null;

    const status = getEventStatus(event.date);
    const statusColor =
      status === "upcoming"
        ? "bg-green-100 text-green-800"
        : status === "ongoing"
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800";

    return (
      <div
        key={event._id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <Link href={`/events/${event.slug.current}`}>
          <div className="aspect-[4/3] relative overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={event.image?.alt || event.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <div className="absolute top-4 right-4">
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
          <div className="p-6">
            <h3 className="font-raleway font-semibold text-xl text-gray-900 mb-2 line-clamp-2">
              {event.title}
            </h3>
            <p className="text-gray-600 mb-3 line-clamp-3">
              {event.description}
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(event.date)}
              </div>
              <div className="flex items-center">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {event.location}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === "upcoming"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === "past"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === "upcoming" ? (
            upcomingEvents.length > 0 ? (
              upcomingEvents.map(renderEventCard)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  No upcoming events scheduled.
                </p>
              </div>
            )
          ) : pastEvents.length > 0 ? (
            pastEvents.map(renderEventCard)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No past events found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
