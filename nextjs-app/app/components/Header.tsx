"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
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
                        : "text-gray-700 hover:text-red-700"
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
                        : "text-gray-700 hover:text-red-700"
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
                        : "text-gray-700 hover:text-red-700"
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
                        : "text-gray-700 hover:text-red-700"
                    }`}
                  >
                    People
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative z-60 w-8 h-8 flex flex-col justify-center items-center"
              aria-label="Toggle mobile menu"
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isHomepage ? "bg-white" : "bg-gray-700"
                } ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-0.5"
                    : "translate-y-0"
                }`}
              />
              <span
                className={`block w-6 h-0.5 mt-1 transition-all duration-300 ${
                  isHomepage ? "bg-white" : "bg-gray-700"
                } ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-0.5"
                    : "translate-y-0"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-red-600 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full text-white">
          {/* Close button area */}
          <div className="flex justify-end p-6">
            <button
              onClick={closeMobileMenu}
              className="w-8 h-8 flex flex-col justify-center items-center"
              aria-label="Close mobile menu"
            >
              <span className="block w-6 h-0.5 bg-white rotate-45 translate-y-0.5" />
              <span className="block w-6 h-0.5 bg-white -rotate-45 -translate-y-0.5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6">
            <ul className="space-y-8">
              <li>
                <Link
                  href="/research"
                  onClick={closeMobileMenu}
                  className="block text-2xl font-medium text-white hover:text-red-200 transition-colors duration-200"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/publications"
                  onClick={closeMobileMenu}
                  className="block text-2xl font-medium text-white hover:text-red-200 transition-colors duration-200"
                >
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  onClick={closeMobileMenu}
                  className="block text-2xl font-medium text-white hover:text-red-200 transition-colors duration-200"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/people"
                  onClick={closeMobileMenu}
                  className="block text-2xl font-medium text-white hover:text-red-200 transition-colors duration-200"
                >
                  People
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Information */}
          <div className="px-6 pb-8">
            <div className="border-t border-red-500 pt-8">
              <h4 className="font-semibold text-lg mb-4 text-white">Contact</h4>
              <div className="space-y-2 text-sm text-red-100">
                <p>Plantage Muidergracht 12</p>
                <p>Postbus 15953</p>
                <p>1001 NL, Amsterdam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
