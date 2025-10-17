import Image from "next/image";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/photography/section-header";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = "About Tuned Frames — Professional Photographer";
  const description =
    "Car photographer, portrait artist, and videographer delivering cinematic visuals, edits, and event coverage.";
  const url = "https://getlynk.co/about";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      firstName: "Tuned",
      lastName: "Frames",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const SERVICES = [
  {
    title: "Car Photography",
    copy: "High-quality static and rolling shots for owners, dealerships, clubs, and automotive brands.",
  },
  {
    title: "Portrait Photography",
    copy: "Studio or location portraits for individuals, couples, and professionals with cinematic direction.",
  },
  {
    title: "Automotive Videos",
    copy: "Cinematic reels, reviews, and promo videos ready for social, campaigns, or commercial launches.",
  },
  {
    title: "Portrait Videography",
    copy: "Short-form stories and behind-the-scenes films tailored for influencers, brands, and creators.",
  },
  {
    title: "Photo Editing",
    copy: "High-end retouching, colour grading, and background enhancements that keep your vibe intact.",
  },
  {
    title: "Video Editing",
    copy: "Transitions, effects, colour correction, and sound design for polished final cuts.",
  },
];

const EVENT_TYPES = [
  {
    title: "Car Events",
    copy: "Coverage of meets, shows, races, and launches — live highlights and full galleries included.",
  },
  {
    title: "Personal Events",
    copy: "Birthdays, graduations, and private portrait sessions captured in both photo and video.",
  },
  {
    title: "Short-form Content",
    copy: "Instagram, TikTok, and YouTube-ready edits with teaser clips, carousel stills, and reels.",
  },
  {
    title: "Full-Service Shoots",
    copy: "Lifestyle portraits, behind-the-scenes coverage, and custom car visuals for brands and influencers.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tuned Frames",
    jobTitle: "Professional Photographer",
    url: "https://getlynk.co/",
    image: "https://getlynk.co/photography/lina-portrait.svg",
    sameAs: [
      "https://www.youtube.com/",
      "https://www.instagram.com/",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Berovo",
      addressCountry: "MK",
    },
    email: "tunedframes@gmail.com",
    areaServed: "Worldwide",
  };

  return (
    <div className="relative">
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400 transition-colors dark:text-neutral-500">About me</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 transition-colors dark:text-neutral-100 sm:text-5xl">
              Tuned Frames is your go-to for car visuals, portraits, and video stories.
            </h1>
            <p className="mt-6 text-base text-slate-500 transition-colors dark:text-neutral-400 sm:text-lg">
              From Berovo, North Macedonia to wherever the road takes us, I shape each shoot with intention. The focus is on people, the machines they love, and the feeling that rushes in when everything lines up.
            </p>
            <p className="mt-6 text-base text-slate-500 transition-colors dark:text-neutral-400 sm:text-lg">
              Whether it’s a roaring car meet, a portrait session with cinematic lighting, or a video edit built for social impact, I’m committed to delivering visuals that feel personal, polished, and unforgettable.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg transition-colors dark:border-slate-800 dark:bg-neutral-900/80">
                <p className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100">Base</p>
                <p className="mt-2 text-sm text-slate-500 transition-colors dark:text-neutral-400">Berovo, North Macedonia — traveling for meets, shoots, and campaigns.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg transition-colors dark:border-slate-800 dark:bg-neutral-900/80">
                <p className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100">Clients & collaborators</p>
                <p className="mt-2 text-sm text-slate-500 transition-colors dark:text-neutral-400">Automotive brands, tuners, portrait clients, content creators, and local businesses.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-slate-200/60 blur-3xl transition-colors dark:bg-indigo-500/20" aria-hidden />
            <div className="overflow-hidden">
              <Image
                src="/andrej-pechinski.png"
                alt="Portrait illustration representing Tuned Frames"
                width={900}
                height={1200}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <SectionHeader
          eyebrow="Services"
          title="Six ways we bring your visuals to life"
          description="Photography, video, and editing services built to flex between cars, portraits, and events."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-neutral-900/80"
            >
              <h3 className="text-lg font-semibold text-slate-900 transition-colors dark:text-neutral-100">{service.title}</h3>
              <p className="mt-3 text-sm text-slate-500 transition-colors dark:text-neutral-400">{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <SectionHeader
          eyebrow="Experiences"
          title="Coverage tuned to every moment"
          description="From the rev limiter to the encore, here’s how each collaboration comes together."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {EVENT_TYPES.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-neutral-900/80"
            >
              <h3 className="text-lg font-semibold text-slate-900 transition-colors dark:text-neutral-100">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-500 transition-colors dark:text-neutral-400">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}