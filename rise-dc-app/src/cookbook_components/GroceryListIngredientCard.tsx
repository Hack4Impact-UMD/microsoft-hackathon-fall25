import { GroceryListIngredient } from "../shared/types";
import { useState, useEffect } from "react";

type GroceryListIngredientCardProps = {
  item: GroceryListIngredient;
  startingQuantity?: number;
  onQuantityChange?: (newQty: number) => void;
  hideButtons?: boolean; // new prop
};

export default function GroceryListIngredientCard({
  item,
  startingQuantity,
  onQuantityChange,
  hideButtons = false, // default to false
}: GroceryListIngredientCardProps) {
  const { ingredient, quantity } = item;
  const [currentQuantity, setCurrentQuantity] = useState<number>(
    startingQuantity ?? Number(quantity),
  );

  useEffect(() => {
    setCurrentQuantity(startingQuantity ?? Number(quantity));
  }, [startingQuantity, quantity]);

  const updateQuantity = (newQty: number) => {
    setCurrentQuantity(newQty);
    onQuantityChange?.(newQty);
  };

  return (
    <div className="flex w-full max-w-xs flex-col md:flex-row items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4">
      {/* Image & Name */}
      <div className="flex flex-col items-center md:items-start gap-2">
        <img
          className="h-24 w-24 object-cover rounded-md"
          src={ingredient.image_id}
          alt={ingredient.name}
        />
        <p className="text-center md:text-left text-black font-semibold">
          {ingredient.name}
        </p>
      </div>

      {/* Quantity Controls (Vertical) */}
      <div className="flex flex-col items-center gap-1">
        {!hideButtons && (
          <button
            className="w-8 h-8 flex items-center justify-center rounded cursor-pointer bg-gray-200 text-lg font-bold"
            onClick={() => updateQuantity(currentQuantity + 1)}
          >
            +
          </button>
        )}

        <input
          type="number"
          className="w-8 text-center border border-gray-300 text-black rounded px-1"
          value={currentQuantity}
          onChange={(e) => updateQuantity(Math.max(0, Number(e.target.value)))}
          disabled={hideButtons} // input disabled if hideButtons is true
        />

        {!hideButtons && (
          <button
            className="w-8 h-8 flex items-center justify-center rounded bg-gray-200 cursor-pointer text-lg font-bold"
            onClick={() => updateQuantity(Math.max(0, currentQuantity - 1))}
          >
            -
          </button>
        )}
      </div>
    </div>
  );
}
