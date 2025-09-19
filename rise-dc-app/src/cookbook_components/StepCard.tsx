import ProgressBar from "./ProgressBar";
import InstructionCard from "./InstructionCard";
import { useState } from "react";
import { Instruction } from "../shared/types";

export default function StepCard({ id, step_number, instructions, image_id="" } : Instruction) {
    const [stepCounter, setStepCounter] = useState<number>(1);

    return (
        <div className="flex flex-col gap-4 p-3 items-center w-full max-w-md space-y-14">
            <InstructionCard
                instruction={{
                    id: id,
                    step_number: stepCounter,
                    instructions: instructions,
                    image_id: image_id
                }}
            />

            <ProgressBar currentStep={stepCounter} totalSteps={4} onNext={() => setStepCounter(stepCounter+1)} />
        </div>
    );
} 