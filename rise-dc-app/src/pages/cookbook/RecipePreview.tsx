import { useNavigate, useParams } from "react-router-dom";
import { getRecipe } from "../../shared/data/dummyRecipes";
import { Recipe } from "../../shared/types";
import BackButton from "../../cookbook_components/BackButton";
import { useState } from "react";
import Servings from "../../cookbook_components/Servings";
import AudioButton from "../../shared/components/AudioButton";
import Slideshow from "../../shared/components/Slideshow";
import ImageCard from "../../shared/components/ImageCard";
import MultiSelectGroup from "../../shared/components/MultiSelectButton";
import Button from "../../cookbook_components/Button";

function formatList(
  items: string[],
  singularLabel: string,
  pluralLabel: string,
) {
  if (items.length === 0) return "";
  if (items.length === 1) return `${singularLabel} is ${items[0]}.`;
  if (items.length === 2)
    return `${pluralLabel} are ${items[0]} and ${items[1]}.`;

  const allButLast = items.slice(0, -1).join(", ");
  const last = items[items.length - 1];
  return `${pluralLabel} are ${allButLast}, and ${last}.`;
}

export default function RecipePreview() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe: Recipe | undefined = recipeId ? getRecipe(recipeId) : undefined;
  const navigate = useNavigate();

  const [objectFit, setObjectFit] = useState<"cover" | "contain">("contain");

  if (!recipe) {
    return <span>Recipe {recipeId} not found!</span>;
  }

  const totalSteps = recipe.instructions.length;

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const img = e.currentTarget;
    const containerRatio = 16 / 9;
    const aspectRatio = img.naturalWidth / img.naturalHeight;

    setObjectFit(
      Math.abs(aspectRatio - containerRatio) < 0.05 ? "cover" : "contain",
    );
  };

  return (
    <div className="flex flex-col p-10">
      <BackButton />

      {/* Image container */}
      <div
        className="w-full flex justify-center bg-white border-black border-5 overflow-hidden mt-5"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={recipe.image_id}
          alt={recipe.title}
          className={`w-full h-full ${
            objectFit === "cover" ? "object-cover" : "object-contain"
          }`}
          onLoad={handleImageLoad}
          draggable={false}
        />
      </div>

      {recipe.title && (
        <div className="text-3xl font-semibold mt-5">{recipe.title}</div>
      )}

      <div className="mt-6 text-lg">
        <span className="font-bold">Time: </span>
        <span>{recipe.time}</span>
      </div>

      <div className="flex flex-row items-center mt-5">
        <span className="font-bold">Servings:</span>
        <div>
          <Servings count={4} className="ml-3" />
        </div>
      </div>

      <div className="mt-8 h-px bg-white"></div>

      <div className="mt-8 text-2xl flex flex-row items-center gap-4">
        <span className="font-light">You will need:</span>
        <AudioButton
          className="ml-1"
          text={[
            formatList(
              recipe.tools.map((t) => t.name),
              "The appliance you will need",
              "The appliances you will need",
            ),
            formatList(
              recipe.utensils.map((u) => u.name),
              "The utensil you will need",
              "The utensils you will need",
            ),
            formatList(
              recipe.ingredients.map(
                (i) => `${i.quantity} of ${i.ingredient.name}`,
              ),
              "The ingredient you will need",
              "The ingredients you will need",
            ),
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>

      <div className="mt-8">
        <Slideshow
          title="Appliances"
          images={recipe.tools.map((t) => (
            <ImageCard
              key={t.name}
              src={t.image_id}
              caption={t.name}
              howToUseOnClick={() => console.log(`Use ${t.name}`)}
            />
          ))}
          imagesPerRow={3}
        />
      </div>

      <div className="mt-10">
        <Slideshow
          title="Utensils"
          images={recipe.utensils.map((t) => (
            <ImageCard key={t.name} src={t.image_id} caption={t.name} />
          ))}
          imagesPerRow={2}
        />
      </div>

      <div className="mt-8">
        <MultiSelectGroup
          question="Ingredients"
          items={recipe.ingredients.map((i) => ({
            ...i.ingredient,
            quantity: i.quantity,
          }))}
          value={[]}
          onOptionSelect={(selected) =>
            console.log("Selected Ingredients:", selected)
          }
        />
      </div>

      <div className="mt-8 h-px bg-white"></div>

      <div className="flex justify-center items-center">
        <Button
          className="mt-10 py-2 text-2xl font-light"
          label="Start Recipe!"
          onClick={() =>
            navigate(`/cookbook/recipe/${recipeId}/1`, {
              state: { totalSteps },
            })
          }
        />
      </div>
    </div>
  );
}
