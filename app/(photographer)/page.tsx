import Link from "next/link";
import type { Metadata } from "next";
import { getFeaturedCollections } from "@/lib/photography/gallery";
import { SignatureCarousel } from "@/components/photography/signature-carousel";
import { SectionHeader } from "@/components/photography/section-header";
// ResponsiveImage no longer used in hero, but keep it exported elsewhere if needed
// import { ResponsiveImage } from "@/components/photography/responsive-image";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Tuned Frames — Professional Photographer";
  const description =
    "Car and portrait photography, cinematic video, and polished edits for enthusiasts, creators, and brands.";
  const url = "https://getlynk.co/";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Tuned Frames",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const OFFERINGS = [
  {
    title: "Cars",
    copy: "Static, rolling, and cinematic hero shots that show off every curve, mod, and motion blur.",
  },
  {
    title: "Bikes",
    copy: "Two-wheel stories framed with grit and glow for clubs, racers, and custom builds.",
  },
  {
    title: "Models",
    copy: "Portrait sessions with moody lighting, authentic emotion, and editorial-grade direction.",
  },
  {
    title: "Edits",
    copy: "High-end photo and video retouching, colour work, and sound design to finish the story right.",
  },
];

const SOCIALS = [
  { label: "Youtube", href: "https://www.youtube.com", handle: "@Tuned Frames" },
  { label: "Instagram", href: "https://www.instagram.com/tuned_frames/", handle: "@tuned_frames" },
];

const FEATURED_POSTS = [
  { title: "Featured Post", slug: "tuned 14" },
  { title: "Car Meet Stories", slug: "carmeet 11" },
  { title: "Trackside Nights", slug: "carmeet 5" },
  { title: "Turbo Tuesdays", slug: "carmeet 14" },
];

export default async function Page() {
  const featured = await getFeaturedCollections(8);

  const heroImage = {
    src: "/hero.jpg",
    alt: "Andrej Pechinski",
    width: 500,
    height: 600,
    placeholder: "Andrej Pechinski",
  };

  return (
    <div className="relative">
      {/* HERO SECTION WITH FULL-SCREEN BACKGROUND IMAGE */}
      <section
        className="relative isolate h-screen w-full overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-label={heroImage.alt}
      >
        {/* Overlay to improve text contrast */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/50" aria-hidden />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col gap-12 px-6 py-24 lg:flex-row lg:items-center lg:px-8 lg:py-32">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              Tuned Frames
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Professional photography for cars, people, and stories that move.
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
              I’m a passionate car photographer, portrait artist, and videographer dedicated to capturing moments that truly matter.
              Whether it’s the raw beauty of your car, the emotion in a portrait, or the movement in a cinematic video — every project gets a creative eye, pro quality, and a personal touch.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/portfolio"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Explore the work
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold text-white transition-colors hover:text-white/90"
              >
                Book a shoot →
              </Link>
            </div>
          </div>
          {/* Empty spacer to keep previous layout balance on large screens */}
          <div className="hidden flex-1 lg:block" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <SectionHeader
          eyebrow="What you’ll find here"
          title="Built for enthusiasts, creators, and brands"
          description="From slammed builds to emotive portraits, the gallery evolves the moment you drop new folders in the repo."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {OFFERINGS.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-neutral-900/80"
            >
              <h3 className="text-lg font-semibold text-slate-900 transition-colors dark:text-neutral-100">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-500 transition-colors dark:text-neutral-400">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <SectionHeader
          eyebrow="Featured work"
          title="Cinematic galleries captured in motion"
          description="Scroll, drag, and explore rotating selections of events, meets, and portrait sessions."
        />
        <SignatureCarousel collections={featured} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Follow my journey"
              title="Behind-the-scenes reels, edits, and launches"
              description="Tap into live coverage from car meets, portrait builds, and edit breakdowns across YouTube and Instagram."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {SOCIALS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-800 dark:bg-neutral-900"
                >
                  <span className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100">{social.label}</span>
                  <span className="mt-2 text-lg text-slate-500 transition-colors dark:text-neutral-400">{social.handle}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg transition dark:border-slate-800 dark:bg-neutral-900/80">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 transition-colors dark:text-neutral-500">
              Fresh on the blog
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900 transition-colors dark:text-neutral-100">Latest drops</h3>
            <ul className="mt-6 space-y-4">
              {FEATURED_POSTS.map((post) => (
                <li key={post.slug} className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 transition-colors dark:text-neutral-400">{post.title}</span>
                  <span className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100">{post.slug}</span>
                </li>
              ))}
            </ul>
            <Link
              href="https://www.instagram.com/tuned_frames/"
              target="_blank"
              className="mt-6 inline-flex items-center text-sm font-semibold text-slate-900 transition-colors hover:text-slate-700 dark:text-neutral-100 dark:hover:text-neutral-300"
            >
              Visit my profile →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 transition-colors dark:text-neutral-500">
              Let’s talk
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 transition-colors dark:text-neutral-100 sm:text-4xl">
              I love to collaborate and make awesome content. Let’s talk!
            </h2>
            <p className="text-base text-slate-500 transition-colors dark:text-neutral-400">
              Drop the details for your next build, portrait concept, or event coverage and I’ll reply within a day with ideas, availability, and custom packages.
            </p>
            <div className="space-y-1 text-sm text-slate-500 transition-colors dark:text-neutral-400">
              <p>Berovo, North Macedonia</p>
              <p>
                <Link href="mailto:tunedframes@gmail.com" className="font-semibold text-slate-900 transition-colors hover:text-slate-700 dark:text-neutral-100 dark:hover:text-neutral-300">
                  tunedframes@gmail.com
                </Link>
              </p>
            </div>
          </div>
          <div className="rounded-[40px] border border-slate-200 bg-white/90 p-8 shadow-xl transition dark:border-slate-800 dark:bg-neutral-900/80">
            <h3 className="text-lg font-semibold text-slate-900 transition-colors dark:text-neutral-100">Gear snapshot</h3>
            <dl className="mt-6 space-y-4 text-sm text-slate-500 transition-colors dark:text-neutral-400">
              <div className="flex items-center justify-between">
                <dt>Main Camera</dt>
                <dd className="font-medium text-slate-900 transition-colors dark:text-neutral-100">Sony Alpha A7 III</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Main Lens</dt>
                <dd className="font-medium text-slate-900 transition-colors dark:text-neutral-100">Tamron 28-75mm F/2.8 Di III RXD</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Camera Gimbal</dt>
                <dd className="font-medium text-slate-900 transition-colors dark:text-neutral-100">DJI Ronin SC</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Other</dt>
                <dd className="font-medium text-slate-900 transition-colors dark:text-neutral-100">Go Pro Hero 12 & DJI MINI 2</dd>
              </div>
            </dl>
            <Link
              href="/gear"
              className="mt-6 inline-flex items-center text-sm font-semibold text-slate-900 transition-colors hover:text-slate-700 dark:text-neutral-100 dark:hover:text-neutral-300"
            >
              See full setup →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
