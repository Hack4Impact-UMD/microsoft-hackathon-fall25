import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../Page.module.css";
import ImageCardStar from "../../cookbook_components/ImageCardFavorite";
import { Recipe } from "../../shared/types";
import {
  recipes as dummyRecipes,
  toggleFavorite,
} from "../../shared/data/dummyRecipes";

const mealTitles: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
  dessert: "Dessert",
};

type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "dessert";

export default function RecipesByMeal() {
  const { meal } = useParams<{ meal: string }>();
  const navigate = useNavigate();

  // Use local state to trigger re-renders
  const [recipesState, setRecipesState] = useState<Recipe[]>(dummyRecipes);

  if (!meal || !(meal in mealTitles)) {
    return <div>Meal type not found</div>;
  }

  const filteredRecipes = recipesState.filter((recipe) =>
    recipe.meal.includes(meal as MealType)
  );

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);

    setRecipesState([...dummyRecipes]);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => navigate("/cookbook/all-recipes")}>
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

      <h1>{mealTitles[meal]}</h1>

      {filteredRecipes.length === 0 ? (
        <p>No recipes found for {mealTitles[meal]}.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => (
            <ImageCardStar
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/cookbook/recipe/${recipe.id}`)}
              onFavorite={() => handleToggleFavorite(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
