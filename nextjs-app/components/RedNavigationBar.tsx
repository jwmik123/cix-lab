import Link from "next/link";

interface RedNavigationBarProps {
  currentPage: "research" | "projects" | "publications";
}

export default function RedNavigationBar({
  currentPage,
}: RedNavigationBarProps) {
  return (
    <section
      className="bg-red-700 min-h-[80px] border-4 border-yellow-400"
      style={{ backgroundColor: "#b91c1c" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-8">
          <div className="flex items-center gap-12 text-white">
            <Link
              href="/research"
              className={`hover:text-red-200 transition-colors text-lg mx-4 ${
                currentPage === "research" ? "font-bold" : "font-light"
              }`}
            >
              Research
            </Link>
            <Link
              href="/projects"
              className={`hover:text-red-200 transition-colors text-lg mx-4 ${
                currentPage === "projects" ? "font-bold" : "font-light"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/publications"
              className={`hover:text-red-200 transition-colors text-lg mx-4 ${
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
