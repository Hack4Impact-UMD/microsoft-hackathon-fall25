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
  isSection=false 
}: ImageCardProps) => {
  const Wrapper: any = onClick ? "button" : "div";
  const [objectFit, setObjectFit] = useState<"cover" | "contain">("contain");

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = width / height;

    if (Math.abs(aspectRatio - containerRatio) < 0.05) {
      // roughly matches container → fill
      setObjectFit("cover");
    } else {
      // otherwise → contain
      setObjectFit("contain");
    }
  };

  return (
    <Wrapper 
      onClick={onClick}
      className={`flex flex-col rounded-lg border-2 overflow-hidden items-center w-fit ${
        onClick ? "cursor-pointer" : ""
      } ${!isSection ? "border-2" : ""} ${className}`}    
      style={{ width }}
    >
      <div className="w-full flex items-center justify-center bg-white" style={{ height }}>
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full ${objectFit === "cover" ? "object-cover" : "object-contain"}`}
          draggable={false}
          onLoad={handleImageLoad}
        />
      </div>

      {caption && (
        <div 
          className={twMerge("w-full text-xl text-center py-5 font-bold rounded-b-lg", 
            isSection ? "bg-[#EB5904] text-white" : "bg-white")}
        >
          {caption}
        </div>
      )}

      {howToUseOnClick && (
        <div className="w-full pb-5 text-center">
            <button 
              className="rounded-xl border-2 py-3 px-5 cursor-pointer" 
              onClick={howToUseOnClick}
            >
              <b>?</b> How to Use
            </button>
        </div>
      )}
    </Wrapper>
  );
};

export default ImageCard;
