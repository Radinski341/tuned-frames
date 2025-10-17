import type { Metadata } from "next";
import Link from "next/link";
import { getGallerySummaries } from "@/lib/photography/gallery";
import { SectionHeader } from "@/components/photography/section-header";
import { ResponsiveImage } from "@/components/photography/responsive-image";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Albums — Tuned Frames";
  const description =
    "Editorial albums, portrait sets, and edits curated for clients, creators, and automotive brands.";
  const url = "https://getlynk.co/albums";
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

export default async function AlbumsPage() {
  const albums = await getGallerySummaries("albums");

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <SectionHeader
        eyebrow="Albums"
        title="Portraits, edits, and stories built to replay"
        description="Drop fresh folders into /public/albums and each collection instantly appears here, ready for light or dark mode."
      />
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {albums.map((album) => (
          <article
            key={album.slug}
            className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-neutral-900/80"
          >
            {album.coverImage && (
              <Link href={album.href} className="block">
                <ResponsiveImage
                  image={album.coverImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </Link>
            )}
            <div className="flex flex-col gap-4 px-6 py-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400 transition-colors dark:text-neutral-500">Album</p>
                <Link
                  href={album.href}
                  className="mt-2 block text-2xl font-semibold text-slate-900 transition-colors hover:text-slate-700 dark:text-neutral-100 dark:hover:text-neutral-200"
                >
                  {album.title}
                </Link>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 transition-colors dark:text-neutral-400">
                <span>{album.imageCount} photographs</span>
                {album.updatedAt && (
                  <time dateTime={album.updatedAt}>
                    {new Date(album.updatedAt).toLocaleDateString(undefined, {
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}