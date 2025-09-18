import React from "react";
import { Instruction } from "../shared/types";
import Warning from "./Warning";

interface InstructionCardProps {
  instruction: Instruction;
  showWarning?: boolean;
  warningLabel?: string;
}

const InstructionCard: React.FC<InstructionCardProps> = ({
  instruction,
  showWarning,
  warningLabel,
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="p-3 text-center" style={{ borderColor: "#707070" }}>
        <h2 className="text-2xl font-bold text-black">
          Step {instruction.step_number}
        </h2>
      </div>
      {instruction.image_id && (
        <div
          className="w-full border flex justify-center p-4 h-50"
          style={{ borderColor: "#707070" }}
        >
          {/* Replace this with function retrieving image via id */}
          <img
            src={`/images/${instruction.image_id}.png`}
            alt={`Step ${instruction.step_number}`}
            className="rounded-md max-h-64 object-contain"
          />
        </div>
      )}
      <div
        className="w-full border-x border-b text-white p-2 text-center text-lg"
        style={{ backgroundColor: "#0C343D", borderColor: "#707070" }}
      >
        {instruction.instructions}
      </div>
      {showWarning && (
        <div className="w-full mt-5 text-lg" style={{ borderColor: "#0C343D" }}>
          <Warning label={warningLabel ?? "Be careful with this step!"} />
        </div>
      )}
    </div>
  );
};

export default InstructionCard;
