import Link from "next/link";

interface RedNavigationBarProps {
  currentPage: "research" | "projects" | "publications";
}

export default function RedNavigationBar({
  currentPage,
}: RedNavigationBarProps) {
  return (
    <section className="bg-red-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-10">
          <div className="flex items-center space-x-6 text-white">
            <Link
              href="/research"
              className={`hover:text-red-200 transition-colors ${
                currentPage === "research" ? "font-bold" : "font-light"
              }`}
            >
              Research
            </Link>
            <Link
              href="/projects"
              className={`hover:text-red-200 transition-colors ${
                currentPage === "projects" ? "font-bold" : "font-light"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/publications"
              className={`hover:text-red-200 transition-colors ${
                currentPage === "publications" ? "font-bold" : "font-light"
              }`}
            >
              Publications
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
