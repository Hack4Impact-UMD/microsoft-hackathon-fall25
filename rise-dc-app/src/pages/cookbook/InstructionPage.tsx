import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../cookbook_components/Button";
import CookbookBar from "../../cookbook_components/CookbookBar";
import InstructionCard from "../../cookbook_components/InstructionCard";
import ProgressBar from "../../cookbook_components/ProgressBar";
import { Instruction, Recipe } from "../../shared/types";
import { getRecipe } from "../../shared/data/dummyRecipes";

export default function InstructionPage() {
  const navigate = useNavigate();
  const { recipeId, stepNum } = useParams<{
    recipeId?: string;
    stepNum?: string;
  }>();

  if (!recipeId || !stepNum) return <div>Recipe ID or step number not found</div>;

  const recipe: Recipe | undefined = getRecipe(recipeId);
  if (!recipe) return <div>Recipe not found!</div>;

  const instruction: Instruction | undefined = recipe.instructions.find(
    (step) => step.step_number === Number(stepNum)
  );
  if (!instruction) return <div>{stepNum} not found!</div>;

  const location = useLocation();
  const { totalSteps } = location.state as { totalSteps: number };

  return (
    <div className="p-10">
      {/* Top bar */}
      <CookbookBar />

      {/* Main content grows, but not too much space */}
      <div className="flex-1 flex justify-center items-end">
        <InstructionCard instruction={instruction} />
      </div>

      {/* Bottom section: progress bar + next button */}
      <div className="flex flex-col w-full mt-4">
        <ProgressBar
          currentStep={instruction.step_number}
          totalSteps={totalSteps}
        />
        <div className="flex justify-center mt-4">
          <Button
            className="py-2 text-2xl font-light flex items-center"
            label={
              <span className="flex items-center">
                Next Step <span className="ml-2">→</span>
              </span>
            }
            onClick={() => {
              instruction.step_number + 1 < totalSteps
                ? navigate(`/cookbook/recipe/${recipeId}/${Number(stepNum) + 1}`, {
                    state: { totalSteps },
                  })
                : navigate(`/cookbook/recipe/${recipeId}/complete`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
