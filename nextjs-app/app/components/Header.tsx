"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <header
      className={`absolute z-50 h-32 top-0 left-0 right-0 flex items-center ${
        isHomepage
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-lg border-b border-gray-100"
      }`}
    >
      <div className="container py-4 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-3" href="/">
            <div className="h-22 w-auto">
              <Image
                src="/cix-logo.svg"
                alt="CCI Lab Logo"
                width={195}
                height={80}
                className={`h-22 w-auto ${isHomepage ? "" : "brightness-100 invert"}`}
                priority
              />
            </div>
          </Link>

          <nav className="">
            <ul
              role="list"
              className="flex items-center gap-6 md:gap-8 leading-5 text-sm md:text-base tracking-tight font-medium"
            >
              <li>
                <Link
                  href="/research"
                  className={`transition-colors duration-200 ${
                    isHomepage
                      ? "text-white/90 hover:text-white"
                      : "text-gray-700 hover:text-primary-700"
                  }`}
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/publications"
                  className={`transition-colors duration-200 ${
                    isHomepage
                      ? "text-white/90 hover:text-white"
                      : "text-gray-700 hover:text-primary-700"
                  }`}
                >
                  Publications
                </Link>
              </li>

              <li>
                <Link
                  href="/projects"
                  className={`transition-colors duration-200 ${
                    isHomepage
                      ? "text-white/90 hover:text-white"
                      : "text-gray-700 hover:text-primary-700"
                  }`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/people"
                  className={`transition-colors duration-200 ${
                    isHomepage
                      ? "text-white/90 hover:text-white"
                      : "text-gray-700 hover:text-primary-700"
                  }`}
                >
                  People
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
