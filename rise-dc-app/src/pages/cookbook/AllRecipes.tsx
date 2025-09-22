import { useNavigate } from "react-router";
import ImageCard from "../../shared/components/ImageCard";
import Slideshow from "../../shared/components/Slideshow";
import { recipes } from "../../shared/data/dummyRecipes";
import CookbookBar from "../../cookbook_components/CookbookBar";

// Get unique meal types from recipes
const MEAL_LABELS: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
  dessert: "Dessert",
};

export default function AllRecipes() {
  const navigate = useNavigate();
  const placeholder =
    "https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg";

  const mealTypes = [
    ...new Set(recipes.flatMap((recipe) => recipe.meal)),
  ].sort();

  return (
    <div className="p-10 flex flex-col space-y-5">
      <CookbookBar />

      <Slideshow
        title="Recipes"
        images={mealTypes.map((meal) => (
          <ImageCard
            key={meal}
            src={placeholder}
            caption={MEAL_LABELS[meal]}
            onClick={() => navigate(`/cookbook/${meal}`)}
            isSection={true}
          />
        ))}
        imagesPerRow={2}
      />
    </div>
  );
}
