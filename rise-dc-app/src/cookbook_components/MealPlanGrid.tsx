import moment from "moment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useMemo } from "react";
import MealPlanCell, { MealType } from "./MealPlanCell";
import { Recipe } from "../shared/types";
import useAllRecipes from "../shared/hooks/recipes/useAllRecipes";

export type AssignedMap = Record<
  string,
  Partial<Record<MealType, { id: string; name: string; image?: string }>>
>;

interface MealPlanGridProps extends React.HTMLAttributes<HTMLDivElement> {
  startDate?: Date;
  weekStartsOn?: "monday" | "sunday";
  mealTypes?: MealType[];
  assigned?: AssignedMap;
  onWeekChange?: (newAnchorDate: Date) => void;
  onAdd?: (info: { dateISO: string; mealType: MealType }) => void;
  onOpen?: (info: {
    dateISO: string;
    mealType: MealType;
    recipe: { id: string; name: string; image?: string };
  }) => void;
}

function getStartOfWeek(anchor: Date, weekStartsOn: "monday" | "sunday") {
  const m = moment(anchor);
  return weekStartsOn === "monday"
    ? m.clone().startOf("week").add(1, "day")
    : m.clone().startOf("week");
}

const DEFAULT_MEAL_TYPES: MealType[] = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "dessert",
];

export default function MealPlanGrid({
  startDate,
  weekStartsOn = "monday",
  mealTypes = DEFAULT_MEAL_TYPES,
  assigned = {},
  onWeekChange,
  onAdd,
  onOpen,
  className = "",
  ...rest
}: MealPlanGridProps) {
  const [anchorDate, setAnchorDate] = React.useState<Date>(
    startDate ?? new Date()
  );

  const startOfWeek = React.useMemo(
    () => getStartOfWeek(anchorDate, weekStartsOn),
    [anchorDate, weekStartsOn]
  );
  const days = React.useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, "day")),
    [startOfWeek]
  );
  const monthTitle = startOfWeek.format("MMMM YYYY");

  const changeWeek = (deltaDays: number) => {
    const newAnchor = moment(anchorDate).add(deltaDays, "days").toDate();
    setAnchorDate(newAnchor);
    onWeekChange?.(newAnchor);
  };

  // Card inner size after padding: 704x804 with 32px padding each side => 640x740
  const cardInnerWidth = 704 - 32 * 2;
  const cardInnerHeight = 804 - 32 * 2;
  const gapPx = 12; // tighter gutter so everything fits without scroll

  // Base cell size (from MealPlanCell design)
  const baseCellW = 77.5;
  const baseCellH = 112.83;
  const columnHeaderHeight = 60;

  // Narrower row header so 7 day columns fit
  const rowHeaderWidth = 90; // px

  // Height available for grid body = innerHeight - header (fixed) - spacing below header
  const headerHeight = 56;
  const headerSpacing = 16; // mb-4
  const gridAvailableHeight = cardInnerHeight - headerHeight - headerSpacing;

  // Compute scale to satisfy BOTH width and height constraints
  const scaleWidth =
    (cardInnerWidth - rowHeaderWidth - gapPx * 7) / (7 * baseCellW);
  const scaleHeight =
    (gridAvailableHeight - columnHeaderHeight - gapPx * 5) / (5 * baseCellH);
  const scale = Math.max(0.6, Math.min(1, Math.min(scaleWidth, scaleHeight)));
  const dayColWidth = baseCellW * scale;

  //  const allRecipes = useAllRecipes();

  const allRecipes: { data: Recipe[] } = {
    data: [
      {
        id: "123",
        image_id: "../scheduling_components/icon_components/back.png",
        ingredients: [],
        instructions: [],
        meal: ["breakfast"],
        name: "test",
        noCook: false,
        servingSize: 1,
        time: "",
        utensils: [],
        tools: [],
        nutrition: [],
      },
      {
        id: "456",
        image_id: "456",
        ingredients: [],
        instructions: [],
        meal: ["breakfast"],
        name: "test",
        noCook: false,
        servingSize: 1,
        time: "",
        utensils: [],
        tools: [],
        nutrition: [],
      },
    ],
  };

  const recipesByMeal = useMemo(() => {
    const recipesByMeal: { [key in MealType]: Recipe[] } = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
      dessert: [],
    };
    allRecipes.data?.forEach((recipe) => {
      for (const meal of recipe.meal) {
        recipesByMeal[meal as MealType].push(recipe);
      }
    });
    return recipesByMeal;
  }, [allRecipes.data]);

  return (
    <div
      className={`p-8 w-[704px] h-[804px] rounded-[20px] bg-white ${className}`}
      {...rest}
    >
      {/* Top month header with week navigation */}
      <div className="w-full h-[56px] flex items-center justify-center gap-3 mb-4">
        <button
          aria-label="Previous week"
          onClick={() => changeWeek(-7)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronLeftIcon />
        </button>
        <h2 className="text-2xl font-semibold">{monthTitle}</h2>
        <button
          aria-label="Next week"
          onClick={() => changeWeek(7)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Grid area fits entirely within the fixed card without horizontal scroll */}
      <div>
        <div className="inline-block">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `${rowHeaderWidth}px repeat(7, ${dayColWidth}px)`,
              gap: `${gapPx}px`,
            }}
          >
            {/* Column headers row */}
            <div />
            {days.map((d) => (
              <div
                key={`hdr-${d.format("YYYY-MM-DD")}`}
                className="rounded-[16px] border border-gray-200 bg-white flex flex-col items-center justify-center"
                style={{ height: `${columnHeaderHeight}px` }}
              >
                <div className="text-sm text-gray-700 leading-tight">
                  {d.format("ddd")}
                </div>
                <div className="text-base font-medium leading-tight">
                  {d.format("D")}
                </div>
              </div>
            ))}

            {/* Body rows */}
            {mealTypes.map((mt) => (
              <React.Fragment key={`row-${mt}`}>
                {/* Row header */}
                <div
                  className="rounded-[16px] border border-gray-200 bg-white flex flex-col items-center justify-center p-2"
                  style={{ height: `${baseCellH * scale}px` }}
                >
                  <div className="text-2xl mb-2">
                    {mt === "breakfast"
                      ? "🍳"
                      : mt === "lunch"
                      ? "🥪"
                      : mt === "dinner"
                      ? "🍽️"
                      : mt === "snack"
                      ? "🥨"
                      : "🧁"}
                  </div>
                  <div className="text-sm font-medium text-gray-700 capitalize">
                    {mt}
                  </div>
                </div>

                {/* Day cells */}
                {days.map((d) => {
                  const iso = d.format("YYYY-MM-DD");
                  const recipe = assigned?.[iso]?.[mt] ?? null;
                  return (
                    <div
                      key={`cell-${mt}-${iso}`}
                      className="flex items-center justify-center"
                    >
                      {/* Scaled wrapper so the fixed-size MealPlanCell fits layout width */}
                      <div
                        style={{
                          width: `${baseCellW * scale}px`,
                          height: `${baseCellH * scale}px`,
                        }}
                      >
                        <div
                          style={{
                            transform: `scale(${scale})`,
                            transformOrigin: "top left",
                          }}
                        >
                          <MealPlanCell
                            recipeOptions={recipesByMeal[mt as MealType]}
                            mealType={mt}
                            onRecipeSelect={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
