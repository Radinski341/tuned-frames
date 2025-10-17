import type { Metadata } from "next";
import { PhotographerNav } from "@/components/photography/nav";
import { PhotographerFooter } from "@/components/photography/footer";

export const metadata: Metadata = {
  title: {
    default: "Tuned Frames — Professional Photographer",
    template: "%s — Tuned Frames",
  },
  description:
    "Tuned Frames crafts cinematic photography and video for cars, portraits, and events across North Macedonia and beyond.",
};

export default function PhotographerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100">
      <PhotographerNav />
      <main className="flex-1">
        <div
          className="relative isolate"
          aria-hidden
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),_transparent_60%)]" />
        </div>
        {children}
      </main>
      <PhotographerFooter />
    </div>
  );
}