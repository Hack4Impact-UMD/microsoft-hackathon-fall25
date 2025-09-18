import { useEffect, useMemo } from "react";

import { FavoriteRecipe, useFavorites } from "../state/FavoritesContext";
import { RecipeCategory } from "../types";

interface ImageCardStarProps {
  recipeId: string;
  src: string;
  caption: string;
  category: RecipeCategory;
  defaultFavorite?: boolean;
  className?: string;
}

export default function ImageCardStar({
  recipeId,
  src,
  caption,
  category,
  defaultFavorite = false,
  className,
}: ImageCardStarProps) {
  const { isFavorite, toggleFavorite, addFavorite } = useFavorites();

  const isFav = isFavorite(recipeId);

  const recipe: FavoriteRecipe = useMemo(
    () => ({
      id: recipeId,
      src,
      caption,
      category,
    }),
    [category, caption, recipeId, src],
  );

  useEffect(() => {
    if (defaultFavorite) {
      addFavorite(recipe);
    }
  }, [addFavorite, defaultFavorite, recipe]);

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
          onClick={() => toggleFavorite(recipe)}
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
