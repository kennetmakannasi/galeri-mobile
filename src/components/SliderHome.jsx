import Masonry from "react-layout-masonry";

const images = [
  "/src/assets/sunset.jpeg",
  "/src/assets/a.jpeg",
  "/src/assets/kabut gng.jpeg",
  "/src/assets/sawah.jpeg",
  "/src/assets/sawah.jpeg",
  "/src/assets/sawah.jpeg",
  "/src/assets/sawah.jpeg",
  "/src/assets/sawah.jpeg",
  "/src/assets/sawah.jpeg",
];

export default function SliderHome() {
    const doubledImages = [...images, ...images]; // digandain biar loop mulus

  return (
    <div className="mt-6 overflow-hidden w-full px-5">
      <div className="flex space-x-4 animate-scroll">
        {doubledImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`img-${idx}`}
            className="h-32 w-80 object-cover rounded-xl"
          />
        ))}
      </div>

      {/* CSS untuk animasi scroll */}
      <style jsx>{`
        .animate-scroll {
          animation: scroll 5s linear infinite;
        }
        @keyframes scroll {
          20% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
