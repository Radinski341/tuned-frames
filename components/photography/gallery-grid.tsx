"use client";

import { useState } from "react";
import { GalleryImage } from "@/lib/photography/gallery";
import { Lightbox } from "./lightbox";
import { ResponsiveImage } from "./responsive-image";

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <figure
            key={image.src}
            className="group mb-6 break-inside-avoid overflow-hidden rounded-3xl bg-slate-100 shadow-lg transition duration-500 hover:-translate-y-1 hover:shadow-xl dark:bg-neutral-900/60"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="relative block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950"
            >
              <ResponsiveImage
                image={image}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
            </button>
            <figcaption className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100">{image.caption}</p>
                <p className="text-xs text-slate-500 transition-colors dark:text-neutral-400">{image.alt}</p>
              </div>
              {image.exif && image.exif.location && (
                <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs text-slate-600 transition-colors dark:bg-neutral-100/10 dark:text-neutral-300">
                  {String(image.exif.location)}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}