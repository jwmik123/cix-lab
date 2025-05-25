import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Lab Info */}
            <div className="lg:col-span-2">
              <Image
                src="/cix-logo.svg"
                alt="CCI Lab Logo"
                width={195}
                height={80}
                className="h-22 w-auto"
              />
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-raleway font-semibold text-lg mb-4">
                Research
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/research"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    All Research
                  </Link>
                </li>
                <li>
                  <Link
                    href="/publications"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Publications
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Projects
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-raleway font-semibold text-lg mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/people"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.uva.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    University of Amsterdam
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.uva.nl/en/about-the-uva/organisation/faculties/faculty-of-economics-and-business/faculty-of-economics-and-business.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Faculty of Economics and Business
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Creative and Cultural Industries Lab,
            University of Amsterdam. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://www.uva.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              UvA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
