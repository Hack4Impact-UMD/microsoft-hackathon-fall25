import { Recipe } from "../shared/types";
import { useState } from "react";
import { DropdownMenu } from "radix-ui";
import AddIcon from "@mui/icons-material/Add";
import { twMerge } from "tailwind-merge";
import MultipleSelectOption from "./MultipleSelectOption";
import moment from "moment";

export type MealType = Recipe["meal"][number];

interface MealPlanCellProps extends React.HTMLAttributes<HTMLButtonElement> {
  date: string;
  recipeOptions: Recipe[];
  mealType: MealType;
  onRecipeSelect: (recipe: Recipe) => void;
}

export default function MealPlanCell(props: MealPlanCellProps) {
  const { recipeOptions, mealType, onRecipeSelect, date, className, ...rest } =
    props;
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const baseClasses =
    "relative inline-flex flex-col items-center justify-center rounded-[20px] bg-white shadow-sm transition-colors focus:outline-none focus-visible:ring-2 ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-[77.5px] h-[112.83px] p-[7px] cursor-pointer";

  const stateClasses = selectedRecipeId
    ? "border border-gray-200 hover:bg-gray-50 focus-visible:ring-sky-500 justify-between"
    : "border-transparent text-gray-400 hover:bg-gray-50 focus-visible:ring-sky-500";

  const handleRecipeSelect = (recipe: Recipe, checked: boolean) => {
    setSelectedRecipeId(checked ? recipe.id : null);
    onRecipeSelect(recipe);
  };

  const isToday = props.date === moment().date().toString();

  const recipe =
    recipeOptions.find((recipe) => recipe.id === selectedRecipeId) || undefined;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger {...rest}>
        <div
          className={twMerge(
            baseClasses,
            stateClasses,
            isToday && "ring-2 ring-sky-500 ring-offset-1",
            className,
          )}
        >
          {recipe ? (
            <>
              {recipe.image_id && (
                <img
                  src={recipe.image_id}
                  alt={recipe.name}
                  className="w-full h-auto object-cover rounded-md"
                />
              )}
              <span className="text-xs font-medium text-gray-700 text-center truncate w-full">
                {recipe.name}
              </span>
            </>
          ) : (
            <AddIcon sx={{ fontSize: 40 }} />
          )}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="flex flex-col gap-3 bg-white">
          {recipeOptions.map((recipe) => (
            <DropdownMenu.Item>
              <MultipleSelectOption
                checked={recipe.id === selectedRecipeId}
                item={recipe}
                src={recipe.image_id}
                quantity={10}
                onToggle={handleRecipeSelect}
              />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
