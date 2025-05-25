"use client";

import { usePathname } from "next/navigation";

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return <main className={isHomepage ? "" : "pt-20"}>{children}</main>;
}
