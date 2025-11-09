import { useNavigate } from "react-router";
import ImageCard from "../../shared/components/ImageCard";
import Slideshow from "../../shared/components/Slideshow";
import { recipes } from "../../shared/data/dummyRecipes";
import CookbookBar from "../../cookbook_components/CookbookBar";

const placeholder =
  "https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg";
const MEAL_INFO: Record<string, { label: string; image: string }> = {
  breakfast: {
    label: "Breakfast",
    image: "/breakfast.png",
  },
  lunch: {
    label: "Lunch",
    image: "/lunch.png",
  },
  dinner: {
    label: "Dinner",
    image: "/dinner.webp",
  },
  snack: {
    label: "Snack",
    image: "/snack.png",
  },
  dessert: {
    label: "Dessert",
    image: "/dessert.png",
  },
};

export default function AllRecipes() {
  const navigate = useNavigate();

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
            src={MEAL_INFO[meal]?.image || placeholder}
            caption={MEAL_INFO[meal]?.label || meal}
            onClick={() => navigate(`/cookbook/${meal}`)}
            isSection={true}
          />
        ))}
        imagesPerRow={2}
      />
    </div>
  );
}
