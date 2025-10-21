"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/60 dark:bg-neutral-950/80">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Tuned Frames — Home"
        >
          <span className="relative block h-16 w-auto sm:h-20">
            <Image
              src="/logo-black.png"
              alt="Tuned Frames"
              width={320}
              height={96}
              priority
              className="block h-full w-auto object-contain dark:hidden"
            />
            <Image
              src="/logo.png"
              alt="Tuned Frames"
              width={320}
              height={96}
              priority
              className="hidden h-full w-auto object-contain dark:block"
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
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white/60 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-white md:hidden dark:border-slate-700/70 dark:bg-neutral-900/60 dark:text-neutral-200 dark:hover:border-slate-600 dark:hover:bg-neutral-900"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen ? (
          <div className="absolute left-6 right-6 top-full mt-4 origin-top rounded-3xl border border-slate-200/70 bg-white/95 p-6 text-sm shadow-2xl backdrop-blur-md md:hidden dark:border-slate-800/60 dark:bg-neutral-950/95">
            <nav aria-label="Mobile" className="flex flex-col gap-3 text-base font-medium">
              {NAV_LINKS.map((link) => {
                const isActive =
                  mounted && (pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`)));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-full px-4 py-2 transition-colors",
                      isActive
                        ? "bg-slate-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-neutral-900/80 dark:hover:text-neutral-100"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-base font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Let’s Talk
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
