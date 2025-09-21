import { Recipe } from "../types";

interface ImageCardStarProps {
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
}: ImageCardStarProps) {

  return (
    <div 
      className={`flex flex-col border-2 rounded-lg w-fit ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="relative w-full">
        <img
          src={recipe.image_id}
          alt={recipe.title}
          className="object-cover rounded-t-lg w-full"
        />

        {/* Heart inside the image area */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.();
          }}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white shadow"
        >
          {recipe.isFavorite ? (
            // Filled heart (pink)
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-pink-500">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.13 2.44h.74C14.09 5 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            // Outline heart
            <svg viewBox="0 0 24 24" className="h-6 w-6">
              <path
                d="M12.1 18.55l-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04 1.04 3.57 2.36h1.87C13.46 6.04 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z"
                className="fill-transparent stroke-pink-500"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Caption below the image */}
      <div className="w-full text-xl text-center py-5 font-bold rounded-b-lg">
        {recipe.title}
      </div>
    </div>
  );
}