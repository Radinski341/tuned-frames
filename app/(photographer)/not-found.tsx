import Link from "next/link";

export default function PhotographerNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400 transition-colors dark:text-neutral-500">Not Found</p>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 transition-colors dark:text-neutral-100">This frame is out of focus.</h1>
      <p className="mt-4 text-base text-slate-500 transition-colors dark:text-neutral-400">
        The page you’re looking for has been archived or never existed. Return to the portfolio to keep exploring curated stories.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Back to home
        </Link>
        <Link href="/portfolio" className="text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900 dark:text-neutral-200 dark:hover:text-neutral-50">
          Explore portfolio →
        </Link>
      </div>
    </div>
  );
}