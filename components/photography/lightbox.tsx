"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { GalleryImage } from "@/lib/photography/gallery";
import { motion, useReducedMotion } from "framer-motion";

interface LightboxProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const focusables = useRef<HTMLElement[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const current = images[index];
  const isZoomed = scale > 1;

  const clampIndex = useCallback(
    (value: number) => {
      if (value < 0) return images.length - 1;
      if (value >= images.length) return 0;
      return value;
    },
    [images.length]
  );

  const goNext = useCallback(() => {
    setIndex((prev) => clampIndex(prev + 1));
    setScale(1);
  }, [clampIndex]);

  const goPrev = useCallback(() => {
    setIndex((prev) => clampIndex(prev - 1));
    setScale(1);
  }, [clampIndex]);

  useEffect(() => {
    focusables.current = containerRef.current
      ? Array.from(containerRef.current.querySelectorAll<HTMLElement>("button")).filter(
          (node) => node.offsetParent !== null
        )
      : [];
    const previous = document.activeElement as HTMLElement | null;
    const firstFocusable = focusables.current[0];
    firstFocusable?.focus();
    return () => {
      previous?.focus();
    };
  }, [index, scale]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "+" || event.key === "=") {
        setScale((value) => Math.min(3, value + 0.25));
      } else if (event.key === "-" || event.key === "_") {
        setScale((value) => Math.max(1, value - 0.25));
      } else if (event.key === "Tab") {
        const nodes = focusables.current;
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, onClose]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  }, []);

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!pointerStart.current) return;
      const deltaX = event.clientX - pointerStart.current.x;
      if (Math.abs(deltaX) > 80) {
        if (deltaX > 0) {
          goPrev();
        } else {
          goNext();
        }
      }
      pointerStart.current = null;
    },
    [goNext, goPrev]
  );

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <div
        ref={containerRef}
        className="relative flex w-full max-w-5xl flex-col gap-6"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 text-white">
          <div>
            <p className="text-sm font-medium sm:text-base">{current.caption}</p>
            <p className="text-xs text-slate-300 sm:text-sm">
              Shot {index + 1} of {images.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={isZoomed ? "Reset zoom" : "Zoom in"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={() =>
                setScale((value) => {
                  if (value > 1) {
                    return 1;
                  }
                  return Math.min(3, value + 0.5);
                })
              }
            >
              {isZoomed ? (
                <ZoomOut aria-hidden className="h-5 w-5" />
              ) : (
                <ZoomIn aria-hidden className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              aria-label="Close lightbox"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white text-slate-900 shadow transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              onClick={onClose}
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative">
          <motion.div
            key={current.src}
            className="relative flex h-[70vh] items-center justify-center overflow-hidden rounded-3xl bg-black/40 px-4 py-6 sm:h-[80vh]"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              className="max-h-full w-auto max-w-full object-contain"
              style={{
                transform: `scale(${scale})`,
                maxHeight: "100%",
                maxWidth: "100%",
                width: "auto",
                height: "auto",
              }}
              sizes="(max-width: 768px) 100vw, 90vw"
              placeholder="blur"
              blurDataURL={current.placeholder}
            />
          </motion.div>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 p-3 text-white shadow-2xl backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:flex"
            onClick={goPrev}
          >
            <ChevronLeft aria-hidden className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 p-3 text-white shadow-2xl backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:flex"
            onClick={goNext}
          >
            <ChevronRight aria-hidden className="h-5 w-5" />
          </button>
        </div>
        <p className="text-center text-xs text-slate-300 sm:hidden">
          Swipe to explore the gallery
        </p>
        {current.exif && (
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/10 p-4 text-xs text-white sm:grid-cols-3 md:grid-cols-6">
            {Object.entries(current.exif).map(([key, value]) => (
              <div key={key}>
                <p className="uppercase tracking-[0.2em] text-white/60">{key}</p>
                <p className="mt-1 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}