import { useState, useEffect } from "react";
import CookbookBar from "../../cookbook_components/CookbookBar";
import ImageCard from "../../shared/components/ImageCard";
import GroceryListIngredientCard from "../../cookbook_components/GroceryListIngredientCard";
import { recipes } from "../../shared/data/dummyRecipes";
import { GroceryListIngredient, RecipeIngredient } from "../../shared/types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LOCAL_STORAGE_KEY = "boughtIngredients";

export default function GroceryList() {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    recipes.reduce((acc, recipe) => {
      acc[recipe.id] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  const [ingredientTotals, setIngredientTotals] = useState<
    Record<string, RecipeIngredient>
  >({});
  const [showBoughtModal, setShowBoughtModal] = useState(false);
  const [boughtIngredients, setBoughtIngredients] = useState<
    GroceryListIngredient[]
  >([]);

  const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [showRecommendationsModal, setShowRecommendationsModal] =
    useState(false);

  // Close modal and save updated bought ingredients
  const closeBoughtModal = () => {
    // Filter out ingredients with quantity 0
    const filtered = boughtIngredients.filter(
      (item) => Number(item.quantity) > 0
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    setBoughtIngredients(filtered); // also update state
    setShowBoughtModal(false);
  };

  const getRecipeSummaries = () => {
    return recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients.map((ri) => ({
        ingredient: ri.ingredient,
        storeQuantity: ri.storeQuantity,
        quantity: ri.quantity,
      })),
    }));
  };

  const handleRecommendRecipes = async () => {
    setLoadingRecommendations(true);

    // Get summaries
    const recipeSummaries = getRecipeSummaries();

    // Get current stored ingredients
    const storedIngredients = Object.values(boughtIngredients).map(
      (item) => item.ingredient.name
    );

    try {
      const response = await axios.post(
        "/api/ai-recipes",
        {
          storedIngredients,
          recipeSummaries,
        }
      );

      console.log(response);

      setRecommendedRecipes(response.data.recipes || []);
      setShowRecommendationsModal(true); // open modal automatically
    } catch (error) {
      console.error("Error fetching recommended recipes:", error);
      setRecommendedRecipes([]);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const increaseQuantity = (id: string) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  const decreaseQuantity = (id: string) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));

  useEffect(() => {
    const totals: Record<string, RecipeIngredient> = {};
    recipes.forEach((recipe) => {
      const recipeQty = quantities[recipe.id] || 0;
      if (recipeQty > 0) {
        recipe.ingredients.forEach((ri) => {
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
    setIngredientTotals((prev) => {
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

  const handleBoughtIngredientChange = (id: string, newQty: number) => {
    setBoughtIngredients((prev) =>
      prev.map((item) =>
        item.ingredient.id === id
          ? { ...item, quantity: newQty.toString() }
          : item
      )
    );
  };

  const openBoughtModal = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const boughtItems = JSON.parse(saved); // array of objects
      setBoughtIngredients(boughtItems);
    } else {
      setBoughtIngredients([]);
    }
    setShowBoughtModal(true);
  };

  return (
    <div className="p-10">
      <CookbookBar showMyRecipes={false} />

      <div className="mt-5 flex flex-row gap-5">
        {/* Recipes */}
        <div className="bg-white flex-[2] h-[70vh] rounded-xl overflow-y-auto p-4">
          <div className="flex flex-col items-center gap-6">
            {recipes.map((recipe) => (
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
                    className="px-2 py-1 bg-[#EB5904] cursor-pointer text-white font-bold rounded hover:bg-orange-600 transition"
                  >
                    +
                  </button>
                  <span className="bg-white px-2 py-1 rounded font-semibold text-black text-sm">
                    {quantities[recipe.id]}
                  </span>
                  <button
                    onClick={() => decreaseQuantity(recipe.id)}
                    className="px-2 py-1 bg-[#EB5904] cursor-pointer text-white font-bold rounded hover:bg-orange-600 transition"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grocery List */}
        <div className="flex-[1] flex flex-col h-[70vh]">
          {/* Bought Ingredients & Recommend Recipes Buttons */}
          <div className="flex justify-end mb-2 gap-2">
            <button
              className="px-4 py-0.5 bg-gray-400 text-white text-sm font-bold rounded-xl hover:bg-gray-500 transition"
              onClick={openBoughtModal}
            >
              :white_check_mark: View Bought Ingredients
            </button>
            <button
              className="px-4 py-0.5 bg-blue-500 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition"
              onClick={handleRecommendRecipes}
            >
              :knife_fork_plate: Recommend Recipes
            </button>
          </div>

          <div className="bg-white rounded-xl p-4 overflow-y-auto flex-1">
            <div className="flex flex-col gap-4">
              {uniqueIngredients.map((item) => (
                <GroceryListIngredientCard
                  key={item.ingredient.id}
                  item={{
                    ingredient: item.ingredient,
                    quantity: Math.ceil(item.storeQuantity).toString(),
                    purchased_status: false,
                  }}
                  startingQuantity={Math.ceil(item.storeQuantity)}
                  onQuantityChange={(newQty) =>
                    handleIngredientChange(item.ingredient.id, newQty)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Go Shopping Button Below Both */}
      <div className="mt-6 flex justify-center">
        <button
          className="px-6 py-3 bg-green-500 cursor-pointer text-white font-bold rounded-xl hover:bg-green-600 transition"
          onClick={() =>
            navigate(`/cookbook/groceryList/shopping`, {
              state: { ingredientTotals },
            })
          }
        >
          Go Shopping!
        </button>
      </div>

      {/* Modal */}
      {showBoughtModal && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] max-h-[70vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Bought Ingredients</h2>
            {boughtIngredients.length === 0 ? (
              <p>No bought ingredients found.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {boughtIngredients.map((item: GroceryListIngredient, idx) => (
                  <GroceryListIngredientCard
                    key={idx}
                    item={item}
                    startingQuantity={Math.ceil(Number(item.quantity))}
                    onQuantityChange={(newQty) =>
                      handleBoughtIngredientChange(item.ingredient.id, newQty)
                    }
                  />
                ))}
              </div>
            )}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={closeBoughtModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showRecommendationsModal && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-[500px] max-h-[70vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Recommended Recipes</h2>

            {loadingRecommendations ? (
              <p>Loading recommendations...</p>
            ) : recommendedRecipes.length === 0 ? (
              <p>No recommended recipes found.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {recommendedRecipes.map((recipe, idx) => (
                  <div
                    key={idx}
                    className="border p-2 rounded bg-gray-50 flex flex-col gap-1"
                  >
                    <p className="font-semibold">{recipe.title}</p>
                    <p>Type: {recipe.type}</p>
                    {recipe.missingIngredients.length > 0 && (
                      <p>Missing: {recipe.missingIngredients.join(", ")}</p>
                    )}
                    {recipe.ingredients.length > 0 && (
                      <p>Ingredients: {recipe.ingredients.join(", ")}</p>
                    )}
                    {recipe.instructions && (
                      <p>Instructions: {recipe.instructions}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setShowRecommendationsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}