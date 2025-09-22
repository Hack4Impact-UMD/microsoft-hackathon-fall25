import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../Page.module.css";
import ImageCardStar from "../../cookbook_components/ImageCardFavorite";
import { Recipe } from "../../shared/types";
import {
  recipes as dummyRecipes,
  toggleFavorite,
} from "../../shared/data/dummyRecipes";
import CookbookBar from "../../cookbook_components/CookbookBar";
import Slideshow from "../../shared/components/Slideshow";

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
      <CookbookBar />

      {filteredRecipes.length === 0 ? (
        <p>No recipes found for {mealTitles[meal]}.</p>
      ) : (
        <Slideshow
          title={`${mealTitles[meal]}`}
          images={filteredRecipes.map((recipe) => (
            <ImageCardStar
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/cookbook/recipe/${recipe.id}`)}
              onFavorite={() => handleToggleFavorite(recipe.id)}
            />
          ))}
          imagesPerRow={2}
        />
      )}
    </div>
  );
}
