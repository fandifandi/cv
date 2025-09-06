"use client";

import GalleryLightbox from "@/components/GalleryLightbox";

export default function ProjectGallery({
  items,
  className = "",
}: {
  items: Array<string | { src: string; alt?: string }>;
  className?: string;
}) {
  if (!items?.length) return null;
  return (
    <section className={className}>
      <h2 className="text-xl font-semibold">Gallery</h2>
      <GalleryLightbox items={items} className="mt-3" />
    </section>
  );
}
