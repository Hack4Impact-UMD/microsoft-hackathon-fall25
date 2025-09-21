import React from "react";
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
  height, 
  width, 
  alt, 
  caption, 
  howToUseOnClick, 
  onClick, 
  className, 
  isSection=false 
}: ImageCardProps) => {
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper 
      onClick={onClick}
      className={`flex flex-col rounded-lg overflow-hidden items-center w-fit ${
        onClick ? "cursor-pointer" : ""
      } ${!isSection ? "border-2" : ""} ${className}`}    
    >
      <img 
        src={src} 
        alt={alt} 
        style={height || width ? { height, width } : undefined}
        className={`object-cover ${height || width ? '' : 'w-full'}`} 
      />
      {caption && (
        <div 
          className={twMerge("w-full text-xl text-center py-5 font-bold rounded-b-lg", isSection ? "bg-[#EB5904] text-white" : "bg-white")}
        >
          {caption}
        </div>
      )}
      {howToUseOnClick && (
        <div className="w-full pb-5 text-center">
            <button className="rounded-xl border-2 py-3 px-5 cursor-pointer" onClick={howToUseOnClick}>
            <b>?</b> How to Use
            </button>
        </div>
      )}
    </Wrapper>
  );
};

export default ImageCard;
