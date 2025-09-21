import { Recipe } from "../shared/types";

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
      className={`flex flex-col border-2 rounded-lg overflow-hidden w-fit ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="relative w-full">
        <img
          src={recipe.image_id}
          alt={recipe.title}
          className="object-cover w-full"
        />

        {/* Heart inside the image area */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.();
          }}
          className="absolute top-2 left-2 p-1" // add hover
        >
          {recipe.isFavorite ? (
            // Filled heart (pink)
            <svg viewBox="0 0 24 24" className="h-12 w-12">
              <path
                d="M12.1 18.55l-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04 1.04 3.57 2.36h1.87C13.46 6.04 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z"
                className="fill-pink-500 stroke-[#0C343D]"
                strokeWidth="1"
              />
            </svg>
          ) : (
            // Outline heart
            <svg viewBox="0 0 24 24" className="h-12 w-12">
              <path
                d="M12.1 18.55l-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04 1.04 3.57 2.36h1.87C13.46 6.04 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z"
                className="stroke-[#0C343D]"
                strokeWidth="1"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Caption below the image */}
      <div className="w-full text-xl text-center py-5 font-bold">
        {recipe.title}
      </div>
    </div>
  );
}