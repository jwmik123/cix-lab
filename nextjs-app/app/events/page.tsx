import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/live";
import RedNavigationBar from "@/components/RedNavigationBar";
import HeroSection from "@/components/HeroSection";
import EventsGrid from "@/components/EventsGrid";

// Query for all events
const eventsQuery = `
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    description,
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

export default async function EventsPage() {
  const { data: allEvents } = await sanityFetch({
    query: eventsQuery,
  });

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents =
    allEvents?.filter((event: any) => {
      const eventDate = new Date(event.date);
      return eventDate >= now;
    }) || [];

  const pastEvents =
    allEvents?.filter((event: any) => {
      const eventDate = new Date(event.date);
      return eventDate < now;
    }) || [];

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
      <RedNavigationBar currentPage="events" />

      {/* Events Grid with Filtering */}
      <Suspense
        fallback={<div className="text-center py-12">Loading events...</div>}
      >
        <EventsGrid upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
      </Suspense>
    </>
  );
}
