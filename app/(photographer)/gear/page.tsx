import type { Metadata } from "next";
import { SectionHeader } from "@/components/photography/section-header";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Gear Kit — Tuned Frames";
  const description = "The cameras, lenses, stabilisers, and tools powering every Tuned Frames project.";
  const url = "https://getlynk.co/gear";
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

const CORE_GEAR = [
  { label: "Main Camera", value: "Sony Alpha A7 III" },
  { label: "Main Lens", value: "Tamron 28-75mm F/2.8 Di III RXD" },
  { label: "Camera Gimbal", value: "DJI Ronin SC" },
  { label: "Drone", value: "DJI MINI 2" },
  { label: "Action", value: "Go Pro Hero 12" },
];

const TOOLKIT = [
  {
    title: "Car Photography",
    items: [
      "Polarising filters for clean reflections",
      "Rig mounts for rolling shots",
      "LED light bars for dramatic accents",
    ],
  },
  {
    title: "Portrait Sessions",
    items: [
      "Portable strobe kit",
      "Collapsible scrims and reflectors",
      "Tethered capture to review live edits",
    ],
  },
  {
    title: "Video Production",
    items: [
      "DJI Ronin SC gimbal",
      "Atomos Ninja monitor/recorder",
      "Directional and lav mics for crisp audio",
    ],
  },
  {
    title: "Post-Production",
    items: [
      "DaVinci Resolve Studio",
      "Adobe Lightroom & Photoshop",
      "Custom LUT library tuned for cars and portraits",
    ],
  },
];

export default function GearPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <SectionHeader
        eyebrow="Gear"
        title="Tools dialled for speed, precision, and cinematic style"
        description="Every project starts with dependable gear so the focus stays on storytelling, not troubleshooting."
      />
      <section className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg transition-colors dark:border-slate-800 dark:bg-neutral-900/80">
          <h2 className="text-lg font-semibold text-slate-900 transition-colors dark:text-neutral-100">Core kit</h2>
          <dl className="mt-6 space-y-4 text-sm text-slate-500 transition-colors dark:text-neutral-400">
            {CORE_GEAR.map((gear) => (
              <div key={gear.label} className="flex items-center justify-between">
                <dt>{gear.label}</dt>
                <dd className="font-medium text-slate-900 transition-colors dark:text-neutral-100">{gear.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg transition-colors dark:border-slate-800 dark:bg-neutral-900/80">
          <h2 className="text-lg font-semibold text-slate-900 transition-colors dark:text-neutral-100">Field ready</h2>
          <p className="mt-2 text-sm text-slate-500 transition-colors dark:text-neutral-400">
            Every setup flexes to match the energy of the shoot — from sunrise mountain passes to late-night studio edits.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {TOOLKIT.map((kit) => (
              <div key={kit.title} className="rounded-2xl border border-slate-200 bg-white/80 p-4 transition-colors dark:border-slate-700 dark:bg-neutral-900">
                <h3 className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100">{kit.title}</h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-500 transition-colors dark:text-neutral-400">
                  {kit.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}