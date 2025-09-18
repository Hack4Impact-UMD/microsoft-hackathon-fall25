import React from "react";

interface ImageCardProps {
  src: string;
  height?: number;
  width?: number;
  alt?: string;
  caption?: string;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, height, width, alt, caption, className }: ImageCardProps) => {
  return (
    <div className={`flex flex-col border-2 rounded-lg items-center w-fit ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        style={height || width ? { height, width } : undefined}
        className={`object-cover rounded-t-lg ${height || width ? '' : 'w-full'}`} 
      />
      {caption && (
        <div className="w-full text-lg text-center py-5 font-bold rounded-b-lg">
          {caption}
        </div>
      )}
    </div>
  );
};

export default ImageCard;
