import { useMemo } from "react";
import { useNavigate } from "react-router";
import Slideshow from "../../shared/components/Slideshow";
import { Recipe } from "../../shared/types";
import { recipes } from "../../shared/data/dummyRecipes";
import ImageCard from "../../shared/components/ImageCard";
import BackButton from "../../cookbook_components/BackButton";

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
      <BackButton pathname="/cookbook" />

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