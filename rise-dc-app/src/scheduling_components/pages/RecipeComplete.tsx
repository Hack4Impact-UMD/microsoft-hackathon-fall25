import { useNavigate, useParams } from "react-router-dom";
import { Recipe } from "../../shared/types";
import { getRecipe, toggleFavorite } from "../../shared/data/dummyRecipes";
import { useState } from "react";
import Button from "../../cookbook_components/Button";
import AudioButton from "../../shared/components/AudioButton";

export default function RecipeComplete() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();

  const [objectFit, setObjectFit] = useState<"cover" | "contain">("contain");
  const [isRectangle, setIsRectangle] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // <-- track favorite status

  function getArticle(word: string) {
    return /^[aeiou]/i.test(word) ? "an" : "a";
  }

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

  const handleFavoriteClick = () => {
    toggleFavorite(recipeId);
    setIsFavorite((prev) => !prev); // toggle state
  };

  return (
    <div className="p-10 mt-40 flex justify-center">
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
        <div className="flex flex-row items-center justify-center gap-3 mt-10">
          <span className="font-bold text-2xl">
            You've made {getArticle(recipe.title)} {recipe.title}!
          </span>
          <AudioButton
            text={`You've made ${getArticle(recipe.title)} ${recipe.title}!`}
            className="w-10 h-10"
          />
        </div>

        <div className="flex flex-col justify-center mt-4 gap-4">
          <button
            onClick={handleFavoriteClick}
            className={`px-5 py-2 rounded-xl cursor-pointer font-semibold shadow-md text-black transition duration-200
              ${
                isFavorite
                  ? "bg-pink-100"
                  : "bg-white hover:bg-[#0B4F8C] hover:text-white"
              }`}
          >
            {isFavorite ? "❤️ Added to Favorites" : "♡ Add to Favorites"}
          </button>

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
