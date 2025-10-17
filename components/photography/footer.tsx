import Link from "next/link";

export function PhotographerFooter() {
  return (
    <footer className="border-t border-slate-200/60 bg-white/90 transition-colors duration-300 dark:border-slate-800/60 dark:bg-neutral-950/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100">Tuned Frames</p>
          <p className="mt-1 text-sm text-slate-500 transition-colors dark:text-neutral-400">
            Professional photography and video crafted in Berovo, North Macedonia — available worldwide.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm text-slate-500 transition-colors dark:text-neutral-400 lg:flex-row lg:items-center lg:gap-6">
          <Link href="mailto:tunedframes@gmail.com" className="hover:text-slate-900 dark:hover:text-neutral-100">
            tunedframes@gmail.com
          </Link>
          <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-4">
            <span>Berovo, North Macedonia</span>
            <div className="flex items-center gap-4">
              <Link href="https://www.youtube.com" className="hover:text-slate-900 dark:hover:text-neutral-100" target="_blank">
                YouTube
              </Link>
              <Link href="https://www.instagram.com" className="hover:text-slate-900 dark:hover:text-neutral-100" target="_blank">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}