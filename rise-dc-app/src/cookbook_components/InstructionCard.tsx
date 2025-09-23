import React, { useState } from "react";
import { Instruction } from "../shared/types";
import Warning from "./Warning";
import AudioButton from "../shared/components/AudioButton";

interface InstructionCardProps {
  instruction: Instruction;
}

const InstructionCard: React.FC<InstructionCardProps> = ({ instruction }) => {
  const [objectFit, setObjectFit] = useState<"cover" | "contain">("contain");
  const [isRectangle, setIsRectangle] = useState(false);

  const audioText = instruction.warning
    ? `${instruction.instructions} ${instruction.warning}`
    : instruction.instructions;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = 4 / 3; // match h-80 w-full container ratio

    setObjectFit(Math.abs(aspectRatio - containerRatio) < 0.05 ? "cover" : "contain");

    // rectangle if much wider or taller than square
    setIsRectangle(aspectRatio > 1.2 || aspectRatio < 0.8);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl">
      {/* Header with step + audio */}
      <div className="p-6 text-center" style={{ borderColor: "#707070" }}>
        <h2 className="text-4xl font-bold text-white">
          <div className="flex items-center gap-6">
            Step {instruction.step_number}
            <AudioButton text={audioText} />
          </div>
        </h2>
      </div>

      {/* Image + Caption */}
      {instruction.image_id && (
        <div className="flex flex-col items-center w-full">
          {/* Image container with same logic as ImageCard */}
          <div
            className="w-full flex items-center justify-center bg-white border"
            style={{ height: "20rem", borderColor: "#707070" }}
          >
            <img
              src={instruction.image_id}
              alt={`Step ${instruction.step_number}`}
              className={`${
                isRectangle ? "w-[90%] h-[90%]" : "w-3/4 h-3/4"
              } ${objectFit === "cover" ? "object-cover" : "object-contain"}`}
              draggable={false}
              onLoad={handleImageLoad}
            />
          </div>

          {/* Caption */}
          <div
            className="w-full text-black p-5 text-center bg-white"
            style={{
              maxHeight: "6rem",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              fontSize: "clamp(0.95rem, 2.5vw, 1.3rem)",
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
