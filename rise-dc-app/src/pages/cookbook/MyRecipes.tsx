import { useMemo } from "react";
import { useNavigate } from "react-router";
import Slideshow from "../../shared/components/Slideshow";
import ImageCardStar from "../../shared/components/ImageCardStar";
import { Recipe } from "../../shared/types";
import { recipes } from "../../shared/data/dummyRecipes";
import ImageCard from "../../shared/components/ImageCard";

const MEAL_ORDER = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "dessert",
];

const MEAL_LABELS: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
  dessert: "Dessert",
};

export default function MyRecipes() {
  const navigate = useNavigate();
  const favoriteList = useMemo(() => recipes.filter(recipe => recipe.isFavorite), []);

  const favoritesByMeal = useMemo(
    () =>
      favoriteList.reduce(
        (acc, recipe) => {
          recipe.meal.forEach(mealType => {
            acc[mealType] = acc[mealType] || [];
            acc[mealType]!.push(recipe);
          });
          return acc;
        },
        {} as Record<string, Recipe[]>,
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
        MEAL_ORDER.map((meal) => {
          const recipes = favoritesByMeal[meal];

          if (!recipes || recipes.length === 0) {
            return null;
          }

          return (
            <div key={meal} className="space-y-3">
              <h2 className="text-2xl font-semibold">
                {MEAL_LABELS[meal]}
              </h2>
              <Slideshow
                title=""
                images={recipes.map((recipe) => (
                  <ImageCard
                    key={recipe.id}
                    src={recipe.image_id}
                    caption={recipe.title}
                    onClick={() => navigate(`/cookbook/recipe/${recipe.id}`)}
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