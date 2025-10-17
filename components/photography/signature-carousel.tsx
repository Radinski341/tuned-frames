"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { GallerySummary } from "@/lib/photography/gallery";
import { ResponsiveImage } from "./responsive-image";

interface SignatureCarouselProps {
  collections: GallerySummary[];
}

export function SignatureCarousel({ collections }: SignatureCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const slides = useMemo(() => collections.slice(0, 8), [collections]);

  if (!slides.length) return null;

  return (
    <div className="relative mt-12">
      <motion.div
        className="flex gap-8 overflow-x-auto pb-4"
       drag="x"
        dragConstraints={{ left: -240, right: 0 }}
        dragElastic={0.2}
        whileTap={{ cursor: "grabbing" }}
      >
        {slides.map((collection) => (
          <motion.div
            key={`${collection.type}-${collection.slug}`}
            className="group min-w-[260px] max-w-xs shrink-0"
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
      </motion.div>
    </div>
  );
}