import React from "react";

interface ImageCardProps {
  src: string;
  height?: number;
  width?: number;
  alt?: string;
  caption?: string;
  howToUseOnClick?: () => void;
  onClick?: () => void;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, height, width, alt, caption, howToUseOnClick, onClick, className }: ImageCardProps) => {
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper 
      onClick={onClick}
      className={`flex flex-col border-2 rounded-lg items-center w-fit ${onClick ? "cursor-pointer" : ""} ${className}`}

    >
      <img 
        src={src} 
        alt={alt} 
        style={height || width ? { height, width } : undefined}
        className={`object-cover rounded-t-lg ${height || width ? '' : 'w-full'}`} 
      />
      {caption && (
        <div className="w-full text-xl text-center py-5 font-bold rounded-b-lg">
          {caption}
        </div>
      )}
      {howToUseOnClick && (
        <div className="w-full pb-5 rounded-b-lg text-center">
            <button className="rounded-xl border-2 py-3 px-5 cursor-pointer" onClick={howToUseOnClick}>
            <b>?</b> How to Use
            </button>
        </div>
      )}
    </Wrapper>
  );
};

export default ImageCard;
