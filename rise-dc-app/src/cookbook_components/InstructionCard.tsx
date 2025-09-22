import React from "react";
import { Instruction } from "../shared/types";
import Warning from "./Warning";
import AudioButton from "../shared/components/AudioButton";

interface InstructionCardProps {
  instruction: Instruction;
}

const InstructionCard: React.FC<InstructionCardProps> = ({ instruction }) => {
  const audioText = instruction.warning
    ? `${instruction.instructions} ${instruction.warning}`
    : instruction.instructions;

  return (
    <div className="flex flex-col items-center w-full max-w-xl">
      <div className="p-6 text-center" style={{ borderColor: "#707070" }}>
        <h2 className="text-4xl font-bold text-white">
          <div className="flex items-center gap-6">
            Step {instruction.step_number}
            <AudioButton text={audioText} />
          </div>
        </h2>
      </div>

      {instruction.image_id && (
        <div className="flex flex-col items-center w-full">
          <div
            className="w-full border flex justify-center p-5 h-80 bg-white"
            style={{ borderColor: "#707070" }}
          >
            <img
              src={`${instruction.image_id}`}
              alt={`Step ${instruction.step_number}`}
              className="max-h-200"
            />
          </div>
          <div
            className="w-full text-black p-5 text-center bg-white"
            style={{
              maxHeight: "6rem", // maximum height of caption
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3, // max ~3 lines
              fontSize: "clamp(0.95rem, 2.5vw, 1.3rem)", // bigger preferred size
              lineHeight: "1.6rem",
            }}
          >
            {instruction.instructions}
          </div>
        </div>
      )}

      {/* Always reserve space for Warning */}
      <div
        className="w-full mt-6 text-2xl min-h-[3rem]"
        style={{ borderColor: "#0C343D" }}
      >
        {instruction.warning && <Warning label={instruction.warning} />}
      </div>
    </div>
  );
};

export default InstructionCard;
