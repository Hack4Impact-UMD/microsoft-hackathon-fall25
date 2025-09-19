import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const recipeSteps = [
  { name: "About Recipe" },
  { name: "Time & Servings" },
  { name: "Utensils & Tools" },
  { name: "Ingredients" },
  { name: "Instructions" },
];

type ProgressBarProps = {
  currentStep: number;
};

const RecipeCreationProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="w-full px-4 py-4">
      <div className="relative">
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-300" />
        <div className="relative flex justify-between">
          {recipeSteps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div key={step.name} className="flex flex-col items-center">
                {isActive && (
                  <div className="absolute -top-6 text-orange-500">
                    <ArrowDropDownIcon sx={{ fontSize: "2.5rem" }} />
                  </div>
                )}

                <div className="w-8 h-8 flex items-center justify-center bg-white z-10">
                  {isCompleted ? (
                    <RadioButtonUncheckedIcon
                      className={isActive ? "text-orange-500" : "text-gray-300"}
                      sx={{ fontSize: "2rem" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon
                      className={isActive ? "text-orange-500" : "text-gray-300"}
                      sx={{ fontSize: "2rem" }}
                    />
                  )}
                </div>

                <p
                  className={`mt-2 text-xs text-center whitespace-nowrap ${
                    isActive ? "text-orange-500 font-bold" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecipeCreationProgressBar;
