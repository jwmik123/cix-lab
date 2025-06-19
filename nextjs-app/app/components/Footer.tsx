import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Lab Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <p className="text-sm text-gray-300 mb-2">
                  University of Amsterdam
                </p>
                <h3 className="text-xl font-semibold mb-6">
                  Creative & Cultural Industries
                </h3>
              </div>
              <Image
                src="/cix-logo.svg"
                alt="CCI Lab Logo"
                width={195}
                height={80}
                className="h-16 w-auto"
              />
            </div>

            {/* References */}
            {/* <div>
              <h4 className="font-semibold text-lg mb-6">References</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/references"
                    className="text-gray-300 hover:text-white transition-colors underline"
                  >
                    Link to list of references
                  </Link>
                </li>
              </ul>
            </div> */}

            {/* Research */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Sitemap</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/research"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Research
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
                <li>
                  <Link
                    href="/people"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    People
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Contact</h4>

              <div className="text-sm text-gray-300">
                <p>
                  Dr. Monika Kackovic, <br /> CI/X: Lab Director
                </p>
                <Link href="mailto:m.kackovic@uva.nl">m.kackovic@uva.nl</Link>
                <p className="mt-4">Plantage Muidergracht 12</p>
                <p>Postbus 15953</p>
                <p>1001 NL, Amsterdam</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6">
          <p className="text-gray-400 text-sm text-center">
            © 2025 - Creative and Cultural Industries
          </p>
        </div>
      </div>
    </footer>
  );
}
