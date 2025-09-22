import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../Page.module.css";
import ImageCardStar from "../../cookbook_components/ImageCardFavorite";
import { Recipe } from "../../shared/types";
import {
  recipes as dummyRecipes,
  toggleFavorite,
} from "../../shared/data/dummyRecipes";
import BackButton from "../../cookbook_components/BackButton";

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
      <BackButton pathname="/cookbook/all-recipes" />

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
