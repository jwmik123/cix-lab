import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/live";
import { urlForImage } from "@/sanity/lib/utils";

// Query for all people
const peopleQuery = `
  *[_type == "person"] | order(name asc) {
    _id,
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
    },
    publishedAt
  }
`;

// Helper function to safely get image URL
function getImageUrl(image: any): string | null {
  if (!image?.asset) return null;

  // Try urlForImage first (like detail page)
  const urlForImageResult = urlForImage(image)?.width(400).height(400).url();
  if (urlForImageResult) return urlForImageResult;

  // Fallback to direct asset URL
  const directUrl = image.asset?.url;
  return typeof directUrl === "string" && directUrl.trim()
    ? directUrl.trim()
    : null;
}

export default async function PeoplePage() {
  const { data: allPeople } = await sanityFetch({
    query: peopleQuery,
  });

  // Filter people into regular team members and guests
  const regularPeopleUnsorted =
    allPeople?.filter(
      (person: any) => !person.role?.toLowerCase().includes("guest")
    ) || [];

  // Custom sorting: Monika - Wijnberg - Professors - Assistant Professors - Candidates
  const regularPeople = regularPeopleUnsorted.sort((a: any, b: any) => {
    const nameA = a.name?.toLowerCase() || "";
    const nameB = b.name?.toLowerCase() || "";
    const roleA = a.role?.toLowerCase() || "";
    const roleB = b.role?.toLowerCase() || "";

    // Helper function to get sort priority
    const getSortPriority = (name: string, role: string) => {
      if (name.includes("monika")) return 1;
      if (name.includes("wijnberg")) return 2;
      if (role.includes("professor") && !role.includes("assistant")) return 3;
      if (role.includes("assistant professor")) return 4;
      if (role.includes("candidate")) return 5;
      return 6; // Other roles
    };

    const priorityA = getSortPriority(nameA, roleA);
    const priorityB = getSortPriority(nameB, roleB);

    // If different priorities, sort by priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // Same priority, sort alphabetically by name
    return nameA.localeCompare(nameB);
  });

  const guests =
    allPeople?.filter((person: any) =>
      person.role?.toLowerCase().includes("guest")
    ) || [];

  return (
    <>
      {/* People Grid Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h1 className="font-raleway font-bold text-4xl sm:text-5xl text-gray-900 mb-12">
            Our People
          </h1>
          <Suspense
            fallback={
              <div className="text-center">Loading team members...</div>
            }
          >
            {regularPeople && regularPeople.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {regularPeople.map((person: any) => {
                  const imageUrl = getImageUrl(person.image);

                  return (
                    <Link
                      key={person._id}
                      href={`/people/${person.slug?.current}`}
                      className="group block"
                    >
                      <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-200">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={person.name || "Team member"}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                              <span className="text-2xl font-bold text-red-700">
                                {person.name ? person.name.charAt(0) : "?"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <h3 className="font-raleway font-semibold text-lg text-gray-900 group-hover:text-red-700 transition-colors">
                        {person.name}
                      </h3>
                      {person.role && (
                        <p className="text-gray-600 text-sm">{person.role}</p>
                      )}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No team members found.</p>
              </div>
            )}
          </Suspense>

          <h1 className="mt-16 font-raleway font-bold text-4xl sm:text-5xl text-gray-900 mb-12">
            Guests
          </h1>

          <Suspense
            fallback={<div className="text-center">Loading guests...</div>}
          >
            {guests && guests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {guests.map((person: any) => {
                  const imageUrl = getImageUrl(person.image);

                  return (
                    <Link
                      key={person._id}
                      href={`/people/${person.slug?.current}`}
                      className="group block"
                    >
                      <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-200">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={person.name || "Guest"}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                              <span className="text-2xl font-bold text-red-700">
                                {person.name ? person.name.charAt(0) : "?"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <h3 className="font-raleway font-semibold text-lg text-gray-900 group-hover:text-red-700 transition-colors">
                        {person.name}
                      </h3>
                      {person.role && (
                        <p className="text-gray-600 text-sm">{person.role}</p>
                      )}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No guests found.</p>
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </>
  );
}
