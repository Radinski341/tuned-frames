import { cache } from "react";
import { promises as fs, Dirent } from "fs";
import path from "path";
import { fileNameToAlt, hashStringToHsl, slugToTitle } from "./format";

export type GalleryKind = "events" | "albums";

export interface ExifRecord {
  [key: string]: string | number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder: string;
  caption?: string;
  exif?: ExifRecord;
}

export interface GallerySummary {
  slug: string;
  title: string;
  type: GalleryKind;
  href: string;
  coverImage: GalleryImage | null;
  imageCount: number;
  tags: string[];
  updatedAt: string | null;
}

export interface GalleryCollection extends GallerySummary {
  images: GalleryImage[];
}

const PUBLIC_DIR = path.join(process.cwd(), "public");
const PLACEHOLDER_WIDTH = 32;
const PLACEHOLDER_HEIGHT = 24;

async function readDirSafe(dirPath: string): Promise<Dirent[]> {
  try {
    return await fs.readdir(dirPath, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

function buildPlaceholder(key: string) {
  const base = hashStringToHsl(key, 62, 62);
  const accent = hashStringToHsl(`${key}-accent`, 72, 72);
  const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${PLACEHOLDER_WIDTH}" height="${PLACEHOLDER_HEIGHT}" viewBox="0 0 ${PLACEHOLDER_WIDTH} ${PLACEHOLDER_HEIGHT}"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${base}"/><stop offset="1" stop-color="${accent}"/></linearGradient></defs><rect width="${PLACEHOLDER_WIDTH}" height="${PLACEHOLDER_HEIGHT}" fill="url(#g)"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function parseSvgDimensions(content: string): { width: number; height: number } | null {
  const widthMatch = content.match(/width="([0-9.]+)"/i);
  const heightMatch = content.match(/height="([0-9.]+)"/i);
  if (widthMatch && heightMatch) {
    return { width: Number(widthMatch[1]), height: Number(heightMatch[1]) };
  }
  const viewBoxMatch = content.match(/viewBox="([0-9.\s-]+)"/i);
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1].trim().split(/\s+/);
    if (parts.length === 4) {
      const width = Number(parts[2]);
      const height = Number(parts[3]);
      if (!Number.isNaN(width) && !Number.isNaN(height)) {
        return { width, height };
      }
    }
  }
  return null;
}

function parsePngDimensions(buffer: Buffer): { width: number; height: number } | null {
  if (buffer.length < 24) return null;
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") return null;
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

function parseJpegDimensions(buffer: Buffer): { width: number; height: number } | null {
  if (buffer.length < 4) return null;
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    if (marker === 0xd9 || marker === 0xda) break;
    const length = buffer.readUInt16BE(offset + 2);
    if (length < 2) break;
    if (marker >= 0xc0 && marker <= 0xc3) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    offset += length + 2;
  }
  return null;
}

function parseWebpDimensions(buffer: Buffer): { width: number; height: number } | null {
  if (buffer.length < 30) return null;
  if (buffer.subarray(0, 4).toString("ascii") !== "RIFF") return null;
  if (buffer.subarray(8, 12).toString("ascii") !== "WEBP") return null;
  const chunkHeader = buffer.subarray(12, 16).toString("ascii");
  if (chunkHeader === "VP8 ") {
    const start = 26;
    if (buffer.length < start + 4) return null;
    const width = buffer.readUInt16LE(start);
    const height = buffer.readUInt16LE(start + 2);
    return { width, height };
  }
  if (chunkHeader === "VP8L") {
    const byte4 = buffer[21];
    const width = 1 + (((buffer[20] | ((byte4 & 0x3) << 8))) >>> 0);
    const height = 1 + (((buffer[21] >> 2) | (buffer[22] << 6) | ((buffer[23] & 0x0f) << 14)) >>> 0);
    return { width, height };
  }
  if (chunkHeader === "VP8X") {
    if (buffer.length < 30) return null;
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return { width, height };
  }
  return null;
}

async function getImageDimensions(filePath: string): Promise<{ width: number; height: number }> {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".svg") {
    const content = await fs.readFile(filePath, "utf8");
    const dims = parseSvgDimensions(content);
    if (dims) return dims;
  } else {
    const buffer = await fs.readFile(filePath);
    let dims: { width: number; height: number } | null = null;
    if (ext === ".png") {
      dims = parsePngDimensions(buffer);
    } else if (ext === ".jpg" || ext === ".jpeg") {
      dims = parseJpegDimensions(buffer);
    } else if (ext === ".webp") {
      dims = parseWebpDimensions(buffer);
    }
    if (dims) return dims;
  }
  return { width: 1600, height: 1066 };
}

async function readExifCompanion(imagePath: string): Promise<ExifRecord | undefined> {
  const base = imagePath.replace(/\.[^/.]+$/, "");
  const jsonPath = `${base}.json`;
  try {
    const raw = await fs.readFile(jsonPath, "utf8");
    const data = JSON.parse(raw) as ExifRecord;
    return data;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined;
    }
    console.warn(`Failed to read EXIF companion for ${imagePath}`, error);
    return undefined;
  }
}

async function readImage(type: GalleryKind, slug: string, fileName: string): Promise<GalleryImage> {
  const imagePath = path.join(PUBLIC_DIR, type, slug, fileName);
  const dims = await getImageDimensions(imagePath);
  const placeholder = buildPlaceholder(`${type}-${slug}-${fileName}`);
  const exif = await readExifCompanion(imagePath);
  return {
    src: `/${type}/${slug}/${fileName}`,
    alt: fileNameToAlt(fileName),
    width: dims.width,
    height: dims.height,
    placeholder,
    caption: fileNameToAlt(fileName),
    exif,
  };
}

async function getCollection(type: GalleryKind, slug: string): Promise<GalleryCollection | null> {
  const dirPath = path.join(PUBLIC_DIR, type, slug);
  const entries = await readDirSafe(dirPath);
  if (!entries.length) return null;
  const files = entries
    .filter((entry) => entry.isFile() && !entry.name.endsWith(".json"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const images = await Promise.all(files.map((file) => readImage(type, slug, file)));
  const coverImage = images[0] ?? null;
  const stats = await fs.stat(dirPath);
  const tags = new Set<string>([type]);
  slug.split(/[-_]+/g).forEach((part) => {
    if (part) tags.add(part.toLowerCase());
  });

  return {
    slug,
    title: slugToTitle(slug),
    type,
    href: `/${type}/${slug}`,
    coverImage,
    imageCount: images.length,
    images,
    tags: Array.from(tags),
    updatedAt: stats.mtime.toISOString(),
  };
}

async function listCollections(type: GalleryKind): Promise<GalleryCollection[]> {
  const typeDir = path.join(PUBLIC_DIR, type);
  const entries = await readDirSafe(typeDir);
  const slugs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const collections = await Promise.all(slugs.map((slug) => getCollection(type, slug)));
  return collections.filter((item): item is GalleryCollection => item !== null);
}

export const getGallerySummaries = cache(async (type: GalleryKind): Promise<GalleryCollection[]> => {
  return listCollections(type);
});

export const getAllGallerySummaries = cache(async (): Promise<GalleryCollection[]> => {
  const [events, albums] = await Promise.all([
    listCollections("events"),
    listCollections("albums"),
  ]);
  return [...events, ...albums].sort((a, b) => {
    const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return bTime - aTime;
  });
});

export const getGalleryBySlug = cache(async (
  type: GalleryKind,
  slug: string
): Promise<GalleryCollection | null> => getCollection(type, slug));

export const getFeaturedCollections = cache(async (count = 6): Promise<GallerySummary[]> => {
  const all = await getAllGallerySummaries();
  return all.slice(0, count);
});

export const getGallerySlugs = cache(async (type: GalleryKind): Promise<string[]> => {
  const typeDir = path.join(PUBLIC_DIR, type);
  const entries = await readDirSafe(typeDir);
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
});