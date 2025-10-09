import React from "react";

const galleryImages = Array(4).fill("/src/assets/sawah.jpeg");

export default function NewGallery() {
  return (
    <div className="mt-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">
          See What's <span className="text-bright-yellow">New</span> on
        </h2>
      </div>

      <div className="columns-2 md:columns-3 gap-4 space-y-4 mt-[20px]">
        {galleryImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`gallery-${idx}`}
            className="rounded-xl w-full object-cover"
          />
        ))}
      </div>
    </div>
  );
}
