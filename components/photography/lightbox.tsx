"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
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
      ? Array.from(containerRef.current.querySelectorAll<HTMLElement>("button"))
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
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">{current.caption}</p>
            <p className="text-xs text-slate-300">
              Shot {index + 1} of {images.length}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              onClick={() => setScale((value) => (value >= 2.5 ? 1 : value + 0.5))}
            >
              {scale > 1 ? "Zoom out" : "Zoom in"}
            </button>
            <button
              type="button"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              onClick={goPrev}
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              onClick={goNext}
            >
              Next
            </button>
            <button
              type="button"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        <motion.div
          key={current.src}
          className="relative flex h-[60vh] items-center justify-center overflow-hidden rounded-3xl bg-black/40"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="object-contain"
            style={{ transform: `scale(${scale})` }}
            sizes="(max-width: 768px) 100vw, 70vw"
            placeholder="blur"
            blurDataURL={current.placeholder}
          />
        </motion.div>
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