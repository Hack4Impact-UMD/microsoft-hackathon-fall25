import { useNavigate, useParams } from "react-router-dom";
import { Recipe } from "../../shared/types";
import { getRecipe, toggleFavorite } from "../../shared/data/dummyRecipes";
import { useState } from "react";
import Button from "../../cookbook_components/Button";

export default function RecipeComplete() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();

  const [objectFit, setObjectFit] = useState<"cover" | "contain">("contain");
  const [isRectangle, setIsRectangle] = useState(false);

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = 4 / 3; // match h-80 w-full container ratio

    setObjectFit(
      Math.abs(aspectRatio - containerRatio) < 0.05 ? "cover" : "contain"
    );

    setIsRectangle(aspectRatio > 1.2 || aspectRatio < 0.8);
  };

  if (!recipeId) return <div>Recipe ID not found</div>;

  const recipe: Recipe | undefined = getRecipe(recipeId);
  if (!recipe) return <div>Recipe not found!</div>;

  return (
    <div className="p-10 mt-10 flex justify-center">
      <div className="flex flex-col items-center w-full max-w-xl">
        <div
          className="flex items-center justify-center bg-white border w-full"
          style={{ height: "20rem", borderColor: "#707070" }}
        >
          <img
            src={recipe.image_id}
            className={`${isRectangle ? "w-[90%] h-[90%]" : "w-3/4 h-3/4"} ${
              objectFit === "cover" ? "object-cover" : "object-contain"
            }`}
            draggable={false}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="flex flex-col justify-center mt-4 gap-4">
          <Button
            className="py-2 text-2xl font-light flex items-center bg-white"
            label={<span className="flex items-center">Back to Recipes</span>}
            onClick={() => toggleFavorite(recipeId)}
          />
          <Button
            className="py-2 text-2xl font-light flex items-center"
            label={<span className="flex items-center">Back to Recipes</span>}
            onClick={() => {
              navigate(`/cookbook/all-recipes`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
