import React from "react";
import { Instruction } from "../shared/types";
import Warning from "./Warning";
import AudioButton from "../shared/components/AudioButton";

interface InstructionCardProps { instruction: Instruction }

const InstructionCard: React.FC<InstructionCardProps> = ({ instruction }) => {
  
  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="p-3 text-center" style={{ borderColor: "#707070" }}>
        <h2 className="text-2xl font-bold text-black">
          <div className="flex items-center gap-4">
            Step {instruction.step_number} <AudioButton text={instruction.instructions + instruction.warning}/>
          </div>
        </h2>
      </div>
      {instruction.image_id && (
        <div
          className="w-full border flex justify-center p-4 h-50"
          style={{ borderColor: "#707070" }}
        >
          <img
            src={`${instruction.image_id}`}
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
      {instruction.warning && (
        <div className="w-full mt-5 text-lg" style={{ borderColor: "#0C343D" }}>
          <Warning label={instruction.warning} />
        </div>
      )}
    </div>
  );
};

export default InstructionCard;
