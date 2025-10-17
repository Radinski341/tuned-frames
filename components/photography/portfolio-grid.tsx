"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GallerySummary } from "@/lib/photography/gallery";
import { ResponsiveImage } from "./responsive-image";

interface PortfolioGridProps {
  collections: GallerySummary[];
}

const BUTTON_BASE =
  "rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950";

export function PortfolioGrid({ collections }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const tags = useMemo(() => {
    const set = new Set<string>();
    collections.forEach((collection) => {
      collection.tags.forEach((tag) => set.add(tag));
    });
    return Array.from(set).sort();
  }, [collections]);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return collections;
    return collections.filter((collection) => collection.tags.includes(activeFilter));
  }, [activeFilter, collections]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`${BUTTON_BASE} ${
            activeFilter === "all"
              ? "border-slate-900 bg-slate-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:border-neutral-600"
          }`}
        >
          All work
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveFilter(tag)}
            className={`${BUTTON_BASE} ${
              activeFilter === tag
                ? "border-slate-900 bg-slate-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:border-neutral-600"
            }`}
          >
            {tag.replace(/-/g, " ")}
          </button>
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((collection) => (
          <article
            key={`${collection.type}-${collection.slug}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-neutral-900/70"
          >
            {collection.coverImage && (
              <Link href={collection.href} className="block">
                <ResponsiveImage
                  image={collection.coverImage}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </Link>
            )}
            <div className="flex flex-1 flex-col gap-4 px-6 py-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400 transition-colors dark:text-neutral-500">
                  {collection.type}
                </p>
                <Link
                  href={collection.href}
                  className="mt-2 block text-xl font-semibold text-slate-900 transition-colors hover:text-slate-700 dark:text-neutral-100 dark:hover:text-neutral-200"
                >
                  {collection.title}
                </Link>
              </div>
              <div className="mt-auto flex flex-wrap gap-2 text-xs text-slate-500 transition-colors dark:text-neutral-400">
                {collection.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-900/5 px-3 py-1 dark:bg-neutral-100/10">
                    {tag.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}