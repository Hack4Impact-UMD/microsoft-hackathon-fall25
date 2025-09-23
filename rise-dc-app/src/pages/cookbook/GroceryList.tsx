import { useState, useEffect } from "react";
import CookbookBar from "../../cookbook_components/CookbookBar";
import ImageCard from "../../shared/components/ImageCard";
import GroceryListIngredientCard from "../../cookbook_components/GroceryListIngredientCard";
import { recipes } from "../../shared/data/dummyRecipes";
import { RecipeIngredient } from "../../shared/types";

export default function GroceryList() {
  // Track recipe quantities
  const [quantities, setQuantities] = useState<Record<string, number>>(
    recipes.reduce((acc, recipe) => {
      acc[recipe.id] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  // Track ingredient totals separately
  const [ingredientTotals, setIngredientTotals] = useState<Record<string, RecipeIngredient>>({});
  console.log(ingredientTotals)

  const increaseQuantity = (id: string) => setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  const decreaseQuantity = (id: string) =>
    setQuantities(prev => ({ ...prev, [id]: prev[id] > 0 ? prev[id] - 1 : 0 }));

  // Recompute ingredient totals whenever recipe quantities change
  useEffect(() => {
    const totals: Record<string, RecipeIngredient> = {};
    console.log(totals)

    recipes.forEach(recipe => {
      const recipeQty = quantities[recipe.id] || 0;
      if (recipeQty > 0) {
        recipe.ingredients.forEach(ri => {
          const totalQty = ri.storeQuantity * recipeQty;
          if (!totals[ri.ingredient.id]) {
            totals[ri.ingredient.id] = {
              ingredient: ri.ingredient,
              quantity: totalQty.toString(),
              storeQuantity: totalQty,
            };
          } else {
            const prev = totals[ri.ingredient.id];
            const newStoreQty = prev.storeQuantity + totalQty;
            totals[ri.ingredient.id] = {
              ingredient: ri.ingredient,
              quantity: newStoreQty.toString(),
              storeQuantity: newStoreQty,
            };
          }
        });
      }
    });

    setIngredientTotals(totals);
  }, [quantities]);

  const uniqueIngredients = Object.values(ingredientTotals);

  const handleIngredientChange = (id: string, newQty: number) => {
    setIngredientTotals(prev => {
      const updated = { ...prev };
      if (updated[id]) {
        updated[id] = {
          ...updated[id],
          storeQuantity: newQty,
          quantity: newQty.toString(),
        };
      }
      return updated;
    });
  };

  return (
    <div className="p-10">
      <CookbookBar showMyRecipes={false} />

      <div className="mt-5 flex flex-row gap-5">
        {/* Recipes */}
        <div className="bg-white flex-[2] h-[70vh] rounded-xl overflow-y-auto p-4">
          <div className="flex flex-col items-center gap-6">
            {recipes.map(recipe => (
              <div key={recipe.id} className="w-full max-w-[90%] relative">
                <ImageCard
                  src={recipe.image_id || ""}
                  alt={recipe.title}
                  caption={recipe.title}
                  height={150}
                  className="w-full border-black border-2 relative"
                />
                <div className="absolute top-10 right-2 flex flex-col items-center gap-1">
                  <button
                    onClick={() => increaseQuantity(recipe.id)}
                    className="px-2 py-1 bg-[#EB5904] text-white font-bold rounded hover:bg-orange-600 transition"
                  >
                    +
                  </button>
                  <span className="bg-white px-2 py-1 rounded font-semibold text-black text-sm">
                    {quantities[recipe.id]}
                  </span>
                  <button
                    onClick={() => decreaseQuantity(recipe.id)}
                    className="px-2 py-1 bg-[#EB5904] text-white font-bold rounded hover:bg-orange-600 transition"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grocery List */}
        <div className="bg-white flex-[1] h-[70vh] rounded-xl p-4 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {uniqueIngredients.map(item => (
              <GroceryListIngredientCard
                key={item.ingredient.id}
                item={{
                  ingredient: item.ingredient,
                  quantity: Math.ceil(item.storeQuantity).toString(),
                  purchased_status: false,
                }}
                startingQuantity={Math.ceil(item.storeQuantity)}
                onQuantityChange={newQty => handleIngredientChange(item.ingredient.id, newQty)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
