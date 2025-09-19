import ProgressBar from "./ProgressBar";
import InstructionCard from "./InstructionCard";
import { Instruction } from "../shared/types";

type StepCardProp = {
    instruction: Instruction
    total_steps: number
}

export default function StepCard({instruction, total_steps}: StepCardProp) {
    return (
        <div className="flex flex-col gap-4 p-3 items-center w-full max-w-md space-y-5 h-full">
            <InstructionCard
                instruction={{
                    id: instruction.id,
                    step_number: instruction.step_number,
                    instructions: instruction.instructions,
                    image_id: instruction.image_id,
                    warning: instruction.warning
                }}
            />

            {!instruction.warning && (
                <div className="w-full mt-11.5 text-lg"></div>
            )}

            <ProgressBar currentStep={instruction.step_number} totalSteps={total_steps}/>
        </div>
    );
}
