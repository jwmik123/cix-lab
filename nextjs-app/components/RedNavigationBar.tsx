import Link from "next/link";

interface RedNavigationBarProps {
  currentPage: "research" | "projects" | "publications" | "events";
}

export default function RedNavigationBar({
  currentPage,
}: RedNavigationBarProps) {
  const getPageTitle = (page: string) => {
    switch (page) {
      case "research":
        return "Research";
      case "projects":
        return "Projects";
      case "publications":
        return "Publications";
      case "events":
        return "Events";
      default:
        return "";
    }
  };

  return (
    <section
      className="bg-red-700 min-h-[80px] border-4 border-yellow-400"
      style={{ backgroundColor: "#b91c1c" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-8">
          <h1 className="text-4xl font-raleway font-bold text-white">
            {getPageTitle(currentPage)}
          </h1>
          {/* <div className="flex items-center gap-12 text-white">
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
          </div> */}
        </div>
      </div>
    </section>
  );
}
