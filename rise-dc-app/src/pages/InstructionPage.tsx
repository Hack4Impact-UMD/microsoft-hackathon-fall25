import { Instruction } from "../shared/types";
import StepCard from "../cookbook_components/StepCard";
import { useState } from "react";

interface InstructionPageProps {
  instructions: Instruction[];
}

export default function InstructionPage({ instructions }: InstructionPageProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const currentInstruction = instructions[currentStepIndex];

  const goNext = () => {
    if (currentStepIndex < instructions.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-sm">
      <StepCard
        instruction={currentInstruction}
        total_steps={instructions.length}
      />

      <div className="flex justify-center gap-3">
        <button
          onClick={goPrev}
          disabled={currentStepIndex === 0}
          className="flex-1 px-4 py-2 text-white bg-[#0F6CBD] rounded disabled:opacity-50"
        >
          Previous Step
        </button>
        <button
          onClick={goNext}
          disabled={currentStepIndex === instructions.length - 1}
          className="flex-1 px-4 py-2 text-white bg-[#0F6CBD] rounded disabled:opacity-50"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
