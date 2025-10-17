import Image from "next/image";
import { cn } from "@/lib/utils";
import { GalleryImage } from "@/lib/photography/gallery";

interface ResponsiveImageProps {
  image: GalleryImage;
  sizes?: string;
  className?: string;
  priority?: boolean;
  containerClassName?: string;
}

export function ResponsiveImage({
  image,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
  priority,
  containerClassName,
}: ResponsiveImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl shadow-lg",
        containerClassName
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        placeholder="blur"
        blurDataURL={image.placeholder}
        sizes={sizes}
        className={className ?? "h-full w-full object-cover"}
        priority={priority}
      />
    </div>
  );
}