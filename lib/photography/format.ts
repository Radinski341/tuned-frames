const STOP_WORDS = new Set(["and", "or", "the", "of", "a", "an"]);

export function slugToTitle(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map((word) => {
      if (!word) return "";
      const lower = word.toLowerCase();
      if (STOP_WORDS.has(lower)) {
        return lower;
      }
      if (/^\d{4}$/.test(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ")
    .replace(/\b(\d{2})-(\d{2})-(\d{4})\b/, (_, d, m, y) => {
      const date = new Date(`${y}-${m}-${d}`);
      return isNaN(date.getTime())
        ? `${d} ${m} ${y}`
        : date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
    })
    .replace(/\s{2,}/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function fileNameToAlt(fileName: string): string {
  const base = fileName.replace(/\.[^/.]+$/, "");
  return slugToTitle(base);
}

export function hashStringToHsl(input: string, saturation = 65, lightness = 60): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}