import { useMemo } from "react";
import { useNavigate } from "react-router";

import Slideshow from "../../shared/components/Slideshow";
import ImageCardStar from "../../shared/components/ImageCardStar";
import { useFavorites, FavoriteRecipe } from "../../shared/state/FavoritesContext";
import { RecipeCategory } from "../../shared/types";

const CATEGORY_ORDER: RecipeCategory[] = [
  "breakfast",
  "lunchDinner",
  "snack",
  "dessert",
];

const CATEGORY_LABELS: Record<RecipeCategory, string> = {
  breakfast: "Breakfast",
  lunchDinner: "Lunch/Dinner",
  snack: "Snack",
  dessert: "Dessert",
};

export default function MyRecipes() {
  const navigate = useNavigate();
  const { favoriteList } = useFavorites();

  const favoritesByCategory = useMemo(
    () =>
      favoriteList.reduce(
        (acc, recipe) => {
          acc[recipe.category] = acc[recipe.category] || [];
          acc[recipe.category]!.push(recipe);
          return acc;
        },
        {} as Partial<Record<RecipeCategory, FavoriteRecipe[]>>,
      ),
    [favoriteList],
  );

  return (
    <div className="p-10 flex flex-col space-y-5">
      <button onClick={() => navigate({ pathname: "/cookbook" })}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.6654 34.0297C32.5876 29.0519 28.9665 26.2275 25.802 25.5563C22.6376 24.8852 19.6248 24.7838 16.7637 25.2522V34.1663L3.33203 19.6205L16.7637 5.83301V14.3055C22.0543 14.3472 26.552 16.2452 30.257 19.9997C33.9615 23.7541 36.0976 28.4308 36.6654 34.0297Z"
            fill="black"
            stroke="black"
            strokeWidth="3.33333"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <h1 className="text-3xl font-bold">My Recipes</h1>

      {favoriteList.length === 0 ? (
        <p className="text-lg text-gray-700">
          Star recipes to save them. Your favorites will appear here.
        </p>
      ) : (
        CATEGORY_ORDER.map((category) => {
          const recipes = favoritesByCategory[category];

          if (!recipes || recipes.length === 0) {
            return null;
          }

          return (
            <div key={category} className="space-y-3">
              <h2 className="text-2xl font-semibold">
                {CATEGORY_LABELS[category]}
              </h2>
              <Slideshow
                title=""
                images={recipes.map((recipe) => (
                  <ImageCardStar
                    key={recipe.id}
                    recipeId={recipe.id}
                    src={recipe.src}
                    caption={recipe.caption}
                    category={recipe.category}
                  />
                ))}
                imagesPerRow={2}
              />
            </div>
          );
        })
      )}
    </div>
  );
}
