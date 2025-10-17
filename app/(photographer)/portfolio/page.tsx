import type { Metadata } from "next";
import { getAllGallerySummaries } from "@/lib/photography/gallery";
import { SectionHeader } from "@/components/photography/section-header";
import { PortfolioGrid } from "@/components/photography/portfolio-grid";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Work — Tuned Frames Portfolio";
  const description =
    "Explore featured cars, bikes, portraits, and edits captured by Tuned Frames with filters for events and albums.";
  const url = "https://getlynk.co/portfolio";
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

export default async function PortfolioPage() {
  const collections = await getAllGallerySummaries();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <SectionHeader
        eyebrow="Work"
        title="Cars, bikes, models, and edits in one evolving hub"
        description="Use the filters to jump between events and albums — new folders drop in automatically once they hit the repo."
      />
      <div className="mt-12">
        <PortfolioGrid collections={collections} />
      </div>
    </div>
  );
}