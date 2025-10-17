interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 transition-colors dark:text-neutral-500">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 transition-colors dark:text-neutral-100 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-slate-500 transition-colors dark:text-neutral-400">{description}</p>
      )}
    </div>
  );
}