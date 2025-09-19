import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Placeholder icons replace later
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BuildIcon from "@mui/icons-material/Build";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ListIcon from "@mui/icons-material/List";

const recipeSteps = [
  { name: "About Recipe", icon: InfoIcon },
  { name: "Time & Servings", icon: AccessTimeIcon },
  { name: "Utensils & Tools", icon: BuildIcon },
  { name: "Ingredients", icon: RestaurantIcon },
  { name: "Instructions", icon: ListIcon },
];

type ProgressBarProps = {
  currentStep: number;
};

const RecipeCreationProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="w-full px-4 py-8">
      <div className="relative">
        <div
          className="absolute top-6 h-3 flex items-center"
          style={{ left: "10%", right: "10%" }}
        >
          <div className="w-full h-full bg-[#D9D9D9] rounded-full border border-[#616161]" />
        </div>

        {/* Orange progress line */}
        <div
          className="absolute top-6 h-3 flex items-center"
          style={{ left: "10%", right: "10%" }}
        >
          <div
            className="h-full bg-[#EB5904] rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (recipeSteps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Icons */}
        <div className="relative grid grid-cols-5 gap-0">
          {recipeSteps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const IconComponent = step.icon;

            return (
              <div
                key={step.name}
                className="flex flex-col items-center relative"
              >
                {isActive && (
                  <div className="absolute -top-15 text-[#FD8743] z-20">
                    <ArrowDropDownIcon sx={{ fontSize: "5rem" }} />
                  </div>
                )}

                <div
                  className={`w-16 h-16 flex items-center justify-center bg-white z-10 rounded-full border-2 ${
                    isCompleted || isActive
                      ? "border-[#EB5904]"
                      : "border-[#D9D9D9]"
                  }`}
                >
                  <IconComponent
                    className="text-gray-600"
                    sx={{ fontSize: "2rem" }}
                  />
                </div>

                <p className="mt-2 text-sm text-center whitespace-normal break-words">
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
