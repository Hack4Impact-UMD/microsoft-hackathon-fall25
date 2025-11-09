import { ReactNode } from "react";

import "./Slideshow.css";

type SlideshowProps = {
  title: string;
  images: ReactNode[];
  imagesPerRow: number;
  className?: string;
};

// Component that shows images in either list or grid view
function Slideshow({ title, images, imagesPerRow, className }: SlideshowProps) {
  return (
    <div
      className={
        className ? `slideshow-container ${className}` : "slideshow-container"
      }
    >
      <div className="header">
        <h2>{title}</h2>
      </div>

      <div
        className="grid gap-y-12 gap-x-6"
        style={{
          gridTemplateColumns: `repeat(${imagesPerRow}, minmax(0, 1fr))`,
        }}
      >
        {images.map((Card, index) => (
          <div key={index}>{Card}</div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
