"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/portfolio", label: "Work" },
  { href: "/gear", label: "Gears" },
  { href: "/contact", label: "Get In Touch" },
];

export function PhotographerNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/60 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Tuned Frames — Home"
        >
          {/* Keep a fixed-height logo box so the image fills the nav height without changing layout */}
          <span className="relative block h-10 w-auto md:h-12">
            {/* Light theme logo */}
            <Image
              src="/logo-black.png"
              alt="Tuned Frames"
              width={280}            // large intrinsic width to keep crisp
              height={64}
              priority
              className="block h-full w-auto dark:hidden"
            />
            {/* Dark theme logo */}
            <Image
              src="/logo.png"
              alt="Tuned Frames"
              width={280}
              height={64}
              priority
              className="hidden h-full w-auto dark:block"
            />
          </span>
          <span className="sr-only">Tuned Frames</span>
        </Link>

        <nav aria-label="Main" className="hidden gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              mounted && (pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`)));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-slate-900 dark:hover:text-neutral-100",
                  isActive
                    ? "text-slate-900 dark:text-neutral-50"
                    : "text-slate-500 dark:text-neutral-400"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 md:inline-flex"
          >
            Let’s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
