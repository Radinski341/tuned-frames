// app/(photographer)/albums/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/photography/gallery-grid";
import { ResponsiveImage } from "@/components/photography/responsive-image";
import { SectionHeader } from "@/components/photography/section-header";
import { getGalleryBySlug, getGallerySlugs } from "@/lib/photography/gallery";
import { slugToTitle } from "@/lib/photography/format";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getGallerySlugs("albums");
  return slugs.map((slug) => ({ slug }));
}

// NOTE: params is incorrectly typed as a Promise in your project’s global types.
// This matches that constraint to unblock your build.
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params; // forced by your global PageProps
  const gallery = await getGalleryBySlug("albums", slug);

  if (!gallery) {
    return { title: slugToTitle(slug) };
  }

  const title = `${gallery.title} — Album Gallery`;
  const description = `Album ${gallery.title} captured and edited by Tuned Frames.`;
  const url = `https://getlynk.co/albums/${slug}`;
  const images = gallery.coverImage
    ? [{ url: `https://getlynk.co${gallery.coverImage.src}`, alt: gallery.coverImage.alt }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// Matches your (broken) global constraint requiring Promise params
export default async function AlbumGalleryPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; // forced await

  const gallery = await getGalleryBySlug("albums", slug);
  if (!gallery) {
    notFound();
  }

  const heroImage = gallery.coverImage ?? gallery.images[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${gallery.title} — Album Gallery`,
    description: `Album imagery for ${gallery.title} captured by Tuned Frames`,
    datePublished: gallery.updatedAt,
    image: gallery.images.map((image) => ({
      "@type": "ImageObject",
      url: `https://getlynk.co${image.src}`,
      name: image.alt,
      caption: image.caption,
    })),
  };

  return (
    <div className="relative">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 lg:px-8 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400 transition-colors dark:text-neutral-500">
              Album Gallery
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 transition-colors dark:text-neutral-100 sm:text-5xl">
              {gallery.title}
            </h1>
            <p className="mt-6 text-base text-slate-500 transition-colors dark:text-neutral-400 sm:text-lg">
              Intimate portraiture, custom edits, and cinematic sequences preserved in a gallery that’s ready for coffee tables and campaigns alike.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500 transition-colors dark:text-neutral-400">
              <span className="rounded-full bg-slate-900/5 px-3 py-1 dark:bg-neutral-100/10">
                {gallery.imageCount} images
              </span>
              {gallery.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-900/5 px-3 py-1 capitalize dark:bg-neutral-100/10"
                >
                  {tag.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>

          {heroImage && (
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-full bg-slate-200 blur-3xl transition-colors dark:bg-indigo-500/20"
                aria-hidden
              />
              <ResponsiveImage
                image={heroImage}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="h-full w-full object-cover"
                containerClassName="overflow-hidden rounded-[40px] border border-white/60 shadow-2xl dark:border-neutral-800/80"
              />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <SectionHeader
          eyebrow="Gallery"
          title="Turn the page on every emotion"
          description="Masonry layout adapts to your screen—dive into each frame with responsive lightbox interactions and metadata."
        />
        <div className="mt-12">
          <GalleryGrid images={gallery.images} />
        </div>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
