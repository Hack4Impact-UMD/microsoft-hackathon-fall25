import './Slideshow.css';
import ImageCard from './ImageCard';

type SlideshowProps = {
  title: string;
  images: React.ReactElement<typeof ImageCard>[];
  imagesPerRow: number;
  className?: string;
}

// Component that shows images in either list or grid view
function Slideshow({ title, images, imagesPerRow, className }: SlideshowProps) {
  return (
    <div className={className ? `slideshow-container ${className}` : 'slideshow-container'}>
      <div className="header">
        <h2>{title}</h2>
      </div>
            
      <div
        className={`grid gap-6`}
        style={{ gridTemplateColumns: `repeat(${imagesPerRow}, minmax(0, 1fr))` }}
      >
        {images.map((Card) => <div>{Card}</div>)}
      </div>
    </div>
  );
}

export default Slideshow;
