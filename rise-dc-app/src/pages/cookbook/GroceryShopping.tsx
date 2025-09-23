import { useLocation } from "react-router-dom";
import { useState } from "react";
import GroceryListIngredientCard from "../../cookbook_components/GroceryListIngredientCard";
import { GroceryListIngredient } from "../../shared/types";
import CookbookBar from "../../cookbook_components/CookbookBar";

const LOCAL_STORAGE_KEY = "boughtIngredients";

export default function GroceryShopping() {
  const location = useLocation();
  const ingredientTotals: Record<string, GroceryListIngredient> =
    location.state?.ingredientTotals || {};

  // Initialize ingredients
  const allIngredients = Object.values(ingredientTotals).map((item) => ({
    ...item,
    bought: false,
  }));

  const [ingredients, setIngredients] = useState(allIngredients);

  // Update quantity in state
  const handleQuantityChange = (id: string, newQty: number) => {
    setIngredients((prev) =>
      prev.map((item) =>
        item.ingredient.id === id
          ? { ...item, storeQuantity: newQty, quantity: newQty.toString() }
          : item
      )
    );
  };

  // Toggle bought status (state only)
  const toggleBought = (id: string) => {
    setIngredients((prev) =>
      prev.map((item) =>
        item.ingredient.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  // Checkout button handler — saves only bought items
  const handleCheckout = () => {
    const boughtItems = ingredients.filter((item) => item.bought);

    // Get existing bought ingredients from localStorage
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existingItems: GroceryListIngredient[] = existing
      ? JSON.parse(existing)
      : [];

    // Combine existing with new bought items (avoid duplicates by id)
    const combined = [
      ...existingItems.filter(
        (ei) => !boughtItems.some((bi) => bi.ingredient.id === ei.ingredient.id)
      ),
      ...boughtItems,
    ];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(combined));
    alert("Bought ingredients appended!");
  };

  const notBought = ingredients.filter((item) => !item.bought);
  const bought = ingredients.filter((item) => item.bought);

  return (
    <div className="p-10">
      <CookbookBar showMyRecipes={false} />
      <h1 className="text-2xl font-bold mb-6 mt-5">Grocery Shopping</h1>

      <div className="flex gap-10">
        {/* Not Bought */}
        <div className="flex-1 bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl text-black font-semibold mb-4">Not Bought</h2>
          <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto">
            {notBought.map((item) => (
              <div
                key={item.ingredient.id}
                onClick={() => toggleBought(item.ingredient.id)}
                className="cursor-pointer"
              >
                <GroceryListIngredientCard
                  item={item}
                  hideButtons={true}
                  startingQuantity={Math.ceil(Number(item.quantity))}
                  onQuantityChange={(newQty) =>
                    handleQuantityChange(item.ingredient.id, newQty)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bought */}
        <div className="flex-1 bg-green-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-black">Bought</h2>
          <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto">
            {bought.map((item) => (
              <div
                key={item.ingredient.id}
                onClick={() => toggleBought(item.ingredient.id)}
                className="cursor-pointer"
              >
                <GroceryListIngredientCard
                  item={item}
                  hideButtons={true}
                  startingQuantity={Math.ceil(Number(item.quantity))}
                  onQuantityChange={(newQty) =>
                    handleQuantityChange(item.ingredient.id, newQty)
                  }
                />
              </div>
            ))}
          </div>

          {/* Checkout Button */}
          <button
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
