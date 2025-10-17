import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/photography/contact-form";
import { SectionHeader } from "@/components/photography/section-header";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Contact Tuned Frames";
  const description =
    "Let’s plan your next car shoot, portrait session, or video project — expect a response within 24 hours.";
  const url = "https://getlynk.co/contact";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <SectionHeader
        eyebrow="Contact"
        title="Let’s design visuals that feel like your build"
        description="Tell me what you’re working on and I’ll follow up with ideas, availability, and packages tailored to your car, crew, or brand."
      />
      <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-colors dark:border-slate-800 dark:bg-neutral-900">
            <p className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100">Availability</p>
            <p className="mt-2 text-sm text-slate-500 transition-colors dark:text-neutral-400">
              Booking car meets, portrait sessions, and commercial shoots across 2024–2025 with select rush openings for launches and events.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-500 transition-colors dark:text-neutral-400">
              <p>
                Email: <Link href="mailto:tunedframes@gmail.com" className="font-semibold text-slate-900 transition-colors hover:text-slate-700 dark:text-neutral-100 dark:hover:text-neutral-300">tunedframes@gmail.com</Link>
              </p>
              <p>Location: Berovo, North Macedonia</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-colors dark:border-slate-800 dark:bg-neutral-900">
            <p className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100">Follow my journey</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-500 transition-colors dark:text-neutral-400">
              <li>
                <Link href="https://www.youtube.com" target="_blank" className="font-semibold text-slate-900 transition-colors hover:text-slate-700 dark:text-neutral-100 dark:hover:text-neutral-300">
                  YouTube
                </Link>
                — Behind-the-scenes edits & reels
              </li>
              <li>
                <Link href="https://www.instagram.com" target="_blank" className="font-semibold text-slate-900 transition-colors hover:text-slate-700 dark:text-neutral-100 dark:hover:text-neutral-300">
                  Instagram
                </Link>
                — Daily snapshots and stories
              </li>
            </ul>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}