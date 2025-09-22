import { useState } from "react";
import { Recipe } from "../shared/types";

interface ImageCardFavoriteProps {
  recipe: Recipe;
  className?: string;
  onClick?: () => void | Promise<void>;
  onFavorite?: () => void;
}

export default function ImageCardStar({
  recipe,
  className,
  onClick,
  onFavorite
}: ImageCardFavoriteProps) {
  const [objectFit, setObjectFit] = useState<"cover" | "contain">("contain");

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = 300 / 200; // container width / height

    if (Math.abs(aspectRatio - containerRatio) < 0.05) {
      // If image roughly matches container ratio → fill it
      setObjectFit("cover");
    } else {
      // Otherwise → show entire image inside
      setObjectFit("contain");
    }
  };

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden w-fit bg-white ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Fixed rectangle container for image */}
      <div
        className="relative w-full flex items-center justify-center bg-white"
        style={{ height: 200, width: 300 }}
      >
        <img
          src={recipe.image_id}
          alt={recipe.title}
          className={`w-full h-full ${objectFit === "cover" ? "object-cover" : "object-contain"}`}
          draggable={false}
          onLoad={handleImageLoad}
        />

        {/* Heart inside the image area */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.();
          }}
          className="absolute top-2 left-2 p-1 hover:scale-110 transition-transform"
        >
          {recipe.isFavorite ? (
            <svg viewBox="0 0 24 24" className="h-12 w-12">
              <path
                d="M12.1 18.55l-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04 1.04 3.57 2.36h1.87C13.46 6.04 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z"
                className="fill-pink-500 stroke-[#0C343D]"
                strokeWidth="1"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-12 w-12">
              <path
                d="M12.1 18.55l-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04 1.04 3.57 2.36h1.87C13.46 6.04 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z"
                className="fill-white stroke-[#0C343D]"
                strokeWidth="1"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="w-full text-md text-black text-center py-3 font-light">
        {recipe.title}
      </div>
    </div>
  );
}
