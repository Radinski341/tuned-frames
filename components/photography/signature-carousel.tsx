"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GallerySummary } from "@/lib/photography/gallery";
import { ResponsiveImage } from "./responsive-image";

interface SignatureCarouselProps {
  collections: GallerySummary[];
}


export function SignatureCarousel({ collections }: SignatureCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const slides = useMemo(() => collections.slice(0, 8), [collections]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [{ canScrollLeft, canScrollRight }, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth, scrollWidth } = container;
    setScrollState({
      canScrollLeft: scrollLeft > 0,
      canScrollRight: scrollLeft + clientWidth < scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollState();

    container.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateScrollState)
        : null;

    if (resizeObserver) {
      resizeObserver.observe(container);
    }

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      resizeObserver?.disconnect();
    };
  }, [updateScrollState]);

  const handleScroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  if (!slides.length) return null;

  return (
    <div className="relative mt-12">
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 pr-4 text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:pr-6"
        style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none" }}
      >
        {slides.map((collection) => (
          <motion.div
            key={`${collection.type}-${collection.slug}`}
            className="group min-w-[260px] max-w-xs shrink-0 snap-start"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
          >
            {collection.coverImage && (
              <Link href={collection.href} className="block">
                <ResponsiveImage
                  image={collection.coverImage}
                  sizes="(max-width: 768px) 90vw, 320px"
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>
            )}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 transition-colors dark:text-neutral-500">{collection.type}</p>
                <Link
                  href={collection.href}
                  className="mt-1 block text-lg font-semibold text-slate-900 transition-colors hover:text-slate-700 dark:text-neutral-100 dark:hover:text-neutral-200"
                >
                  {collection.title}
                </Link>
              </div>
              <span className="text-xs text-slate-400 transition-colors dark:text-neutral-500">{collection.imageCount} shots</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
        <div className="pointer-events-none h-full w-20 bg-gradient-to-r from-white via-white/70 to-transparent dark:from-neutral-950 dark:via-neutral-950/70 sm:w-32" />
        <div className="pointer-events-none h-full w-20 bg-gradient-to-l from-white via-white/70 to-transparent dark:from-neutral-950 dark:via-neutral-950/70 sm:w-32" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg ring-1 ring-black/5 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-40 dark:bg-neutral-900/90 dark:text-neutral-100 dark:ring-white/10 dark:hover:bg-neutral-900"
          aria-label="Scroll to previous collection"
          disabled={!canScrollLeft}
        >
          <ChevronLeft aria-hidden className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => handleScroll("right")}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg ring-1 ring-black/5 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-40 dark:bg-neutral-900/90 dark:text-neutral-100 dark:ring-white/10 dark:hover:bg-neutral-900"
          aria-label="Scroll to next collection"
          disabled={!canScrollRight}
        >
          <ChevronRight aria-hidden className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}