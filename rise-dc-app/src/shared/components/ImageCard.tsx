import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ImageCardProps {
  src: string;
  height?: number;
  width?: number;
  alt?: string;
  caption?: string;
  howToUseOnClick?: () => void;
  onClick?: () => void;
  className?: string;
  isSection?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  height = 200,
  width = 300,
  alt = "",
  caption,
  howToUseOnClick,
  onClick,
  className,
  isSection = false,
}) => {
  const Wrapper: any = onClick ? "button" : "div";
  const [objectFit, setObjectFit] = useState<"cover" | "contain">("contain");

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const img = e.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = width / height;

    setObjectFit(
      Math.abs(aspectRatio - containerRatio) < 0.05 ? "cover" : "contain",
    );
  };

  return (
    <Wrapper
      onClick={onClick}
      className={`flex flex-col rounded-xl overflow-hidden items-center w-fit ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{ width }}
    >
      {/* Image Container */}
      <div
        className="w-full flex items-center justify-center bg-white"
        style={{ height }}
      >
        <img
          src={src}
          alt={alt}
          className={`w-3/4 h-3/4 ${objectFit === "cover" ? "object-cover" : "object-contain"}`}
          draggable={false}
          onLoad={handleImageLoad}
        />
      </div>

      {/* Caption */}
      {caption && (
        <div
          className={twMerge(
            "w-full text-xl text-center py-2 font-md rounded-b-lg",
            isSection
              ? "bg-[#EB5904] text-white"
              : "bg-white text-black font-light",
          )}
        >
          {caption}

          {/* How-to-use button beneath caption */}
          {howToUseOnClick && (
            <div className="mt-2">
              <button
                className="rounded-xl border-2 py-1 px-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering wrapper onClick
                  howToUseOnClick();
                }}
              >
                <b>?</b> How to Use
              </button>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default ImageCard;
