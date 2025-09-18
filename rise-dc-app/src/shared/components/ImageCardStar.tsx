import { useState } from "react";

interface ImageCardStarProps {
  src: string;
  caption: string;
  defaultFavorite?: boolean;
  className?: string;
}

export default function ImageCardStar({
  src,
  caption,
  defaultFavorite = false,
  className,
}: ImageCardStarProps) {
  const [isFav, setIsFav] = useState(defaultFavorite);

  return (
    <div className={`flex flex-col border-2 rounded-lg w-fit ${className}`}>
      <div className="relative w-full">
        <img
          src={src}
          alt={caption}
          className="object-cover rounded-t-lg w-full"
        />

        {/* Star inside the image area */}
        <button
          type="button"
          onClick={() => setIsFav((prev) => !prev)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white shadow"
        >
          {isFav ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-yellow-400">
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6">
              <path
                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                className="fill-transparent stroke-yellow-400"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Caption below the image */}
      {caption && (
        <div className="w-full text-xl text-center py-5 font-bold rounded-b-lg">
          {caption}
        </div>
      )}
    </div>
  );
}